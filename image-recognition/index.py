import base64
import requests
from dotenv import load_dotenv
import os
import sys
import requests
from io import BytesIO

load_dotenv()
# OpenAI API Key
api_key = os.getenv("OPENAI_API_KEY")

# Function to encode the image
def encode_image_from_url(image_url):
    response = requests.get(image_url)
    image_data = BytesIO(response.content)
    return base64.b64encode(image_data.read()).decode('utf-8')

# Path to your image
image_path = sys.argv[1]

# Getting the base64 string
base64_image = encode_image_from_url(image_path)

headers = {
  "Content-Type": "application/json",
  "Authorization": f"Bearer {api_key}"
}

payload = {
  "model": "gpt-4o-mini",
  "messages": [
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": "This image is either a Coil, Condenser, Connector, Metal connector, PCB base, or IC chip. Which one do you think? Please choose one out of the six and print only the answer."
        },
        {
          "type": "image_url",
          "image_url": {
            "url": f"data:image/jpeg;base64,{base64_image}"
          }
        }
      ]
    }
  ],
  "max_tokens": 1000
}

response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)

print(response.json())
