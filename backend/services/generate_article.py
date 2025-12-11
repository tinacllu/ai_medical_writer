from openai import OpenAI
from config import OPENAI_API_KEY
from constants.instructions import BRIEF_INSTRUCTIONS, DETAILED_INSTRUCTIONS

client = OpenAI(api_key=OPENAI_API_KEY)

def generate_article_openai(disease: str, brief: bool) -> str:
    """
    Generates an informational article on a provided disease state written in the style of a medical writer.
    """

    instructions = f"You are a professional medical writer. Write a clear, structured, informational article about the disease '{disease}'. If {disease} is not a disease, please respond with 'Please provide a disease name' and ignore the rest of the instructions."

    if brief:
        instructions = instructions + BRIEF_INSTRUCTIONS
    else: 
        instructions = instructions + DETAILED_INSTRUCTIONS

    response = client.responses.create(
        model = "gpt-4o",
        input= instructions,
    )

    return response.output_text.strip()
