from google import genai
from app.config import settings

client = genai.Client(api_key=settings.GEMINI_API_KEY)

def generate_ai_negotiation_letter(user_name: str, lender_name: str, outstanding: float, overdue_months: int, hardship_reason: str, proposed_pct: float) -> str:
    proposed_amount = outstanding * (proposed_pct / 100.0)
    
    prompt = f"""
    You are an expert debt relief advisor and consumer protection advocate. 
    Write a formal, legally grounded, and persuasive debt settlement proposal letter to a financial institution.

    DETAILS:
    - Borrower Name: {user_name}
    - Financial Institution: {lender_name}
    - Outstanding Balance: ${outstanding:,.2f}
    - Delinquency Duration: {overdue_months} months
    - Hardship Reason: {hardship_reason}
    - Proposed Settlement Offer: ${proposed_amount:,.2f} ({proposed_pct}% of total balance)

    REQUIREMENTS:
    1. Maintain a professional, empathetic, yet firm tone.
    2. Explicitly detail the financial hardship.
    3. Frame the one-time settlement offer as the best resolution for both parties to prevent default/bankruptcy.
    4. Include placeholders for date and account numbers.
    5. Keep it well structured with standard formal business letter formatting.
    """

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
        )
        return response.text
    except Exception as e:
        # Fallback response if API fails
        return f"""Dear Management at {lender_name},

RE: SETTLEMENT PROPOSAL & HARDSHIP NOTICE FOR ACCOUNT

I am writing to formally request a settlement regarding my outstanding debt of ${outstanding:,.2f}. 

Due to unforeseen circumstances ({hardship_reason}), I am currently experiencing severe financial hardship. Based on my current financial capabilities, I can offer a one-time settlement amount of ${proposed_amount:,.2f} ({proposed_pct}%).

Please consider this proposal in good faith as a resolution to avoid further delinquency.

Sincerely,
{user_name}"""