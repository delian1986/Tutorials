# Video Tutorials Single Page App
"Video Tutorials" is a single page application written on MERN stack for SoftUni JS Web Course. The idea is inspired by websites like Udemy and Tutorials.bg. The application consists of users, courses and lectures.


## Key Functionalities

 - Anonymous users and registered users which are not enrolled the course have access to the first lecture of every course.
 - Registered users is able to access the courses and watch their lectures. 
 - Registered users can enroll the courses to gain full access on all lectures of the course.
 - Admin can create course, lectures and edit them.

## Additional Functionalities

 - Video player with "Now Playing" indicator.
 - "Already watched" indicator
 - Course progress bar calculated upon watched lectures
 - Search

## Instalation

#### Prerequisites
  

 - npm
 -  node
 - mongoDB



#### Steps
```sh
git clone https://github.com/delian1986/Tutorials.git
```
```sh
cd client
npm install
```

```sh
cd server
npm install
```
Install dependencies in both server and client folders
```sh
cd server
nodemon start
```
Start backend server
```sh
cd client
npm start
```
Start frontend 