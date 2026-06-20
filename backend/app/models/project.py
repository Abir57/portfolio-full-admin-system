from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.orm import relationship
from app.database import Base

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    cover_url = Column(String, nullable=True)
    demo_url = Column(String, nullable=True)
    github_url = Column(String, nullable=True)
    technologies_text = Column(Text, nullable=True)
