# Minionese Learning Server!
## Created by Brock Boutwell & Steven Bull 

### What is it?

The minionese learning app is a project created by Steven Bull and Brock Boutwell. The project centers around the learning of the coveted 'banana language' of the minions. The server uses a special algorithm in order to increase the retention and learning execution of users. If an answer in incorrect the word gets moved to the next word, however if it is correct, the word gets pushed back x amount of spaces. This ensures that before moving on to new and exciting lexicons, the words are commited to memory through repetition.

### Live Website

https://stevenb-brock-minionese-app.now.sh/

### Client GitHub Repo

https://github.com/Bomaani/StevenB-Brock-Spaced-Rep-Client

### API Endpoints
API URL: https://minionese-stevenb-brock.herokuapp.com/api

#### Allows user to GET the language and words from the database
-'/language'
#### Allows for GET retrieval of the next word, along with current score counts
-'/language/head'
#### POST user guess word to the server, which checks and responds with an object containing if the guess is correct or not; Must contain body: { guess: guess }
-'/language/guess'
#### Allows POST for new users
-'/user'
#### Handles verification of user for login purposes on POST, PUT refreshes the token as necessary
-'/auth/token'


### Technologies Used
React, CSS, HTML, Node, Express, and PostgreSQL.