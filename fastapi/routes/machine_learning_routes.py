import pandas as pd
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
import numpy as np
import pickle
import os
from database import get_db  
from models import PredictionResult, User
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

# Define the input model with 14 features (before one-hot encoding)class ModelInput(BaseModel):
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
    username: str  # Use username instead of user_id



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

# Function to store the prediction result in the database with the original string values and user_id
def store_prediction_result(db: Session, input_data: dict, prediction_result: str, username: str):
    # Query the user by username to get the user_id
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Store the prediction result with the user_id obtained from the username
    prediction_entry = PredictionResult(
        ssc_percentage=float(input_data["ssc_percentage"]),
        hsc_percentage=float(input_data["hsc_percentage"]),
        degree_percentage=float(input_data["degree_percentage"]),
        emp_test_percentage=float(input_data["emp_test_percentage"]),
        mba_percent=float(input_data["mba_percent"]),
        gender=str(input_data["gender"]),
        ssc_board=str(input_data["ssc_board"]),
        hsc_board=str(input_data["hsc_board"]),
        hsc_subject=str(input_data["hsc_subject"]),
        undergrad_degree=str(input_data["undergrad_degree"]),
        work_experience=str(input_data["work_experience"]),
        specialisation=str(input_data["specialisation"]),
        prediction_result=str(prediction_result),
        username=user.username  # Link prediction to the user through user_id
    )
    
    db.add(prediction_entry)
    db.commit()
    db.refresh(prediction_entry)
    return prediction_entry

# Function to fetch prediction results using the username
def fetch_prediction_results(db: Session, username: str):
    # Query the database for all prediction results linked to the given username
    results = db.query(PredictionResult).filter(PredictionResult.username == username).all()
    
    # Return the results (empty list if no results are found)
    return results

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

    # Store the result in the database with the original string values and user_id
    store_prediction_result(db, input_data, result, input_data['username'])

    return {"prediction": result}

# Route to get all prediction results for a user by username
@router.get("/predictions/{username}")
def get_predictions(username: str, db: Session = Depends(get_db)):
    # Fetch the prediction results for the user with the provided username
    prediction_results = fetch_prediction_results(db, username)
    
    # Return the prediction results as a response
    return {"predictions": prediction_results}
