from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app import models, schemas, security

router = APIRouter(prefix="/api/loans", tags=["Loans Management"])

@router.post("/", response_model=schemas.LoanResponse)
def create_loan(loan: schemas.LoanCreate, db: Session = Depends(get_db), current_user: models.User = Depends(security.get_current_user)):
    db_loan = models.Loan(**loan.model_dump(), user_id=current_user.id)
    db.add(db_loan)
    db.commit()
    db.refresh(db_loan)
    return db_loan

@router.get("/", response_model=List[schemas.LoanResponse])
def get_user_loans(db: Session = Depends(get_db), current_user: models.User = Depends(security.get_current_user)):
    return db.query(models.Loan).filter(models.Loan.user_id == current_user.id).all()

@router.delete("/{loan_id}")
def delete_loan(loan_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(security.get_current_user)):
    loan = db.query(models.Loan).filter(models.Loan.id == loan_id, models.Loan.user_id == current_user.id).first()
    if not loan:
        raise HTTPException(status_code=404, detail="Loan not found")
    db.delete(loan)
    db.commit()
    return {"message": "Loan deleted successfully"}