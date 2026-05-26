/* eslint-disable no-undef */
'use strict';
/*
========================================================
ASYNC FUNCTIONS + FETCH + AXIOS
========================================================

Imagine your app needs information from the internet.

Examples:
- Weather data
- User accounts
- Movie lists
- Pokémon data
- News articles

Your app sends a request to an API.

Because internet requests take time,
JavaScript uses ASYNC FUNCTIONS.

MAIN KEYWORDS:
--------------------------------------------------------

async
- tells JavaScript this function may take time

await
- pauses THIS function until data returns

fetch()
- built into JavaScript
- used to request data from APIs

axios
- a popular package developers install
- also used to request API data
*/



/*
========================================================
FETCH EXAMPLE
========================================================

fetch() is BUILT INTO JavaScript.

You DO NOT need to install it.
*/


async function getUsersFetch() {

  // Ask the API for user data
  const response = await fetch(
    'https://jsonplaceholder.typicode.com/users'
  );

  /*
  IMPORTANT:
  ------------------------------------
  fetch() gives back a RESPONSE object,
  NOT the actual data yet.
  */

  // Convert response into JSON data
  const data = await response.json();

  console.log(data);
}

getUsersFetch();



/*
========================================================
HOW FETCH WORKS
========================================================

STEP 1:
fetch() contacts the API

STEP 2:
The API sends back a response

STEP 3:
We must convert it using:
response.json()

STEP 4:
Now we can use the data
*/



/*
========================================================
WHAT IS AXIOS?
========================================================

Axios is a package/library developers install.

It helps make API requests easier.

Many developers like axios because:
- cleaner syntax
- easier error handling
- automatic JSON conversion
- commonly used in React apps

Axios is NOT built into JavaScript.

You must install it first.
*/



/*
========================================================
HOW TO INSTALL AXIOS
========================================================

Open your terminal in your project folder
and run:

npm install axios

OR

npm i axios


WHAT DOES THIS DO?
--------------------------------------------------------
- Downloads axios
- Adds it to node_modules
- Adds it to package.json
- Makes it available in your project
*/



/*
========================================================
HOW TO IMPORT AXIOS
========================================================

In React or Node.js:

import axios from 'axios';

OR in older Node.js projects:

const axios = require('axios');


WHY IMPORT?
--------------------------------------------------------
Because axios is an external package.

JavaScript needs to know where it is.
*/



/*
========================================================
AXIOS EXAMPLE
========================================================

IMPORTANT DIFFERENCE:
--------------------------------------------------------
Axios AUTOMATICALLY converts JSON for us.

We DO NOT need:
response.json()
*/


// Import axios first
// import axios from 'axios';

// eslint-disable-next-line no-unused-vars
async function getUsersAxios() {

  // Axios request
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/users'
  );

  /*
  Axios stores the actual data inside:
  response.data
  */

  console.log(response.data);
}


/*
========================================================
FETCH VS AXIOS
========================================================

FETCH:
--------------------------------------------------------
const response = await fetch(url);

const data = await response.json();

console.log(data);


AXIOS:
--------------------------------------------------------
const response = await axios.get(url);

console.log(response.data);


MAIN DIFFERENCE:
--------------------------------------------------------

FETCH:
- built into JavaScript
- requires response.json()

AXIOS:
- must install first
- automatically converts JSON
- easier syntax for many developers
*/



/*
========================================================
AXIOS WITH TRY/CATCH
========================================================

Very common in React applications.
*/


// import axios from 'axios';


// eslint-disable-next-line no-unused-vars
async function getPostsAxios() {

  try {

    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/posts'
    );

    console.log(response.data);

  } catch (error) {

    console.log('Something went wrong!');

    console.log(error);

  }
}


/*
========================================================
WHY TRY/CATCH IS IMPORTANT
========================================================

Internet requests can fail.

Examples:
- no internet
- API server down
- wrong URL
- invalid API key

try/catch prevents crashes.
*/



/*
========================================================
POST REQUEST WITH AXIOS
========================================================

GET REQUEST:
- asks for data

POST REQUEST:
- sends data TO the server
*/


// import axios from 'axios';

// eslint-disable-next-line no-unused-vars
async function createPost() {

  try {

    const response = await axios.post(
      'https://jsonplaceholder.typicode.com/posts',

      // Data being sent
      {
        title: 'My New Post',
        body: 'Learning async functions!',
        userId: 1
      }
    );

    console.log(response.data);

  } catch (error) {

    console.log(error);

  }
}


/*
========================================================
REAL WORLD EXAMPLES
========================================================

Async + APIs are used in:

- Weather apps
- Login systems
- Banking apps
- Google Maps
- Social media feeds
- Online stores
- Chat applications
- React applications
- Full stack applications
*/



/*
========================================================
MOST IMPORTANT THINGS TO REMEMBER
========================================================

1. async functions handle code that takes time

2. await pauses until data returns

3. fetch() is built into JavaScript

4. axios must be installed

5. fetch requires:
   response.json()

6. axios automatically handles JSON

7. try/catch helps prevent crashes

8. APIs are used constantly in modern apps
*/