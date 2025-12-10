from flask import Flask
from flask_cors import CORS
from routes.article import article_bp

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests

# Register API blueprint
app.register_blueprint(article_bp, url_prefix="/api")

if __name__ == "__main__":
    app.run(debug=True)
