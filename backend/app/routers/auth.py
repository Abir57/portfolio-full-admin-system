import os
from fastapi import APIRouter, HTTPException
from app.schemas.auth import LoginRequest, TokenResponse

router = APIRouter(prefix="/auth", tags=["Auth"])

ADMIN_EMAIL = os.getenv("ADMIN_EMAIL", "admin@portfolio.com")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "admin123")

@router.post("/login", response_model=TokenResponse)
def login(data: LoginRequest):
    if data.email != ADMIN_EMAIL or data.password != ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"access_token": "demo-admin-token", "token_type": "bearer"}
