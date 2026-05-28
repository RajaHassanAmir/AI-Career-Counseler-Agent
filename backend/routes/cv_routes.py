from services.gemini_service import get_ai_response
from flask import Blueprint, request, jsonify
import fitz
import os
from docx import Document

cv_bp = Blueprint("cv", __name__)

UPLOAD_FOLDER = "backend/uploads"

# CREATE FOLDER IF NOT EXISTS
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


# ✅ PDF TEXT EXTRACTION
def extract_text_from_pdf(file_path):

    text = ""

    pdf = fitz.open(file_path)

    for page in pdf:
        text += page.get_text()

    return text


# ✅ DOCX TEXT EXTRACTION
def extract_text_from_docx(file_path):

    doc = Document(file_path)

    text = ""

    for para in doc.paragraphs:
        text += para.text + "\n"

    return text


# ✅ CV UPLOAD + AI ANALYSIS
@cv_bp.route("/upload-cv", methods=["POST"])
def upload_cv():

    try:

        # CHECK FILE
        if "cv" not in request.files:
            return jsonify({
                "error": "No CV uploaded"
            }), 400

        file = request.files["cv"]

        # EMPTY FILE NAME
        if file.filename == "":
            return jsonify({
                "error": "No selected file"
            }), 400

        # SAVE FILE
        file_path = os.path.join(
            UPLOAD_FOLDER,
            file.filename
        )

        file.save(file_path)

        extracted_text = ""

        # PDF
        if file.filename.endswith(".pdf"):

            extracted_text = extract_text_from_pdf(
                file_path
            )

        # DOCX
        elif file.filename.endswith(".docx"):

            extracted_text = extract_text_from_docx(
                file_path
            )

        else:
            return jsonify({
                "error": "Unsupported file type"
            }), 400

        # EMPTY CV CHECK
        if extracted_text.strip() == "":
            return jsonify({
                "error": "Could not extract text from CV"
            }), 400

        # 🤖 AI ANALYSIS
        prompt = f"""
You are an expert AI Career Guidance Assistant.

Analyze the following CV carefully.

Provide response in this EXACT format:

========================
🔹 PROFILE SUMMARY
========================
Write a short professional summary.

========================
🔹 DETECTED SKILLS
========================
List technical and soft skills.

========================
🔹 STRONGEST CAREER PATHS
========================
Suggest best career roles.

========================
🔹 MISSING SKILLS
========================
List important missing skills.

========================
🔹 JOB RECOMMENDATIONS
========================
Suggest suitable jobs/internships.

========================
🔹 LEARNING ROADMAP
========================
Provide step-by-step roadmap.

========================
🔹 INTERVIEW PREPARATION
========================
Suggest interview topics to prepare.

========================
🔹 FINAL AI ADVICE
========================
Give motivational and strategic advice.

CV TEXT:
{extracted_text[:5000]}
"""

        ai_analysis = get_ai_response(prompt)

        return jsonify({
            "message": "CV analyzed successfully",
            "analysis": ai_analysis
        })

    except Exception as error:

        print("CV ANALYSIS ERROR:", error)

        return jsonify({
            "error": "Server error during CV analysis"
        }), 500