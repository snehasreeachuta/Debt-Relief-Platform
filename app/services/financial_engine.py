def analyze_financial_health(monthly_income: float, loans: list):
    total_outstanding = sum(loan.outstanding_amount for loan in loans)
    total_emi = sum(loan.monthly_emi for loan in loans)
    
    emi_ratio = (total_emi / monthly_income * 100) if monthly_income > 0 else 100.0
    disposable_income = max(0.0, monthly_income - total_emi)
    
    # Stress Score calculation (0-100)
    score = min(100.0, (emi_ratio * 0.6) + (sum(l.overdue_months for l in loans) * 10))
    
    if score < 35:
        stress_level = "Low"
    elif score < 70:
        stress_level = "Moderate"
    else:
        stress_level = "Critical"

    recs = []
    if emi_ratio > 50:
        recs.append("Your EMI obligation exceeds 50% of monthly income. Priority: Debt Consolidation or Restructuring.")
    if any(l.overdue_months > 3 for l in loans):
        recs.append("Severe overdue loans detected. Target for immediate AI Negotiation / One-Time Settlement (OTS).")
    if disposable_income < 500:
        recs.append("Low liquidity reserve. Consider request for EMI pause or tenor extension.")
    if not recs:
        recs.append("Financial health is within sustainable thresholds. Maintain disciplined payments.")

    return {
        "monthly_income": monthly_income,
        "total_outstanding": total_outstanding,
        "total_emi": total_emi,
        "emi_to_income_ratio": round(emi_ratio, 2),
        "disposable_income": disposable_income,
        "stress_level": stress_level,
        "stress_score": round(score, 1),
        "recommendations": recs
    }

def calculate_settlement_prediction(loan, monthly_income: float):
    # Rule-based fallback logic & calculation engine
    debt_age_factor = min(1.0, loan.overdue_months / 12.0)
    base_offer_pct = 50.0 - (debt_age_factor * 20.0)
    suggested_settlement_amount = loan.outstanding_amount * (base_offer_pct / 100.0)
    
    likelihood = "High" if loan.overdue_months >= 3 else "Moderate" if loan.overdue_months >= 1 else "Low"
    
    return {
        "recommended_settlement_pct": round(base_offer_pct, 1),
        "estimated_settlement_amount": round(suggested_settlement_amount, 2),
        "approval_likelihood": likelihood,
        "strategy": f"Propose a one-time lump-sum settlement of {base_offer_pct}% based on {loan.overdue_months} months delinquency."
    }