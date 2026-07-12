import os
from dotenv import load_dotenv
from pydantic_settings import BaseSettings

# 1. Manually find and load the .env file
# This explicitly tells Python where the file is
base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
env_path = os.path.join(base_dir, ".env")

print(f"DEBUG: Loading .env from: {env_path}")
load_dotenv(dotenv_path=env_path)

# 2. Verify if the variables are actually loaded into memory
print(f"DEBUG: DATABASE_URL loaded: {os.getenv('DATABASE_URL') is not None}")

class Settings(BaseSettings):
    DATABASE_URL: str
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440
    GEMINI_API_KEY: str

# 3. Create settings (Pydantic will now automatically find them in the environment)
settings = Settings()