from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.certification import Certification
from app.schemas.certification import CertificationCreate, CertificationUpdate, CertificationOut

router = APIRouter(prefix="/certifications", tags=["Certifications"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=list[CertificationOut])
def list_items(db: Session = Depends(get_db)):
    return db.query(Certification).all()

@router.post("/", response_model=CertificationOut)
def create_item(item: CertificationCreate, db: Session = Depends(get_db)):
    db_item = Certification(**item.model_dump())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.put("/{item_id}", response_model=CertificationOut)
def update_item(item_id: int, item: CertificationUpdate, db: Session = Depends(get_db)):
    db_item = db.query(Certification).filter(Certification.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Certification not found")
    for key, value in item.model_dump().items():
        setattr(db_item, key, value)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.delete("/{item_id}")
def delete_item(item_id: int, db: Session = Depends(get_db)):
    db_item = db.query(Certification).filter(Certification.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Certification not found")
    db.delete(db_item)
    db.commit()
    return {"message": "deleted"}
