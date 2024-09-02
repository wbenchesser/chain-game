# Chain Game

Chain Game is a web-based word game where players must build a chain of words by entering valid English words that logically follow the previous word in the chain. The game challenges you to create the longest chain possible without repeating any words.

## How to Play

1. Start with a word: Enter a word that logically follows the previous word in the chain.
- Examples:
    - Up → Town
    - Town → Hall
    - Hall → Pass
2. Valid Words: The word must be a valid English word.
3. No Repeats: You cannot repeat any word that has already been used in the chain.
4. Challenge: Continue adding words to create the longest chain possible.

## Demo

https://github.com/user-attachments/assets/8d1dae66-1ec6-48ed-9387-92759f336f91



## Technology Stack

* Frontend: Built with React, providing a dynamic and responsive user interface.
* Backend: Implemented using Python and FastAPI, handling word validation and logic.
* Hosting: The application is hosted on a DigitalOcean droplet.
* Web Server: Nginx is used to serve the frontend and proxy requests to the backend.

## Setup Guide

### Prerequisites

* OpenAI API Key: You’ll need a secret API key from OpenAI to validate word chains. Sign up at OpenAI if you don’t have one.

### Steps to Deploy

1.	Clone the Repository:
    * git clone https://github.com/wbenchesser/chain-game
2.	Backend Setup:
    * Navigate to the backend directory.
    * Install dependencies: pip install -r requirements.txt
	* Create a .env file and add your OpenAI API key:
	* OPENAI_API_KEY=your_openai_api_key
3.	Frontend Setup:
    * Navigate to the frontend directory.
	* Install dependencies: npm install
	* Update any necessary configuration for the API endpoint if deploying on a different server.
4.	Deploying to DigitalOcean:
	* Deploy the backend using Uvicorn and FastAPI.
	* Set up Nginx to serve the React frontend and proxy API requests to the FastAPI backend.
	* Ensure the site is HTTPS certified.


## Acknowledgments

* This project would not have been possible without OpenAI for providing the API used for word validation.
* Likewise to DigitalOcean for providing a reliable platform for hosting this project and their student plan that allowed this to be hosted for free
* Thanks to namecheap for the student plan as well that allowed me to obtain the domain for free
* A very special thanks to my "playtesters" and friends: [Noah](https://github.com/noahsmiths), [Kelechi](https://github.com/ukpabik), [Nick](https://www.instagram.com/nick_roberts12), and [Alexandra](https://github.com/alexandramarum)
    
    
