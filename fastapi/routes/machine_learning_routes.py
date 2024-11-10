from fastapi import FastAPI
from pydantic import BaseModel
import numpy as np
import pickle
import json

app = FastAPI()


placement_model = pickle.load(open('placement.sav', 'rb'))


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

@app.post('/placement_prediction')
def placement_pred(input_parameters: ModelInput):
    
    input_data = input_parameters.dict()
    
    processed_data = [
        input_data['ssc_percentage'],
        input_data['hsc_percentage'],
        input_data['degree_percentage'],
        input_data['emp_test_percentage'],
        input_data['mba_percent'],
        int(input_data['gender_F']),
        int(input_data['gender_M']),
        int(input_data['ssc_board_Central']),
        int(input_data['ssc_board_Others']),
        int(input_data['hsc_board_Central']),
        int(input_data['hsc_board_Others']),
        int(input_data['hsc_subject_Arts']),
        int(input_data['hsc_subject_Commerce']),
        int(input_data['hsc_subject_Science']),
        int(input_data['undergrad_degree_Comm_Mgmt']),
        int(input_data['undergrad_degree_Others']),
        int(input_data['undergrad_degree_Sci_Tech']),
        int(input_data['work_experience_No']),
        int(input_data['work_experience_Yes']),
        int(input_data['specialisation_Mkt_Fin']),
        int(input_data['specialisation_Mkt_HR'])
    ]

    
    input_array = np.array(processed_data).reshape(1, -1)

   
    prediction = placement_model.predict(input_array)

    
    result = "Placed" if prediction[0] == 1 else "Not Placed"
    return {"prediction": result}
