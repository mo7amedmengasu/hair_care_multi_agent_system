# main.py
from fastapi import FastAPI
from routs import router as task_router
from fastapi.middleware.cors import CORSMiddleware




app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React app origin
    allow_credentials=True,
    allow_methods=["*"],  # allow all HTTP methods including POST, OPTIONS
    allow_headers=["*"],
)

# include your router
app.include_router(task_router)