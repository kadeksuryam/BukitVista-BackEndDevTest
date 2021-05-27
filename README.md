<p align="center">

  <h3 align="center">Simple API Service</h3>

  <p align="center">
    Bukit Vista Internship - Backend Developer Test
  </p>
</p>


<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#api-documentation">API Documentation</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

Simple REST API server that basically provide Create-Read operation on user favorite movies posters data with help OMDB's API

### Built With
* [ExpressJS](https://expressjs.com/)
* [SQLite](https://www.sqlite.org/index.html)

<!-- GETTING STARTED -->
## Getting Started

### Prerequisites
* NodeJS has already installed, you can grab the installer on : https://nodejs.org/en/

### Installation and Running

* Install yarn
  ```sh
  npm install --global yarn
  ```
* Install all dependencies
  ```sh
  yarn
  ```
* Run the server (production)
  ```sh
  yarn start
  ```
* Run the server (development)
  ```sh
  yarn run dev
  ```
<!-- API Documentation -->
## API Documentation

**Show a Movie Poster**
----
  Returns json data about a movie poster.

* **URL**

  /api/movies/:movies_title

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `movies_title=[string]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ "title": "The Imitation Game","posterURL": "https://m.media-amazon.com/images/M/MV5BOTgwMzFiMWYtZDhlNS00ODNkLWJiODAtZDVhNzgyNzJhYjQ4L2ltYWdlXkEyXkFqcGdeQXVyNzEzOTYxNTQ@._V1_SX300.jpg" }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ "error": "Movie not found! }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{"error": "token missing or invalid" }`

* **Sample Call:**

  ```
  curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic3VyeWEiLCJpZCI6MiwiaWF0IjoxNjIyMTM0NzI4LCJleHAiOjE2MjIxMzgzMjh9.lqxJhx2pT4tolYbOddz2rDGRkxpUHEHsRE82zN6PBAU" http://localhost:8080/api/movies/the+imitation+gam
  ```

**Show All User Favorite Movies Poster**
----
  Returns json data about all user favorite movies.

* **URL**

  /api/movies/favorite

* **Method:**

  `GET`
  
*  **URL Params**

   None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[
    {
        "title": "The Imitation Game",
        "posterURL": "https://m.media-amazon.com/images/M/MV5BOTgwMzFiMWYtZDhlNS00ODNkLWJiODAtZDVhNzgyNzJhYjQ4L2ltYWdlXkEyXkFqcGdeQXVyNzEzOTYxNTQ@._V1_SX300.jpg"
    },
    {
        "title": "The Man Who Knew Infinity",
        "posterURL": "https://m.media-amazon.com/images/M/MV5BMTU3Njg4MDM3OV5BMl5BanBnXkFtZTgwMjE5ODM3ODE@._V1_SX300.jpg"
    },
    {
        "title": "Snowden",
        "posterURL": "https://m.media-amazon.com/images/M/MV5BMTg2MzYzNzgzOF5BMl5BanBnXkFtZTgwOTg4NzQ4OTE@._V1_SX300.jpg"
    }
]`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{"error": "token missing or invalid" }`

* **Sample Call:**

  ```
  curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoia2FkZWsiLCJpZCI6MSwiaWF0IjoxNjIyMTM4MzU4LCJleHAiOjE2MjIxNDE5NTh9.aiY3iwBKgya6OMocPhtJ6AITTJ5t1E-QNuBVmpd6wvw" http://localhost:8080/api/movies/favorite
  ```

**Insert User's Favorite Movie**
----
  Returns json data about all user favorite movies.

* **URL**

  /api/movies/favorite

* **Method:**

  `POST`
  
*  **URL Params**

   None

* **Data Params**

  **Content:** `{"title" : "86"}`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"status": "success add the movie" }`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{"error": "token missing or invalid" }`

* **Sample Call:**

  ```
  curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoia2FkZWsiLCJpZCI6MSwiaWF0IjoxNjIyMTM4MzU4LCJleHAiOjE2MjIxNDE5NTh9.aiY3iwBKgya6OMocPhtJ6AITTJ5t1E-QNuBVmpd6wvw" -d '{"title":"86"}' http://localhost:8080/api/movies/favorite
  ```

**Login**
----
  Returns json data about user login status.

* **URL**

  /api/login

* **Method:**

  `POST`
  
*  **URL Params**

   None

* **Data Params**

  **Content:** `{"name": "kadek", "password" : "tes"}`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoia2FkZWsiLCJpZCI6MSwiaWF0IjoxNjIyMTM5MzMyLCJleHAiOjE2MjIxNDI5MzJ9.rvOV5g_FI1VzVR6mM6-uBylbdgzEWuBBiJP6zYZxBfE",
    "name": "kadek"
}`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{
    "error": "unauthorized"
}`

* **Sample Call:**

  ```
  curl -H 'Content-Type: application/json' -d '{"name": "kadek", "password" : "tes"}' http://localhost:8080/api/login
  ```


<!-- CONTACT -->
## Contact

Kadek Surya Mahardika - kadeksuryam@gmail.com
