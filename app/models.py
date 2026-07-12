from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, nullable=False)
    monthly_income = Column(Float, default=0.0)
    created_at = Column(DateTime, default=datetime.utcnow)

    loans = relationship("Loan", back_populates="owner")
    history = relationship("NegotiationHistory", back_populates="owner")

class Loan(Base):
    __tablename__ = "loans"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    lender_name = Column(String, nullable=False)
    total_amount = Column(Float, nullable=False)
    outstanding_amount = Column(Float, nullable=False)
    monthly_emi = Column(Float, nullable=False)
    overdue_months = Column(Integer, default=0)
    interest_rate = Column(Float, default=0.0)
    created_at = Column(DateTime, default=datetime.utcnow)

    owner = relationship("User", back_populates="loans")

class NegotiationHistory(Base):
    __tablename__ = "negotiation_history"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    lender_name = Column(String, nullable=False)
    generated_type = Column(String)  # e.g., 'Settlement Strategy' or 'Negotiation Letter'
    prompt_used = Column(Text)
    response_content = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    owner = relationship("User", back_populates="history")