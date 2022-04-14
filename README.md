# Semester Project Proposal

## School Assignment Manager

This project will make it possible for students to track and manage coursework throughout multiple courses. Students can add different assignment types (homework, readings, quizzes, exams, etc.) with corresponding due dates and update its completion status. 

These attributes allow for accessing assignments for a specific class, sorting all assignments by due date, filtering by assignment type, and track task/assignment completion. 

# Domain Driven Design

## Events

- user account created
- user account modified (password)
- user account deleted
- user logged in
- user logged out
- course created
- course modified (course name)
- course deleted
- assignment created
- assignment modified (completed)
- assignment deleted

## Commands

- createUserAccount
- modifyUserAccount
- deleteUserAccount
- logInUser
- logOutUser
- createCourse
- deleteCourse
- modifyCourse
- createAssignment
- deleteAssignment
- modifyAssignment
- markAssignmentComplete
- markAssignmentIncomplete
- viewCourseAssignments

## Entities

### User Account
- user id
- username
- password
- session info

### Course
- course id
- name

### Assignment
- assignment id
- course id
- name
- due date
- completed (`true` or `false`)

# REST API Design

## Endpoints

| Description             | URL Fragment                   | HTTP Method | Path Parameters       | Representation         |
| -----------             | ------------                   | ----------- | ---------------       | --------------         |
| create account          | `/accounts`                    | POST        |                       | Create Account         |
| modify account          | `/accounts/{userId}`           | PUT         | `userId`              | Modify Account         | 
| delete account          | `/accounts/{userId}`           | DELETE      | `userId`              |                        |
| log in                  | `/accounts/{userId}/login`     | PUT         | `userId`              | Account Log In         |
| log out                 | `/accounts/{userId}/logout`    | PUT         | `userId`              |                        |
| view courses            | `/courses`                     | GET         |                       | Get Courses            |
| create course           | `/courses`                     | POST        |                       | Create Course          | 
| view course assignments | `/courses/{courseId}`          | GET         | `courseId`            | Get Course Assignments |
| create assignment       | `/courses/{courseId}`          | POST        | `courseId`            | Create Assignment      | 
| modify course           | `/courses/{courseId}`          | PUT         | `courseId`            | Modify Course          |
| delete course           | `/courses/{courseId}`          | DELETE      | `courseId`            |                        |
| modify assignment       | `courses/{courseId}/{asgmtId}` | PUT         | `courseId`, `asgmtId` | Modify Assignment      | 
| delete assignment       | `courses/{courseId}/{asgmtId}` | DELETE      | `courseId`, `asgmtId` |                        |

## Representations

### Create Account

Request

```json
{
    "username": "username",
    "password": "pswd"
}
```

### Modify Account

Request

```json
{
    "password": "pswdNew"
}
```

### Account Log In

Request

```json
{
    "password": "pswd"
}
```

### Get Courses

Response

```json
[
    {
        "courseId": "1",
        "courseName": "IT 410"
    },
    {
        "courseId": "2",
        "courseName": "IT 477"
    },
    {
        "courseId": "3",
        "courseName": "IT 293"
    }
]
```

### Create Course

Request

```json
{
    "courseName": "IT 410"
}
```

### Get Course Assignments

Response

```json
[
    {
       "courseId": "1",
       "asgmtId": "4",
        "asgmtName": "DDD",
        "dueDate": "1-19-2022",
        "completed": true
    },
    {
        "courseId": "1",
        "asgmtId": "5",
        "asgmtName": "RestAPI",
        "dueDate": "1-19-2022",
        "completed": false
    },
    {
        "courseId": "1",
        "asgmtId": "6",
        "asgmtName": "OpenAPI Doc",
        "dueDate": "1-19-2022",
        "completed": false
    }
]
```

### Create Assignment

Request

```json
{
    "asgmtName": "Ch 1 Quiz",
    "dueDate": "1-21-2022",
}
```

### Modify Course

Request

```json
{
    "courseName": "IT&C 410"
}
```

### Modify Assignment

Request

```json
{
    "completed": true
}
```

### Get All Assignments

Response

```json
[
    {
        "courseId": "3",
        "asgmtId": "1",
        "asgmtName": "Ch 1 Reading",
        "dueDate": "1-17-2022",
        "completed": false
    },
    {
        "courseId": "4",
        "asgmtId": "2",
        "asgmtName": "Ch 1 Reflection",
        "dueDate": "1-19-2022",
        "completed": false
    },
    {
        "courseId": "2",
        "asgmtId": "3",
        "asgmtName": "Ch 1 Quiz",
        "dueDate": "1-21-2022",
        "completed": false
    }
]
```
