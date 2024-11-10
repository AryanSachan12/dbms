from sqlalchemy import Boolean, Column, Integer, String, Float
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True)
    email = Column(String(100), unique=True, index=True)
    password = Column(String(100)) 

class PredictionResult(Base):
    __tablename__ = "prediction_results"

    id = Column(Integer, primary_key=True, index=True)
    ssc_percentage = Column(Float, nullable=False)  # Ensure the percentage fields are required
    hsc_percentage = Column(Float, nullable=False)
    degree_percentage = Column(Float, nullable=False)
    emp_test_percentage = Column(Float, nullable=False)
    mba_percent = Column(Float, nullable=False)
    gender = Column(String(1), nullable=False)  # 'F' or 'M'
    ssc_board = Column(String(20), nullable=False)  # Adjusted length for more flexibility
    hsc_board = Column(String(20), nullable=False)
    hsc_subject = Column(String(20), nullable=False)  # Increased length for more options
    undergrad_degree = Column(String(20), nullable=False)  # Adjusted length
    work_experience = Column(String(3), nullable=False)  # 'Yes' or 'No'
    specialisation = Column(String(20), nullable=False)  # Increased length
    prediction_result = Column(String(20), nullable=False)  # Store "Placed" or "Not Placed"

    # Optionally, add a unique constraint if each record should be unique based on certain columns
    __table_args__ = (
        {'mysql_engine': 'InnoDB'},  # If using MySQL to ensure better transactional support
    )
