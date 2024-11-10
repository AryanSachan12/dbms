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
    ssc_percentage = Column(Float)
    hsc_percentage = Column(Float)
    degree_percentage = Column(Float)
    emp_test_percentage = Column(Float)
    mba_percent = Column(Float)
    gender = Column(String(1))  # 'F' or 'M'
    ssc_board = Column(String(10))  # 'Central' or 'Others'
    hsc_board = Column(String(10))  # 'Central' or 'Others'
    hsc_subject = Column(String(10))  # 'Arts', 'Commerce', or 'Science'
    undergrad_degree = Column(String(10))  # 'Comm_Mgmt', 'Others', 'Sci_Tech'
    work_experience = Column(String(3))  # 'Yes' or 'No'
    specialisation = Column(String(10))  # 'Mkt_Fin' or 'Mkt_HR'
    prediction_result = Column(String(20))  # Store "Placed" or "Not Placed"
