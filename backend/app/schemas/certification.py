from pydantic import BaseModel
from typing import Optional

class CertificationBase(BaseModel):
    title: str
    issuer: str
    issue_date: str
    certificate_url: Optional[str] = None
    image_url: Optional[str] = None

class CertificationCreate(CertificationBase):
    pass

class CertificationUpdate(CertificationBase):
    pass

class CertificationOut(CertificationBase):
    id: int

    class Config:
        from_attributes = True
