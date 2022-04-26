---
title: Fetch Feedback
---

export const Endpoint = ({children, color}) => ( <span style={{ borderRadius: '2px', color: '#E83E8C', }}>
{children}</span> );

<Endpoint>GET /feedback/tasks/:taskId</Endpoint>: Fetch feedback for a task

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

taskId: task_id

### Possible Responses

#### Immediate Success

```json
{
    "_id": "6266ff00fbdcfe91e02d42b5",
    "body": "Feedback from Chris on feedback branch: fix this",
    "task_id": "6266ff00fbdcfe91e02d42b3",
    "satisfaction": 9,
    "user_id": "6266fefffbdcfe91e02d429b",
    "createdAt": "2022-04-25T20:05:20.074Z",
    "updatedAt": "2022-04-25T20:05:20.074Z",
    "__v": 0
}
```

#### Failure

```json
{
    "message": "Invalid task id provided",
    "stack": ""
}
```

```json
{
    "message": "Unable to get feedback",
    "stack": ""
}
```

```json
{
    "message": "Not Authorized, token failed",
    "stack": ""
}
```
