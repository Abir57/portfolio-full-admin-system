from sqlalchemy import Column, Integer, String, Text, JSON
from app.database import Base

class Profile(Base):
    __tablename__ = "profile"

    id = Column(Integer, primary_key=True, index=True)

    full_name = Column(String, nullable=False, default="Abir Baya")
    title = Column(String, nullable=False, default="Cyber Security Engineer")
    summary = Column(Text, nullable=False, default="")

    location = Column(String, nullable=False, default="Tunisia")
    email = Column(String, nullable=False, default="abirbaya5@gmail.com")
    phone = Column(String, nullable=False, default="+21621350474")

    linkedin_url = Column(String, nullable=False, default="https://www.linkedin.com/in/your-linkedin")
    github_url = Column(String, nullable=False, default="https://github.com/your-github")
    whatsapp_url = Column(String, nullable=False, default="https://wa.me/21621350474")
    cv_url = Column(String, nullable=False, default="/Abir_Baya_CV.pdf")
    image_url = Column(String, nullable=False, default="/profile.jpg")

    focus_areas = Column(JSON, nullable=False, default=list)
    education = Column(JSON, nullable=False, default=list)
    experiences = Column(JSON, nullable=False, default=list)
    skills = Column(JSON, nullable=False, default=list)
    certifications = Column(JSON, nullable=False, default=list)