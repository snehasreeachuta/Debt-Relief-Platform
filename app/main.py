from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.routers import auth, loans, financial, negotiation

# Initialize database schema automatically
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI Powered Debt Relief Platform API",
    description="Backend services for debt management, settlement predictions, and Gemini AI integration",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(loans.router)
app.include_router(financial.router)
app.include_router(negotiation.router)

@app.get("/")
def root():
    return {"status": "Active", "message": "Debt Relief API is online"}