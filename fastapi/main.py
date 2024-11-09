from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import models
from database import engine
from routes.user_routes import router as user_router

app = FastAPI(
    title="basic-fastapi",
    version="1.0",
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# Create the database tables
models.Base.metadata.create_all(bind=engine)

# Include the user router
app.include_router(user_router)
