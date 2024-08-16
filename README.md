# Course


# Prerequisites

Make sure you have the following installed on your system:

-   Node.js
-   PostgreSQL
-   redis

## Installation

1. Clone the repository:

```
git clone https://github.com/iam-abin/Zebronet.git
```

2. Navigate to the project directory:

```
cd Zebronet
```

3. Install the dependencies:

```
npm install 
```


4. Set up the required environment variables. Rename the `.env.example` file to `.env` and provide the necessary values for your environment.

5. Start server (Running the app):

```
 npm run dev
```

**Start with these steps**

1. Signup a user with userName, email, password , using signup route.
  POST http://localhost:8000/api/v1/auth/signup
eg - 
```
{
    "name":"arun",
    "email":"arun@gmail.com",
    "password":"arun"
}
```
2. Signin using the email and password to generate JWT access token, using signin route.
3. POST http://localhost:8000/api/v1/auth/signin
eg - 
```
{
    "email":"arun@gmail.com",
    "password":"arun"
}
```

3. Then do other tasks using api
   http://localhost:8000/api/v1/course/<Endpoints...>

# Api Endpoints

User
----
POST http://localhost:8000/api/v1/auth/signup - for user signup('user' who create teams ans tasks) <br>
POST http://localhost:8000/api/v1/auth/signin- for user signup('user' who create teams ans tasks)

Course
-------
POST http://localhost:8000/api/v1/course - to create a course <br>
GET http://localhost:8000/api/v1/course/1 - to get a course using courseId <br>
GET http://localhost:8000/api/v1/course/Btech Mec - to search a course using course name <br>
PATCH http://localhost:8000/api/v1/course/1 - to update a course using courseId<br>
DELETE http://localhost:8000/api/v1/course/1- to delete a course using courseId <br>