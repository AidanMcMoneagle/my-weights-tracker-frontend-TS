# myWeightsTracker
Welcome to the front-end of myWeightsTracker. This fully responsive, full-stack MERN application allows users to create, track and view progress of their gym workouts. To view the hosted application and start using the app please click <a href='https://myweightstracker.web.app'>here</a>.

Highlights:
- Implements JWT user authentication and secure password reset via email with nodemailer.
- Uses recharts library to produce graphs visualising workout progress.
- Client side routing using React Router.

The back-end of this application is contained within my-weights-tracker-backend repository. 

## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Screenshots](#screenshots)
* [Project Status](#project-status)
* [Room for Improvement](#room-for-improvement)

## General Information
The app has 4 main pages:
- Login/Signup page inc forgot/reset password pages
- My Workouts page - displays all workouts the user has created.
- New Workout page - allows the user to create a new workout
- My Progress page - displays the exercise progress of the selected workout. 

## Technologies Used
- React.js
- Express.js
- Node.js 
- MongoDB

## Features
The main feature of this application is allowing the user to track their created workouts and view the progress of each exercise in the workout over time. 
- By clicking the 'Track Workout' button on the 'My Workouts' page the user can track the weight lifted for every set of each exercise in the workout. 
- Once all inputs have been filled and the exercises weights confirmed the user can log the workout. 
- By clicking the 'View Progress' button the user is redirected to the 'My Progress' page. This page displays a graph (created using recharts library) for each exercise in the workout. The y-axis represents the average weight lifted and the x-axis represents the workout date.

Additional features include:
- Secure password reset functionality via email using nodemailer. 
- Delete and archive workout functionality.
- Automatic login.

## Screenshots

### 1.Login & Signup Page
<img src="https://user-images.githubusercontent.com/99369057/219966419-4632d04c-fdf3-4073-b256-bb6825e1b0ca.png" width="600"> 
<img src="https://user-images.githubusercontent.com/99369057/217110590-eb789dea-44a9-4e31-8d4a-24760a84c7c8.png" width="600">
<img src="https://user-images.githubusercontent.com/99369057/219966574-05bc53e9-1b9e-44cb-be67-8443a7c74f4a.png" width="600">
<img src="https://user-images.githubusercontent.com/99369057/219966744-f6dc2843-4052-4e29-9f95-2b61ba807107.png" width="600">

### 2.Forgot & Reset Password Pages
<img src="https://user-images.githubusercontent.com/99369057/219966915-52c68ec2-1696-4316-a22e-0cd640ff33c4.png" width="600">
<img src="https://user-images.githubusercontent.com/99369057/219966940-d9726357-45dd-48d1-8fc9-3b042dd37a20.png" width="600">
<img src="https://user-images.githubusercontent.com/99369057/219966962-acf9551b-88db-44c7-b252-534d4f134a8d.png" width="600">
<img src="https://user-images.githubusercontent.com/99369057/219966983-4568eff3-97fe-4745-852d-f7ca4badfa65.png" width="600">
<img src="https://user-images.githubusercontent.com/99369057/219967013-7dc7568d-d3b6-4686-8800-50458e4619ed.png" width="600">

### 3.My Workouts Page
<img src="https://user-images.githubusercontent.com/99369057/214873594-6d0fa0cc-dd45-4723-8a1b-0d3bc302f1ce.png" width="600">
<img src="https://user-images.githubusercontent.com/99369057/219967526-89646dba-d60f-4e83-a456-11d9a8ca475c.png" width="600">
<img src="https://user-images.githubusercontent.com/99369057/214873781-5f00fb3e-2ab8-492b-83dc-8751875b8e13.png" width="600">
<img src="https://user-images.githubusercontent.com/99369057/214873809-99ea580f-c664-4fda-9b5d-b8d5d8b22032.png" width="600">
<img src="https://user-images.githubusercontent.com/99369057/214873836-0bbc1636-d9d3-45ed-a9e6-47af29727af1.png" width="600">
<img src="https://user-images.githubusercontent.com/99369057/214873973-d7fd383f-80f1-4203-89ed-904ec9348a13.png" width="600">
<img src="https://user-images.githubusercontent.com/99369057/214874007-e4db1d16-b05e-4b8e-97a4-d37db0150d7d.png" width="600">


### 4.New Workout Page
<img src="https://user-images.githubusercontent.com/99369057/214873624-e3c631c4-0747-49ec-85e5-9b3447a5f8e1.png" width="600">
<img src="https://user-images.githubusercontent.com/99369057/214873655-4c8300ba-192e-4105-b502-470947ef0d94.png" width="600">
<img src="https://user-images.githubusercontent.com/99369057/214873701-0373357c-d874-4d05-b91c-bb5263b6d0ec.png" width="600">
<img src="https://user-images.githubusercontent.com/99369057/214873732-718e3ce4-af4c-4232-8116-3d67c41531bb.png" width="600">

### 5.My Progress Page 
<img src="https://user-images.githubusercontent.com/99369057/215341977-c2160441-f914-4b78-b1c9-df471991b532.png" width="600">


## Project Status
Project is: in progress. 

## Room for Improvement
Room for improvement:
- Add forgot password feature (Feature has now been added)
- Implement filter function on graphs that will display progress by time period. 

To do:
- Migrate project to TypeScript. 



