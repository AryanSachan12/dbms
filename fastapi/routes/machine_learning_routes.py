import os
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
import numpy as np
import pickle
from database import get_db  
from models import PredictionResult  


current_dir = os.path.dirname(__file__)  
model_path = os.path.join(current_dir, "placement.sav")  


if not os.path.exists(model_path):
    raise ValueError(f"Model file not found at {model_path}")


placement_model = pickle.load(open(model_path, "rb"))


router = APIRouter(prefix="/api", tags=["prediction"])


class ModelInput(BaseModel):
    ssc_percentage: float
    hsc_percentage: float
    degree_percentage: float
    emp_test_percentage: float
    mba_percent: float
    gender_F: bool
    gender_M: bool
    ssc_board_Central: bool
    ssc_board_Others: bool
    hsc_board_Central: bool
    hsc_board_Others: bool
    hsc_subject_Arts: bool
    hsc_subject_Commerce: bool
    hsc_subject_Science: bool
    undergrad_degree_Comm_Mgmt: bool
    undergrad_degree_Others: bool
    undergrad_degree_Sci_Tech: bool
    work_experience_No: bool
    work_experience_Yes: bool
    specialisation_Mkt_Fin: bool
    specialisation_Mkt_HR: bool


def store_prediction_result(db: Session, input_data: dict, prediction_result: str):
    
    prediction_entry = PredictionResult(
        ssc_percentage=input_data["ssc_percentage"],
        hsc_percentage=input_data["hsc_percentage"],
        degree_percentage=input_data["degree_percentage"],
        emp_test_percentage=input_data["emp_test_percentage"],
        mba_percent=input_data["mba_percent"],
        gender_F=input_data["gender_F"],
        gender_M=input_data["gender_M"],
        ssc_board_Central=input_data["ssc_board_Central"],
        ssc_board_Others=input_data["ssc_board_Others"],
        hsc_board_Central=input_data["hsc_board_Central"],
        hsc_board_Others=input_data["hsc_board_Others"],
        hsc_subject_Arts=input_data["hsc_subject_Arts"],
        hsc_subject_Commerce=input_data["hsc_subject_Commerce"],
        hsc_subject_Science=input_data["hsc_subject_Science"],
        undergrad_degree_Comm_Mgmt=input_data["undergrad_degree_Comm_Mgmt"],
        undergrad_degree_Others=input_data["undergrad_degree_Others"],
        undergrad_degree_Sci_Tech=input_data["undergrad_degree_Sci_Tech"],
        work_experience_No=input_data["work_experience_No"],
        work_experience_Yes=input_data["work_experience_Yes"],
        specialisation_Mkt_Fin=input_data["specialisation_Mkt_Fin"],
        specialisation_Mkt_HR=input_data["specialisation_Mkt_HR"],
        prediction_result=prediction_result
    )
    db.add(prediction_entry)
    db.commit()
    db.refresh(prediction_entry)
    return prediction_entry


@router.post("/placement_prediction")
def placement_pred(input_parameters: ModelInput, db: Session = Depends(get_db)):
    input_data = input_parameters.dict()


    processed_data = [
        input_data["ssc_percentage"],
        input_data["hsc_percentage"],
        input_data["degree_percentage"],
        input_data["emp_test_percentage"],
        input_data["mba_percent"],
        int(input_data["gender_F"]),            
        int(input_data["gender_M"]),  
        int(input_data["ssc_board_Central"]),
        int(input_data["ssc_board_Others"]),
        int(input_data["hsc_board_Central"]),
        int(input_data["hsc_board_Others"]),
        int(input_data["hsc_subject_Arts"]),
        int(input_data["hsc_subject_Commerce"]),
        int(input_data["hsc_subject_Science"]),
        int(input_data["undergrad_degree_Comm_Mgmt"]),
        int(input_data["undergrad_degree_Others"]),
        int(input_data["undergrad_degree_Sci_Tech"]),
        int(input_data["work_experience_No"]),
        int(input_data["work_experience_Yes"]),
        int(input_data["specialisation_Mkt_Fin"]),
        int(input_data["specialisation_Mkt_HR"]),
    ]

    input_array = np.array(processed_data).reshape(1, -1)

   
    prediction = placement_model.predict(input_array)
    result = "Placed" if prediction[0] == 1 else "Not Placed"

 
    store_prediction_result(db, input_data, result)

    return {"prediction": result}
