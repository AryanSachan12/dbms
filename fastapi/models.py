from sqlalchemy import Boolean, Column, Integer, String, Float, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True)
    email = Column(String(100), unique=True, index=True)
    password = Column(String(100)) 

    # Establishing the relationship with PredictionResult
    predictions = relationship("PredictionResult", back_populates="user")


class PredictionResult(Base):
    __tablename__ = "prediction_results"

    id = Column(Integer, primary_key=True, index=True)
    ssc_percentage = Column(Float, nullable=False)
    hsc_percentage = Column(Float, nullable=False)
    degree_percentage = Column(Float, nullable=False)
    emp_test_percentage = Column(Float, nullable=False)
    mba_percent = Column(Float, nullable=False)
    gender = Column(String(1), nullable=False)  # 'F' or 'M'
    ssc_board = Column(String(20), nullable=False)
    hsc_board = Column(String(20), nullable=False)
    hsc_subject = Column(String(20), nullable=False)
    undergrad_degree = Column(String(20), nullable=False)
    work_experience = Column(String(3), nullable=False)  # 'Yes' or 'No'
    specialisation = Column(String(20), nullable=False)
    prediction_result = Column(String(20), nullable=False)  # Store "Placed" or "Not Placed"

    # Foreign key to User using username
    username = Column(String(50), ForeignKey('users.username'), nullable=False)

    # Establishing the reverse relationship
    user = relationship("User", back_populates="predictions")

    # Ensure the combination of username and id is unique
    __table_args__ = (
        UniqueConstraint('username', 'id', name='user_prediction_uc'),
        {'mysql_engine': 'InnoDB'},
    )
