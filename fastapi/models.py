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
    gender_F = Column(Boolean)
    gender_M = Column(Boolean)
    ssc_board_Central = Column(Boolean)
    ssc_board_Others = Column(Boolean)
    hsc_board_Central = Column(Boolean)
    hsc_board_Others = Column(Boolean)
    hsc_subject_Arts = Column(Boolean)
    hsc_subject_Commerce = Column(Boolean)
    hsc_subject_Science = Column(Boolean)
    undergrad_degree_Comm_Mgmt = Column(Boolean)
    undergrad_degree_Others = Column(Boolean)
    undergrad_degree_Sci_Tech = Column(Boolean)
    work_experience_No = Column(Boolean)
    work_experience_Yes = Column(Boolean)
    specialisation_Mkt_Fin = Column(Boolean)
    specialisation_Mkt_HR = Column(Boolean)
    prediction_result = Column(String(20))  # Store "Placed" or "Not Placed"
