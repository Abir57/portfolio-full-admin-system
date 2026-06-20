from pydantic import BaseModel

class MessageCreate(BaseModel):
    name: str
    email: str
    message: str

class MessageOut(MessageCreate):
    id: int

    class Config:
        from_attributes = True
