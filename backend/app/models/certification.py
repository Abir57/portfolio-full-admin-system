from sqlalchemy import Column, Integer, String
from app.database import Base

class Certification(Base):
    __tablename__ = "certifications"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    issuer = Column(String, nullable=False)
    issue_date = Column(String, nullable=False)
    certificate_url = Column(String, nullable=True)
    image_url = Column(String, nullable=True)
