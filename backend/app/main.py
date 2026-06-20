from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.database import Base, engine
from app.models.project import Project
from app.models.project_media import ProjectMedia
from app.models.experience import Experience
from app.models.skill import Skill
from app.models.certification import Certification
from app.models.message import Message
from app.models.user import User
from app.models.profile import Profile

from app.routers import projects, experiences, skills, certifications, contact, auth, profile
from app.routers.upload import router as upload_router

app = FastAPI(title="Portfolio API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://ton-frontend.onrender.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

app.include_router(auth.router)
app.include_router(projects.router)
app.include_router(experiences.router)
app.include_router(skills.router)
app.include_router(certifications.router)
app.include_router(contact.router)
app.include_router(profile.router)
app.include_router(upload_router)

@app.get("/")
def home():
    return {"message": "Backend is running"}
@app.get("/health")
def health():
    return {"status": "ok"}