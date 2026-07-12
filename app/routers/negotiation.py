from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app import models, schemas, security
from app.services.financial_engine import calculate_settlement_prediction
from app.services.gemini_service import generate_ai_negotiation_letter

router = APIRouter(prefix="/api/negotiation", tags=["AI Negotiation"])

@router.get("/predict/{loan_id}")
def predict_settlement(loan_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(security.get_current_user)):
    loan = db.query(models.Loan).filter(models.Loan.id == loan_id, models.Loan.user_id == current_user.id).first()
    if not loan:
        raise HTTPException(status_code=404, detail="Loan not found")
    return calculate_settlement_prediction(loan, current_user.monthly_income)

@router.post("/generate-letter")
def generate_letter(req: schemas.NegotiationRequest, db: Session = Depends(get_db), current_user: models.User = Depends(security.get_current_user)):
    loan = db.query(models.Loan).filter(models.Loan.id == req.loan_id, models.Loan.user_id == current_user.id).first()
    if not loan:
        raise HTTPException(status_code=404, detail="Loan not found")

    letter = generate_ai_negotiation_letter(
        user_name=current_user.full_name,
        lender_name=loan.lender_name,
        outstanding=loan.outstanding_amount,
        overdue_months=loan.overdue_months,
        hardship_reason=req.hardship_reason,
        proposed_pct=req.proposed_settlement_pct
    )

    # Save to history database table
    history_item = models.NegotiationHistory(
        user_id=current_user.id,
        lender_name=loan.lender_name,
        generated_type="Negotiation Letter",
        prompt_used=f"Hardship: {req.hardship_reason}, Offered: {req.proposed_settlement_pct}%",
        response_content=letter
    )
    db.add(history_item)
    db.commit()

    return {"letter": letter}

@router.get("/history", response_model=List[schemas.HistoryResponse])
def get_history(db: Session = Depends(get_db), current_user: models.User = Depends(security.get_current_user)):
    return db.query(models.NegotiationHistory).filter(models.NegotiationHistory.user_id == current_user.id).order_by(models.NegotiationHistory.created_at.desc()).all()