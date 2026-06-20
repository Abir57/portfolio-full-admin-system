from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.profile import Profile
from app.schemas.profile import ProfileOut, ProfileUpdate

router = APIRouter(prefix="/profile", tags=["Profile"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def default_profile():
    return {
        "full_name": "Abir Baya",
        "title": "Cyber Security Engineer",
        "summary": (
            "I am a fourth-year Cyber Security Engineering student at EPI Digital School, "
            "passionate about systems security, SOC monitoring, AI applied to cybersecurity, "
            "cloud security, and governance, risk and compliance (GRC). "
            "I am looking for a summer internship to strengthen my skills in threat analysis, "
            "anomaly detection, incident handling, infrastructure protection, security auditing, "
            "and AI/cloud-based security solutions."
        ),
        "location": "Tunisia",
        "email": "abirbaya5@gmail.com",
        "phone": "+21621350474",
        "linkedin_url": "https://www.linkedin.com/in/your-linkedin",
        "github_url": "https://github.com/your-github",
        "whatsapp_url": "https://wa.me/21621350474",
        "cv_url": "/Abir_Baya_CV.pdf",
        "image_url": "/profile.jpg",
        "focus_areas": [
            "SOC Monitoring",
            "Cloud Security",
            "AI Security",
            "Web Security",
            "Secure Development",
            "GRC"
        ],
        "education": [
            {
                "school": "EPI Digital School – Tunisia",
                "period": "Since September 2022",
                "degree": "Engineering degree in Computer Science"
            }
        ],
        "experiences": [
            {
                "title": "Computer Vision & AI Intern",
                "period": "CRMN – Technopôle de Sousse | March 2026 – May 2026",
                "description": "Developed a real-time detection system using CNNs, deployed the solution on Raspberry Pi, and improved performance with an 18% error reduction."
            },
            {
                "title": "Secure Web Development Intern",
                "period": "TEAMDEV | July – August 2025",
                "description": "Built a secure internal portal using PHP and SQL, optimized user access control, and wrote technical and security documentation."
            },
            {
                "title": "Web Development Intern",
                "period": "ONSR | June – July 2024",
                "description": "Developed a secured authentication system with RBAC and created and secured APIs using Postman and Swagger."
            },
            {
                "title": "AI & Predictive Maintenance Intern",
                "period": "ARSII & Polytechnique | August – September 2023",
                "description": "Built ML models for aircraft maintenance prediction, detected sensor anomalies up to 48 hours in advance, and improved model accuracy by 25%."
            },
            {
                "title": "AI & IoT Cybersecurity Research Intern",
                "period": "AVIONAV | June – August 2023",
                "description": "Protected IoT devices against known and unknown attacks, detected attacks via Suricata IDS and deep learning, and isolated compromised devices with alerts to SOC/SOAR."
            }
        ],
        "skills": [
            "Python", "SQL", "PHP", "Java basics", "C basics",
            "Pandas", "NumPy", "Scikit-learn", "TensorFlow", "Keras",
            "IDS", "Honeypots", "Network Traffic Analysis",
            "Git/GitHub", "Postman", "Wireshark", "Nmap", "Burp Suite",
            "Docker basics", "Raspberry Pi", "MySQL", "PostgreSQL"
        ],
        "certifications": [
            "Fortinet: Certified Associate in Cybersecurity",
            "Cisco: Network Security",
            "NVIDIA: Deep Learning Fundamentals",
            "NVIDIA: AI for Anomaly Detection",
            "AWS: Cloud Foundations",
            "ATIA: Data Engineering & AI",
            "Google AI: Machine Learning Fundamentals"
        ]
    }

def ensure_profile(db: Session):
    profile = db.query(Profile).first()
    if profile:
        return profile

    data = default_profile()
    profile = Profile(**data)
    db.add(profile)
    db.commit()
    db.refresh(profile)
    return profile

@router.get("/", response_model=ProfileOut)
def get_profile(db: Session = Depends(get_db)):
    profile = ensure_profile(db)
    return profile

@router.put("/", response_model=ProfileOut)
def update_profile(payload: ProfileUpdate, db: Session = Depends(get_db)):
    profile = ensure_profile(db)

    data = payload.model_dump(exclude_unset=True)

    for key, value in data.items():
        setattr(profile, key, value)

    db.commit()
    db.refresh(profile)
    return profile