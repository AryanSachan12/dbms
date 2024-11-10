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
model_path = os.path.join(current_dir, "placement.pkl")  

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

# Function to handle label encoding for categorical variables
def label_encode(input_data):
    # Encode categorical variables using LabelEncoder
    input_data["gender"] = label_encoder.fit_transform([input_data["gender"]])[0]
    input_data["ssc_board"] = label_encoder.fit_transform([input_data["ssc_board"]])[0]
    input_data["hsc_board"] = label_encoder.fit_transform([input_data["hsc_board"]])[0]
    input_data["hsc_subject"] = label_encoder.fit_transform([input_data["hsc_subject"]])[0]
    input_data["undergrad_degree"] = label_encoder.fit_transform([input_data["undergrad_degree"]])[0]
    input_data["work_experience"] = label_encoder.fit_transform([input_data["work_experience"]])[0]
    input_data["specialisation"] = label_encoder.fit_transform([input_data["specialisation"]])[0]
    
    return input_data

# Function to store the prediction result in the database
def store_prediction_result(db: Session, input_data: dict, prediction_result: str):
    prediction_entry = PredictionResult(
        ssc_percentage=input_data["ssc_percentage"],
        hsc_percentage=input_data["hsc_percentage"],
        degree_percentage=input_data["degree_percentage"],
        emp_test_percentage=input_data["emp_test_percentage"],
        mba_percent=input_data["mba_percent"],
        gender=input_data["gender"],  # Storing gender as 'M' or 'F' in the database
        ssc_board=input_data["ssc_board"],  # Storing the board info
        hsc_board=input_data["hsc_board"],  # Storing the board info
        hsc_subject=input_data["hsc_subject"],  # Storing subject info
        undergrad_degree=input_data["undergrad_degree"],  # Storing undergrad degree
        work_experience=input_data["work_experience"],  # Storing work experience info
        specialisation=input_data["specialisation"],  # Storing specialisation
        prediction_result=prediction_result
    )
    db.add(prediction_entry)
    db.commit()
    db.refresh(prediction_entry)
    return prediction_entry

# Route to make a prediction
@router.post("/placement_prediction")
def placement_pred(input_parameters: ModelInput, db: Session = Depends(get_db)):
    input_data = input_parameters.dict()

    # Label encode the categorical features
    encoded_data = label_encode(input_data)

    # Prepare the input data for prediction (now all values are numeric)
    input_array = np.array([
        encoded_data["ssc_percentage"],
        encoded_data["hsc_percentage"],
        encoded_data["degree_percentage"],
        encoded_data["emp_test_percentage"],
        encoded_data["mba_percent"],
        encoded_data["gender"],  # Now a numeric value (e.g., 0 or 1 for 'M'/'F')
        encoded_data["ssc_board"],  # Numeric encoding for 'Central'/'Others'
        encoded_data["hsc_board"],  # Numeric encoding for 'Central'/'Others'
        encoded_data["hsc_subject"],  # Numeric encoding for 'Commerce'/'Science'
        encoded_data["undergrad_degree"],  # Numeric encoding for degree categories
        encoded_data["work_experience"],  # Numeric encoding for 'Yes'/'No'
        encoded_data["specialisation"]  # Numeric encoding for 'Mkt_Fin'/'Mkt_HR'
    ]).reshape(1, -1)

    # Make the prediction
    prediction = placement_model.predict(input_array)
    result = "Placed" if prediction[0] == 1 else "Not Placed"

    # Store the result in the database
    store_prediction_result(db, encoded_data, result)

    return {"prediction": result}
