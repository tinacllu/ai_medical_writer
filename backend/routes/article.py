from flask import Blueprint, request, jsonify, send_file
from services.generate_article import generate_article_openai
from services.create_doc import create_word_doc

article_bp = Blueprint("article", __name__)

@article_bp.route("/generate", methods=["POST"])
def generate_article():
    data = request.get_json()
    
    if not data or "input" not in data:
        return jsonify({"error": "No input provided"}), 400
    
    try: 
        article = generate_article_openai(data["input"], data["brief"])
        return jsonify({"article": article})
    except Exception as e:
        return jsonify({"error": str(e)})

@article_bp.route("/download/word", methods=["POST"])
def download_article_word():
    data = request.get_json()

    if not data or "disease" not in data or "article" not in data:
        return jsonify({"error": "Missing inputs"}), 400
    
    try:
        return send_file(
            create_word_doc(data["disease"], data["article"]),
            as_attachment=True,
            download_name=f'{data["disease"]}.docx',
            mimetype="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        )
    except Exception as e:
        return jsonify({"error": str(e)})

