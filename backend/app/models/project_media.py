from sqlalchemy import Column, Integer, String, ForeignKey
from app.database import Base

class ProjectMedia(Base):
    __tablename__ = "project_media"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id", ondelete="CASCADE"), index=True)
    media_type = Column(String, nullable=False)  # image | video
    media_url = Column(String, nullable=False)
    caption = Column(String, nullable=True)
