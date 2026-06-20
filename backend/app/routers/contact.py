from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.message import Message
from app.schemas.message import MessageCreate, MessageOut

router = APIRouter(tags=["Contact"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/contact", response_model=MessageOut)
def send_message(message: MessageCreate, db: Session = Depends(get_db)):
    db_message = Message(**message.model_dump())
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return db_message

@router.get("/messages", response_model=list[MessageOut])
def list_messages(db: Session = Depends(get_db)):
    return db.query(Message).order_by(Message.id.desc()).all()
