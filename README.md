# Semester Project Proposal

## School Assignment Manager

This project will make it possible for students to track and manage coursework throughout multiple courses. Students can add different assignment types (homework, readings, quizzes, exams, etc.) with corresponding due dates and update its completion status. 

These attributes allow for accessing assignments for a specific class, sorting all assignments by due date, filtering by assignment type, and track task/assignment completion. 

# Domain Driven Design

## Events

- user account created
- user account deleted
- user logged in
- user logged out
- course created
- course deleted
- assignment created
- assignment modified
- assignment deleted
- assignment completed

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
- viewAllAssignmentsByDate
- viewCourseAssignments
- viewCompleteAndIncompleteCourseAssignments
- sortCourseAssignmentsByType (or just viewByType??)

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
- name
- due date
- assignment type
- completed (`true` or `false`)

### Assignment Type ???
- type id
- name

## Value Objects

### object
- here

# REST API Design

## Endpoints

| Description | URL Fragment | HTTP Method | Path Parameters | Representation |
| ----------- | ------------ | ----------- | --------------- | -------------- |
| create account | `/accounts` | POST |  | Create Account |
| modify account | `/accounts/{userId}` | PUT | `userId` | Modify Account | 
| delete account | `/accounts/{userId}` | DELETE | `userId` |  |
| log in | `/accounts/{userId}/login` | PUT | `userId` | Account Log In |
| log out | `/accounts/{userId}/logout` | PUT | `userId` |  |
| create course | `/courses` | POST |  | Create Course | 
| delete course | `/courses/{courseId}` | DELETE | `courseId` |  |
| modify course | `/courses/{courseId}` | PUT | `courseId` | Modify Course |
| create assignment | `/courses/{courseId}/` | POST | `courseId` | Create Assignment | 
| delete assignment | `courses/{courseId}/{asgmtId}` | DELETE | `courseId`, `asgmtId` |  |
| modify assignment | `courses/{courseId}/{asgmtId}` | PUT | `courseId`, `asgmtId` | Modify Assignment | 
| mark assignment complete | `courses/{courseId}/{asgmtId}` | PUT | `courseId`, `asgmtId` | Modify Assignment ?? |
| mark assignment incomplete | `courses/{courseId}/{asgmtId}` | PUT | `courseId`, `asgmtId` | Modify Assignment ?? | 
| view all assignments | `/` | GET |  | Get All Assignments |
| view courses | `/courses` | GET |  | Get Courses |
| view course assignments | `/courses/{courseId}/` | GET | `courseId` | Get Course Assignments |
| view complete and incomplete course assignments | `/courses/{courseId}/` | GET | `courseId` | Get Course Assignments All |
| sort course assignments by type | `/courses/{courseId}/type` ??? | GET | `courseId`, `asgmtId` | Get Course Assignments By Type | 

## Representations

### Create Account

```
{
    "username": "username",
    "name": "First Name",
    "password": "pswd"
}
```

### Modify Account

```
{
    here
}
```

### Account Log In

```
{
    here
}
```

### Create Course

```
{
    here
}
```

### Modify Course

```
{
    here
}
```

### Create Assignment

```
{
    here
}
```

### Modify Assignment

```
{
    here
}
```

### Get All Assignments

```
{
    here
}
```

### Get Courses

```
{
    here
}
```

### Get Course Assignments

```
{
    here
}
```

### Get Course Assignments All

```
{
    here
}
```

### Get Course Assignments By Type

```
{
    here
}
```

