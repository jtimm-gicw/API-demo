# React API Integration Guide

This guide explains the general process of connecting an API to a React application.

It focuses on:

- What APIs are
- What files are needed
- Where API code goes
- How API keys work
- How requests work
- How data flows through React

---

## What Is an API?

API stands for:

```txt
Application Programming Interface
```

An API allows applications to communicate with other services.

Examples:

| API Type | Purpose |
|----------|---------|

| Weather API | Weather data |
| Movie API | Movie information |
| AI API | AI responses |
| Maps API | Location and maps |
| Authentication API | User login |

---

## Typical API Workflow

```txt
User interacts with React app
            ↓
React sends request to API
            ↓
API processes request
            ↓
API sends back data
            ↓
React stores data in state
            ↓
React displays data
```

---

## Files Typically Needed

## 1. `.env`

Stores secret API keys.

Example:

```env
VITE_API_KEY=your_api_key_here
```

Why?

- Keeps keys out of components
- Makes apps safer
- Easier configuration

IMPORTANT:

With Vite:

```txt
Variables MUST start with VITE_
```

---

## 2. React Component

Usually:

```txt
App.jsx
```

or:

```txt
components/
```

This is where:

- API requests happen
- State is stored
- Data is rendered

---

## 3. Optional API Service File

Larger apps often separate API logic.

Example:

```txt
services/api.js
```

Purpose:

- Keep components cleaner
- Reuse API functions
- Organize requests

Example:

```js
export const getWeather = async () => {
  // API logic here
};
```

---

## Installing API Libraries

Some apps use built-in `fetch()`.

Others use libraries like Axios.

Install Axios:

```bash
npm install axios
```

Import it:

```js
import axios from "axios";
```

---

## Accessing Environment Variables

Inside React:

```js
const apiKey = import.meta.env.VITE_API_KEY;
```

Explanation:

| Part | Meaning |
|------|---------|

| `import.meta.env` | Access Vite environment variables |
| `VITE_API_KEY` | Specific variable name |

---

## Building an API URL

API URLs usually contain:

```txt
BASE URL + ENDPOINT + PARAMETERS
```

Example:

```txt
https://api.example.com/users?id=5
```

---

## Common URL Parts

| Part | Purpose |
|------|---------|

| Base URL | Main API address |
| Endpoint | Specific resource |
| Parameters | Extra instructions |
| API Key | Authentication |

---

## Example Dynamic URL

```js
const url =
  `https://api.example.com/users?id=${userId}&apikey=${apiKey}`;
```

Template literals allow variables inside URLs.

---

## Async Functions

API requests take time.

React uses async functions.

Example:

```js
const getData = async () => {

};
```

`async` allows use of `await`.

---

## Await

```js
const response = await axios.get(url);
```

`await` pauses code until the API responds.

Without it:

- Requests may still be pending
- Data may not exist yet

---

## Making API Requests

## Using Fetch

```js
const response = await fetch(url);

const data = await response.json();
```

---

## Using Axios

```js
const response = await axios.get(url);

const data = response.data;
```

Axios automatically converts JSON.

---

## React State and APIs

API data is usually stored in state.

Example:

```js
const [data, setData] = useState(null);
```

---

## Saving API Data

```js
setData(response.data);
```

Updating state causes React to rerender.

---

## Conditional Rendering

Data may not exist immediately.

This prevents crashes:

```jsx
{data && <p>{data.name}</p>}
```

Meaning:

> “Only render if data exists.”

---

## Loading States

Users should know when data is loading.

Example:

```js
const [loading, setLoading] = useState(false);
```

---

## Error Handling

APIs sometimes fail.

Always use:

```js
try {

} catch (error) {

}
```

Example:

```js
try {

  const response = await axios.get(url);

} catch (error) {

  console.log(error.message);

}
```

---

## Common API Flow in React

```txt
1. User clicks button
2. Function runs
3. API request sent
4. Response received
5. Data stored in state
6. React rerenders UI
```

---

## Common Beginner Mistakes

## 1. Forgetting `await`

Wrong:

```js
const response = axios.get(url);
```

Correct:

```js
const response = await axios.get(url);
```

---

## 2. Wrong Environment Variable Name

Wrong:

```env
API_KEY=123
```

Correct for Vite:

```env
VITE_API_KEY=123
```

---

## 3. Forgetting to Restart Dev Server

After changing `.env`:

```bash
npm run dev
```

Restart the server.

---

## 4. Accessing Data Too Early

Wrong:

```jsx
<p>{data.name}</p>
```

Correct:

```jsx
{data && <p>{data.name}</p>}
```

---

## API Vocabulary

| Word | Meaning |
|------|---------|

| API | Service providing data |
| Endpoint | API route |
| Request | Asking for data |
| Response | Returned data |
| JSON | Common data format |
| Async | Happens over time |
| Await | Wait until complete |
| State | React stored data |
| Environment Variable | Config value |
| GET Request | Retrieve data |
| POST Request | Send data |

---

## Real-World Development Tips

## Start Simple

Begin with:

- One endpoint
- One API request
- Basic rendering

---

## Read Documentation Carefully

Professional developers constantly read API documentation.

Look for:

- Endpoints
- Required parameters
- Authentication
- Example requests
- Example responses

---

## Test APIs Independently

Before React:

- Browser
- Postman
- Thunder Client

This helps isolate problems.

---

## Recommended Learning Order

1. Learn React state
2. Learn async/await
3. Learn fetch()
4. Learn JSON
5. Learn Axios
6. Learn reusable API services
7. Learn authentication APIs

---

## Final Concept

APIs allow React apps to become dynamic.

Instead of hardcoded information:

```txt
React app ↔ API ↔ Live data
```

This is how modern applications:

- Display weather
- Show social media posts
- Use AI
- Load videos
- Handle logins
- Process payments
- Access databases
