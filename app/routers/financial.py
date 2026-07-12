from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app import models, schemas, security
from app.services.financial_engine import analyze_financial_health

router = APIRouter(prefix="/api/financial", tags=["Financial Analysis"])

@router.get("/health", response_model=schemas.FinancialAnalysisResponse)
def get_health_analysis(db: Session = Depends(get_db), current_user: models.User = Depends(security.get_current_user)):
    loans = db.query(models.Loan).filter(models.Loan.user_id == current_user.id).all()
    analysis = analyze_financial_health(current_user.monthly_income, loans)
    return analysis