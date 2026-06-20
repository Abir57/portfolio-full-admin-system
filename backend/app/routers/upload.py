from fastapi import APIRouter, UploadFile, File, Request, HTTPException
from pathlib import Path
from uuid import uuid4
import shutil

router = APIRouter(
    prefix="/upload",
    tags=["Upload"]
)

# ==========================================
# DIRECTORIES
# ==========================================

BASE_DIR = Path("uploads")

IMAGES_DIR = BASE_DIR / "images"
VIDEOS_DIR = BASE_DIR / "videos"
DOCUMENTS_DIR = BASE_DIR / "documents"

IMAGES_DIR.mkdir(parents=True, exist_ok=True)
VIDEOS_DIR.mkdir(parents=True, exist_ok=True)
DOCUMENTS_DIR.mkdir(parents=True, exist_ok=True)

# ==========================================
# FILE SAVE HELPER
# ==========================================

def save_file(
    upload_dir: Path,
    file: UploadFile,
    request: Request
):
    if not file.filename:
        raise HTTPException(
            status_code=400,
            detail="Invalid filename"
        )

    extension = Path(file.filename).suffix.lower()

    filename = f"{uuid4()}{extension}"

    filepath = upload_dir / filename

    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    base_url = str(request.base_url).rstrip("/")

    return {
        "filename": filename,
        "url": f"{base_url}/uploads/{upload_dir.name}/{filename}"
    }

# ==========================================
# IMAGE UPLOAD
# ==========================================

@router.post("/image")
async def upload_image(
    request: Request,
    file: UploadFile = File(...)
):
    if not file.content_type:
        raise HTTPException(
            status_code=400,
            detail="Invalid image"
        )

    if not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=400,
            detail="Only image files are allowed"
        )

    return save_file(
        IMAGES_DIR,
        file,
        request
    )

# ==========================================
# VIDEO UPLOAD
# ==========================================

@router.post("/video")
async def upload_video(
    request: Request,
    file: UploadFile = File(...)
):
    if not file.content_type:
        raise HTTPException(
            status_code=400,
            detail="Invalid video"
        )

    if not file.content_type.startswith("video/"):
        raise HTTPException(
            status_code=400,
            detail="Only video files are allowed"
        )

    return save_file(
        VIDEOS_DIR,
        file,
        request
    )

# ==========================================
# DOCUMENT UPLOAD
# ==========================================

@router.post("/document")
async def upload_document(
    request: Request,
    file: UploadFile = File(...)
):
    allowed_types = {
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    }

    if not file.content_type:
        raise HTTPException(
            status_code=400,
            detail="Invalid document"
        )

    if file.content_type not in allowed_types:
        raise HTTPException(
            status_code=400,
            detail="Only PDF, DOC and DOCX files are allowed"
        )

    return save_file(
        DOCUMENTS_DIR,
        file,
        request
    )