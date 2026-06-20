from pydantic import BaseModel

class SkillBase(BaseModel):
    name: str
    category: str
    level: str

class SkillCreate(SkillBase):
    pass

class SkillUpdate(SkillBase):
    pass

class SkillOut(SkillBase):
    id: int

    class Config:
        from_attributes = True
