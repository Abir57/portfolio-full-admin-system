from sqlalchemy import Column, Integer, String, Text
from app.database import Base

class Experience(Base):
    __tablename__ = "experiences"

    id = Column(Integer, primary_key=True, index=True)
    company_name = Column(String, nullable=False)
    position = Column(String, nullable=False)
    start_date = Column(String, nullable=False)
    end_date = Column(String, nullable=True)
    location = Column(String, nullable=True)
    description = Column(Text, nullable=False)
