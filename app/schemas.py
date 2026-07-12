from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: str
    monthly_income: float = 0.0

class UserResponse(BaseModel):
    id: int
    email: str
    full_name: str
    monthly_income: float

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class LoanCreate(BaseModel):
    lender_name: str
    total_amount: float
    outstanding_amount: float
    monthly_emi: float
    overdue_months: int = 0
    interest_rate: float = 0.0

class LoanResponse(LoanCreate):
    id: int
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True

class FinancialAnalysisResponse(BaseModel):
    monthly_income: float
    total_outstanding: float
    total_emi: float
    emi_to_income_ratio: float
    disposable_income: float
    stress_level: str
    stress_score: float
    recommendations: List[str]

class NegotiationRequest(BaseModel):
    loan_id: int
    hardship_reason: str
    proposed_settlement_pct: float

class HistoryResponse(BaseModel):
    id: int
    lender_name: str
    generated_type: str
    response_content: str
    created_at: datetime

    class Config:
        from_attributes = True