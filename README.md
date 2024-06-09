
# LearnX E-learning Web




## Introduction
Welcome to My E-Learning Web Platform Project, designed to facilitate interaction between educators and students. This project utilizes JavaScript with React for the frontend and Express for the backend.


## Demo

To explore my E-Learning Platform, you can visit this demo site
https://learnx-demo.up.railway.app/ (closed due limited domain subcription)


## Asset
To know about more detail, you can visit this url
https://drive.google.com/drive/folders/1Wv-MwtanAIOsBa3f_I95nANAU97yktp3?usp=sharing


## Features

### 1. Real-Time Forum Chat
With socket io from JS, I've implemented real-time forum chat in every class, encouraging dynamic and engaging discussions between students and teachers.
![class-forum](https://github.com/mirza27/LearnX-e-learning_web/blob/main/assets/class-forum.png)
roomchat for each class 

### 2. Class Management
#### - Create and Join Multiple Classes: 
Students can seamlessly join multiple classes by entering unique codes. Through user authentication and authorization, students can effortlessly join and participate in multiple classes
#### - Create Multiple Classes: 
Lecturers have the capability to create and manage multiple classes, each with its distinct code.
![dashboard](https://github.com/mirza27/LearnX-e-learning_web/blob/main/assets/dashboard.png)
lecuter dashboard

![class-menu](https://github.com/mirza27/LearnX-e-learning_web/blob/main/assets/class-menu.png)
list of class created by lecturer

![class-page](https://github.com/mirza27/LearnX-e-learning_web/blob/main/assets/class-page.png)
students from a class


### 3. Event-Driven Class Content
Ease of student access as classes are structured around events, allowing for organized and scheduled content delivery. The content classes presented are material, task, and announcement
![class-detail](https://github.com/mirza27/LearnX-e-learning_web/blob/main/assets/class-detail.png)
class detail page

### 4. Task Management System
Including task management system that enables lecturers to create give score, students to submit, and both parties to track deadlines.
![task](https://github.com/mirza27/LearnX-e-learning_web/blob/main/assets/task.png)
task detail page

![attaching-task](https://github.com/mirza27/LearnX-e-learning_web/blob/main/assets/attaching-task.png)
attach page by student

![student-attachment](https://github.com/mirza27/LearnX-e-learning_web/blob/main/assets/student-attachment.png)
![student-task-attachment](https://github.com/mirza27/LearnX-e-learning_web/blob/main/assets/student-task-attachment.png)
student task attachment

![scoring-task](https://github.com/mirza27/LearnX-e-learning_web/blob/main/assets/scoring-task.png)
![scored-task](https://github.com/mirza27/LearnX-e-learning_web/blob/main/assets/scored-task.png)
scored task

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/mirza27/LearnX-e-learning_web.git
```
### 2. Install Dependencies:
Make sure to install all package needed for both backend (/server) adn frontend (/client)
```bash
cd <client/server>
npm install <package-name>
```
### 3. Set Up My SQL Database:
set up the MySql Database in /server/.env
### 4. Set Up Cloudinary API:
set up the Cloudinary API /clent/src/cloudinaryConfig.ts

### 4. Run:
Run the both backend and frontend server. Make sure use the correct port.
```bash
cd <client/server>
npm start
```
    
## Special Thanks
Thank you to adminhub by  for providing the design inspiration for this project.
[adminhub](https://github.com/fajarnurwahid/adminhub)
## Feedback

If you have any feedback, please reach out to me at ramadhanimirza10@gmail.com

