from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.skill import Skill
from app.schemas.skill import SkillCreate, SkillUpdate, SkillOut

router = APIRouter(prefix="/skills", tags=["Skills"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=list[SkillOut])
def list_items(db: Session = Depends(get_db)):
    return db.query(Skill).all()

@router.post("/", response_model=SkillOut)
def create_item(item: SkillCreate, db: Session = Depends(get_db)):
    db_item = Skill(**item.model_dump())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.put("/{item_id}", response_model=SkillOut)
def update_item(item_id: int, item: SkillUpdate, db: Session = Depends(get_db)):
    db_item = db.query(Skill).filter(Skill.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Skill not found")
    for key, value in item.model_dump().items():
        setattr(db_item, key, value)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.delete("/{item_id}")
def delete_item(item_id: int, db: Session = Depends(get_db)):
    db_item = db.query(Skill).filter(Skill.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Skill not found")
    db.delete(db_item)
    db.commit()
    return {"message": "deleted"}
