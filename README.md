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
- sortCourseAssignmentsByDate

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

