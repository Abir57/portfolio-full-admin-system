from pydantic import BaseModel
from typing import Optional, List

class MediaItem(BaseModel):
    media_type: str
    media_url: str
    caption: Optional[str] = None

class ProjectBase(BaseModel):
    title: str
    description: str
    cover_url: Optional[str] = None
    demo_url: Optional[str] = None
    github_url: Optional[str] = None
    technologies: List[str] = []
    media: List[MediaItem] = []

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(ProjectBase):
    pass

class ProjectOut(BaseModel):
    id: int
    title: str
    description: str
    cover_url: Optional[str] = None
    demo_url: Optional[str] = None
    github_url: Optional[str] = None
    technologies: List[str] = []
    media: List[MediaItem] = []

    class Config:
        from_attributes = True
