from pydantic import BaseModel
from typing import Optional

class ExperienceBase(BaseModel):
    company_name: str
    position: str
    start_date: str
    end_date: Optional[str] = None
    location: Optional[str] = None
    description: str

class ExperienceCreate(ExperienceBase):
    pass

class ExperienceUpdate(ExperienceBase):
    pass

class ExperienceOut(ExperienceBase):
    id: int

    class Config:
        from_attributes = True
