---
title: Fetch Single Task
---

export const Endpoint = ({children, color}) => ( <span style={{ borderRadius: '2px', color: '#E83E8C', }}>
{children}</span> );

<Endpoint>GET /tasks/task/:id</Endpoint>: Fetch a single Task

```json
{}
```

### Example Request

This is a **protected route**, a **valid JWT is required** in the header field

#### Header

```
Cookie:token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTU4MjQyNzUsImlhdCI6IjIwMjAtMDctMjdUMDA6MjY6MTUuNzg5NTg0Mi0wNDowMCIsInN1YiI6ImNocmlzIn0.5US2_ITKcfgkpEbfsR-gxXbGPFY6XsgJPcGA5qaBD1M
```

#### Parameters

id: task_id

### Possible Responses

#### Immediate Success

```json
{
     "_id": "624e090f41654b05d27107b7",
     "title": "Task 1 - Present API to professor Ilir",
     "user_id": "62073a5b9d6357d1e8805942",
     "description": "john",
     "location": "UTM",
     "startDate": "2022-04-04T04:00:00.000Z",
     "endDate": "2022-04-05T04:00:08.000Z",
     "isStarted": false,
     "createdAt": "2022-04-06T21:41:35.851Z",
     "updatedAt": "2022-04-06T21:44:02.730Z",
     "__v": 0,
     "taskStartedAt": "2022-04-06T21:43:42.134Z",
     "taskEndedAt": "2022-04-06T21:44:02.652Z"
}
```

#### Failure
```json
{
    "message": "Invalid id provided",
    "stack": ""
}
```

```json
{
    "message": "Unable to get a task",
    "stack": ""
}
```

```json
{
    "message": "Not Authorized, token failed",
    "stack": ""
}
```
