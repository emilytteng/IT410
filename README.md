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
- createAssignment
- deleteAssignment
- modifyAssignment
- markAssignmentComplete
- markAssignmentIncomplete
- sortAllAssignmentsByDate
- viewCourseAssignments
- sortCourseAssignmentsByType 

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
- type
- completed (`true` or `false`)

## Value Objects

### object
- here

# REST API Design

## Endpoints

| Description | URL Fragment | HTTP Method | Path Parameters | Representation |
| ----------- | ------------ | ----------- | --------------- | -------------- |
| create account | h | POST |  |  |
| modify account | h | PUT |  |  | 
| delete account | h | DELETE |  |  |
| log in | h | PUT |  |  | 
| log out | h | PUT |  |  |
| create course | h | POST |  |  | 
| delete course | h | DELETE |  |  |
| create assignment | h | POST |  |  | 
| delete assignment | h | DELETE |  |  |
| modify assignment | h | PUT |  |  | 
| mark assignment complete | h | PUT |  |  |
| mark assignment incomplete | h | PUT |  |  | 
| sort all assignments | h | GET |  |  |
| view course assignments | h | GET |  |  |
| sort course assignments by type | h | GET |  |  | 

## Representations

Here

