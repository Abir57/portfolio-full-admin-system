from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from app.database import SessionLocal
from app.models.project import Project
from app.models.project_media import ProjectMedia
from app.schemas.project import ProjectCreate, ProjectOut, ProjectUpdate, MediaItem

router = APIRouter(prefix="/projects", tags=["Projects"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def serialize_project(project: Project, media_items=None):
    technologies = []
    if project.technologies_text:
        technologies = [x.strip() for x in project.technologies_text.split(",") if x.strip()]
    return {
        "id": project.id,
        "title": project.title,
        "description": project.description,
        "cover_url": project.cover_url,
        "demo_url": project.demo_url,
        "github_url": project.github_url,
        "technologies": technologies,
        "media": media_items or []
    }

@router.get("/", response_model=list[ProjectOut])
def get_projects(db: Session = Depends(get_db)):
    projects = db.query(Project).all()
    media = db.query(ProjectMedia).all()
    media_map = {}
    for m in media:
        media_map.setdefault(m.project_id, []).append({
            "media_type": m.media_type,
            "media_url": m.media_url,
            "caption": m.caption,
        })
    return [serialize_project(p, media_map.get(p.id, [])) for p in projects]

@router.post("/", response_model=ProjectOut)
def create_project(project: ProjectCreate, db: Session = Depends(get_db)):
    db_project = Project(
        title=project.title,
        description=project.description,
        cover_url=project.cover_url,
        demo_url=project.demo_url,
        github_url=project.github_url,
        technologies_text=", ".join(project.technologies),
    )
    db.add(db_project)
    db.commit()
    db.refresh(db_project)

    for item in project.media:
        db.add(ProjectMedia(
            project_id=db_project.id,
            media_type=item.media_type,
            media_url=item.media_url,
            caption=item.caption
        ))
    db.commit()
    media_items = [{
        "media_type": item.media_type,
        "media_url": item.media_url,
        "caption": item.caption
    } for item in project.media]

    return serialize_project(db_project, media_items)

@router.put("/{project_id}", response_model=ProjectOut)
def update_project(project_id: int, project: ProjectUpdate, db: Session = Depends(get_db)):
    db_project = db.query(Project).filter(Project.id == project_id).first()
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")

    db_project.title = project.title
    db_project.description = project.description
    db_project.cover_url = project.cover_url
    db_project.demo_url = project.demo_url
    db_project.github_url = project.github_url
    db_project.technologies_text = ", ".join(project.technologies)

    db.query(ProjectMedia).filter(ProjectMedia.project_id == project_id).delete()
    for item in project.media:
        db.add(ProjectMedia(
            project_id=project_id,
            media_type=item.media_type,
            media_url=item.media_url,
            caption=item.caption
        ))

    db.commit()
    media_items = [{
        "media_type": item.media_type,
        "media_url": item.media_url,
        "caption": item.caption
    } for item in project.media]

    return serialize_project(db_project, media_items)

@router.delete("/{project_id}")
def delete_project(project_id: int, db: Session = Depends(get_db)):
    db_project = db.query(Project).filter(Project.id == project_id).first()
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")
    db.query(ProjectMedia).filter(ProjectMedia.project_id == project_id).delete()
    db.delete(db_project)
    db.commit()
    return {"message": "deleted"}
