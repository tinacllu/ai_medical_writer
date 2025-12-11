from docx import Document
import io

def create_word_doc(disease:str, article:str):
    doc = Document()
    doc.add_heading(f"{disease} - Disease Overview", 0)

    for line in article.split("\n"):
        doc.add_paragraph(line)
    
    file_stream = io.BytesIO()
    doc.save(file_stream)
    file_stream.seek(0)
    
    return file_stream
