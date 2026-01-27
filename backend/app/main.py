from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import router as api_router

app = FastAPI(title="Flashcard-Generator", version="1.0.0")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API router
app.include_router(api_router)


@app.get("/")
def read_root():
    return {"message": "Welcome to Flashcard Generator API!",
            "status": "running",
            "version": "1.0.0"
            }


@app.get("/health")
def health_check():
    return {"status": "healthy"}
