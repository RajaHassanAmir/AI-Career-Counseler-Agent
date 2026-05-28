from flask import Blueprint, request, jsonify

from services.gemini_service import get_ai_response

ai_bp = Blueprint("ai", __name__)


@ai_bp.route("/chat", methods=["POST"])
def chat():

    data = request.json

    user_message = data.get("message")

    ai_reply = get_ai_response(user_message)

    return jsonify({
        "reply": ai_reply
    })