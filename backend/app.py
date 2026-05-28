from flask import Flask
from flask_cors import CORS

from routes.ai_routes import ai_bp
from routes.cv_routes import cv_bp

app = Flask(__name__)

CORS(app)

# ROUTES
app.register_blueprint(ai_bp, url_prefix="/api")
app.register_blueprint(cv_bp, url_prefix="/api")


@app.route("/")
def home():
    return {
        "message": "Career Agent Backend Running"
    }


if __name__ == "__main__":
    app.run(debug=True)