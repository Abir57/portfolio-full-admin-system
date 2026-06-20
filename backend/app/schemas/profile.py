from pydantic import BaseModel
from typing import Optional, List, Dict, Any

class ProfileBase(BaseModel):
    full_name: Optional[str] = None
    title: Optional[str] = None
    summary: Optional[str] = None
    location: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None

    linkedin_url: Optional[str] = None
    github_url: Optional[str] = None
    whatsapp_url: Optional[str] = None
    cv_url: Optional[str] = None
    image_url: Optional[str] = None

    focus_areas: Optional[List[str]] = None
    education: Optional[List[Dict[str, Any]]] = None
    experiences: Optional[List[Dict[str, Any]]] = None
    skills: Optional[List[str]] = None
    certifications: Optional[List[str]] = None

class ProfileCreate(ProfileBase):
    pass

class ProfileUpdate(ProfileBase):
    pass

class ProfileOut(BaseModel):
    id: int
    full_name: str
    title: str
    summary: str
    location: str
    email: str
    phone: str
    linkedin_url: str
    github_url: str
    whatsapp_url: str
    cv_url: str
    image_url: str
    focus_areas: list[str]
    education: list[dict]
    experiences: list[dict]
    skills: list[str]
    certifications: list[str]

    class Config:
        from_attributes = True