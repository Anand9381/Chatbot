import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

try:
    client = Groq(api_key=os.environ.get("GROQ_API_KEY"))
    
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": "hello",
            }
        ],
        model="llama-3.1-8b-instant",
    )
    print("Success:", chat_completion.choices[0].message.content)
except Exception as e:
    import traceback
    traceback.print_exc()
