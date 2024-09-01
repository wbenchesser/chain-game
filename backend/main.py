from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
from dotenv import load_dotenv
import uvicorn
import os

# Load environment variables from .env file
load_dotenv()

# OpenAI API credentials
client = OpenAI(
    api_key=os.getenv("OPENAI_SECRET")
)

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to your frontend's URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

game_instructions = (
    "You are running a game. You will receive a starting word and a user’s attempt at 'chaining' that word. "
    "You will have to determine if the user’s proposed chain is valid or not. Here are some examples of how "
    "the validity should be judged: starting word: tree, response: house, evaluation: valid, so you would "
    "respond with 'yes.' starting word: house, response: party, evaluation: valid, so you would respond with "
    "'yes.' starting word: party, response: animal, evaluation: valid, so you would respond with 'yes.' "
    "starting word: animal, response: crossing, evaluation: valid, so you would respond with 'yes.' "
    "If it is outside the box thinking but makes sense, say yes! Like shore followed by line is good."
    "Say yes if the two words put together create an exisiting idea or phrase, like 'pepper mint' or 'horse back'"
    "If someone attempts to do a play on words, for example they are given 'Piece' and respond 'treaty', say "
    "yes as it is a play on 'peace treaty' and we are encouraging imagination."
    "Association is not enough to return a 'yes'. The words must be seen often together in that order."
    "As such 'money green' is not a valid response."
    "If the user says something like 'no' in response to 'phone', the response should be no."
    "Order is a crucial factor in this game, and out of order responses should return 'no'."
    "If the answer is good but out of normal order, return 'no'. For example, "
    "'movie critic' is good, but 'critic movie' doesn't really make sense and should not be rewarded."
    "Just because two words are related, does not mean you should return yes. It is only when the two words"
    "put together are a common saying it should be a yes. So, 'socks shoes' should be 'no'."
    "Again, if the words are correct but the order is flipped, it should return 'no'."
    "Here are some example cases fo you to follow: first word: suit, second word: case, output: 'yes'."
    "first word: case, second word: suit, output: 'no'. first word: taxes, second word: money, output: 'no'."
    "first word: death, second word: evil, output: 'no'. first word: time, second word: clock, output: 'no'."
    "first word: Barack, second word: Obama, output: 'yes'. first word: Obama, second word: Barack, output: 'no'."
    "first word: hustle, second word: grind, output: 'no'. first word: trap, second word: door, output: 'yes'."
    "first word: door, second word: trap, output: 'no'. first word: duty, second word: call, output: 'no'."
    "first word: gear, second word: click, output: 'no'."
)

class WordValidationRequest(BaseModel):
    input_word: str
    previous_word: str

@app.post("/validate/")
async def validate_word(request: WordValidationRequest):
    input_word = request.input_word
    previous_word = request.previous_word

    message = f"Starting word: {previous_word}. Following word: {input_word}. {previous_word} {input_word}. Respond with 'yes' or 'no'."
    print(message)
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": game_instructions},
            {"role": "user", "content": message}
        ]
    )

    result = response.choices[0].message.content.strip().lower()
    is_valid = result == 'yes'
    return {"valid": is_valid}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
