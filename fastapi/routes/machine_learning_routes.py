import pandas as pd
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
import numpy as np
import pickle
import os
from database import get_db  
from models import PredictionResult
from sklearn.preprocessing import LabelEncoder

# Check the model file path
current_dir = os.path.dirname(__file__)  
model_path = os.path.join(current_dir, "model_pipeline.pkl")  

if not os.path.exists(model_path):
    raise ValueError(f"Model file not found at {model_path}")

# Load the pre-trained model
placement_model = pickle.load(open(model_path, "rb"))

# Initialize LabelEncoder
label_encoder = LabelEncoder()

# Router setup
router = APIRouter(prefix="/api", tags=["prediction"])

# Define the input model with 14 features (before one-hot encoding)
class ModelInput(BaseModel):
    ssc_percentage: float
    hsc_percentage: float
    degree_percentage: float
    emp_test_percentage: float
    mba_percent: float
    gender: str  # 'M' or 'F'
    ssc_board: str  # 'Central' or 'Others'
    hsc_board: str  # 'Central' or 'Others'
    hsc_subject: str  # 'Commerce' or 'Science'
    undergrad_degree: str  # 'Comm_Mgmt', 'Others', 'Sci_Tech'
    work_experience: str  # 'Yes' or 'No'
    specialisation: str  # 'Mkt_Fin' or 'Mkt_HR'

# Function to handle label encoding for categorical variables (used only for prediction)
def label_encode_for_prediction(input_data):
    encoded_data = input_data.copy()
    encoded_data["gender"] = label_encoder.fit_transform([encoded_data["gender"]])[0]
    encoded_data["ssc_board"] = label_encoder.fit_transform([encoded_data["ssc_board"]])[0]
    encoded_data["hsc_board"] = label_encoder.fit_transform([encoded_data["hsc_board"]])[0]
    encoded_data["hsc_subject"] = label_encoder.fit_transform([encoded_data["hsc_subject"]])[0]
    encoded_data["undergrad_degree"] = label_encoder.fit_transform([encoded_data["undergrad_degree"]])[0]
    encoded_data["work_experience"] = label_encoder.fit_transform([encoded_data["work_experience"]])[0]
    encoded_data["specialisation"] = label_encoder.fit_transform([encoded_data["specialisation"]])[0]
    
    return encoded_data

# Function to store the prediction result in the database with the original string values
def store_prediction_result(db: Session, input_data: dict, prediction_result: str):
    # Ensure the correct types for SQLAlchemy model fields, storing original categorical values
    prediction_entry = PredictionResult(
        ssc_percentage=float(input_data["ssc_percentage"]),
        hsc_percentage=float(input_data["hsc_percentage"]),
        degree_percentage=float(input_data["degree_percentage"]),
        emp_test_percentage=float(input_data["emp_test_percentage"]),
        mba_percent=float(input_data["mba_percent"]),
        gender=str(input_data["gender"]),  # Ensure gender is stored as 'M' or 'F'
        ssc_board=str(input_data["ssc_board"]),  # Ensure board is stored as string
        hsc_board=str(input_data["hsc_board"]),  # Ensure board is stored as string
        hsc_subject=str(input_data["hsc_subject"]),  # Ensure subject is stored as string
        undergrad_degree=str(input_data["undergrad_degree"]),  # Ensure degree is stored as string
        work_experience=str(input_data["work_experience"]),  # Ensure experience is stored as string
        specialisation=str(input_data["specialisation"]),  # Ensure specialisation is stored as string
        prediction_result=str(prediction_result)  # Store "Placed" or "Not Placed"
    )
    
    db.add(prediction_entry)
    db.commit()
    db.refresh(prediction_entry)
    return prediction_entry

# Route to make a prediction
@router.post("/placement_prediction")
def placement_pred(input_parameters: ModelInput, db: Session = Depends(get_db)):
    input_data = input_parameters.dict()

    # Label encode the categorical features for prediction
    encoded_data = label_encode_for_prediction(input_data)

    # Convert the encoded data into a pandas DataFrame
    df_input = pd.DataFrame([encoded_data])

    # Make the prediction
    prediction = placement_model.predict(df_input)
    result = "Placed" if prediction[0] == 1 else "Not Placed"

    # Store the result in the database with the original string values
    store_prediction_result(db, input_data, result)

    return {"prediction": result}
