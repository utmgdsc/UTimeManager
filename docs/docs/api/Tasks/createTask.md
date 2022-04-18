---
title: Create Task
---

export const Endpoint = ({children, color}) => ( <span style={{
borderRadius: '2px',
color: '#E83E8C',
}}>{children}</span> );

<Endpoint>POST /tasks</Endpoint>: Create a task with provided task details <br></br>

```json
{
    "title": string,
    "description": string,
    "location": string,
    "startDate": string,
    "endDate": string,
    "isStarted": boolean
}
```

### Example Request

This is a **protected route**, a **valid JWT is required** in the header field

#### Header

```
Cookie:token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTU4MjQyNzUsImlhdCI6IjIwMjAtMDctMjdUMDA6MjY6MTUuNzg5NTg0Mi0wNDowMCIsInN1YiI6ImNocmlzIn0.5US2_ITKcfgkpEbfsR-gxXbGPFY6XsgJPcGA5qaBD1M
```

#### Body

```json
{
    "title": "Task 2 - evvvve",
    "description": "john",
    "location": "UTM",
    "startDate": "2022-02-25T15:02:08",
    "endDate": "2022-02-27T15:02:08",
    "isStarted": false
}
```

**Note**: If the start date isn't provided, then the current date will be used (At the time of the Task model creation)<br></br>

### Possible Responses

#### Immediate Success

```json
{
    "title": "Task 2 - evvvve",
    "user_id": "62227aab7a9965d0be73b052",
    "description": "john",
    "location": "UTM",
    "startDate": "2022-02-25T20:02:08.000Z",
    "endDate": "2022-02-27T20:02:08.000Z",
    "isStarted": false,
    "_id": "623688c4f5735bc51286682f",
    "createdAt": "2022-03-20T01:52:04.564Z",
    "updatedAt": "2022-03-20T01:52:04.564Z",
    "__v": 0
}
```

#### Failure

```json
{
    "message": "Invalid Create Task Input",
    "stack": ""
}
```

```json
{
    "message": "Unable to create task",
    "stack": ""
}
```

```json
{
    "message": "Not Authorized, token failed",
    "stack": ""
}
```