from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.experience import Experience
from app.schemas.experience import ExperienceCreate, ExperienceUpdate, ExperienceOut

router = APIRouter(prefix="/experiences", tags=["Experiences"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=list[ExperienceOut])
def list_items(db: Session = Depends(get_db)):
    return db.query(Experience).all()

@router.post("/", response_model=ExperienceOut)
def create_item(item: ExperienceCreate, db: Session = Depends(get_db)):
    db_item = Experience(**item.model_dump())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.put("/{item_id}", response_model=ExperienceOut)
def update_item(item_id: int, item: ExperienceUpdate, db: Session = Depends(get_db)):
    db_item = db.query(Experience).filter(Experience.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Experience not found")
    for key, value in item.model_dump().items():
        setattr(db_item, key, value)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.delete("/{item_id}")
def delete_item(item_id: int, db: Session = Depends(get_db)):
    db_item = db.query(Experience).filter(Experience.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Experience not found")
    db.delete(db_item)
    db.commit()
    return {"message": "deleted"}
