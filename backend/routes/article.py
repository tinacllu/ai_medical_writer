from flask import Blueprint, request, jsonify
from services.generate_article import generate_article_openai

article_bp = Blueprint("article", __name__)

@article_bp.route("/generate", methods=["POST"])
def generate_article():
    data = request.get_json()
    
    if not data or "input" not in data:
        return jsonify({"error": "No input provided"}), 400
    
    try: 
        article = generate_article_openai(data["input"], True)
        return jsonify({"article": article})
    except Exception as e:
        return jsonify({"error": str(e)})
