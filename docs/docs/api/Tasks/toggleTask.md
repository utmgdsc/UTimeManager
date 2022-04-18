---
title: Toggle Task
---

export const Endpoint = ({children, color}) => ( <span style={{ borderRadius: '2px', color: '#E83E8C', }}>
{children}</span> );

<Endpoint>PUT /tasks/toggle/:id</Endpoint>: Toggle Task <br></br>

### Example Request

This is a **protected route**, a **valid JWT is required** in the header field

#### Header

```
Cookie:token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTU4MjQyNzUsImlhdCI6IjIwMjAtMDctMjdUMDA6MjY6MTUuNzg5NTg0Mi0wNDowMCIsInN1YiI6ImNocmlzIn0.5US2_ITKcfgkpEbfsR-gxXbGPFY6XsgJPcGA5qaBD1M
```

#### Body

```json
{}
```

### Possible Responses

#### Immediate Success

**Note**: When a task is started, `isStarted` will be true and the field `taskStartedAt` will also be returned. When a task is
completed, `isStarted` will be false and the field `taskEndedAt` will also be returned.

```json
  {
    "_id": "624e092e41654b05d27107b9",
    "title": "Task 2 - Greet professor Ilir",
    "user_id": "62073a5b9d6357d1e8805942",
    "description": "john",
    "location": "UTM",
    "startDate": "2022-04-06T04:00:00.000Z",
    "endDate": "2022-04-07T04:00:08.000Z",
    "isStarted": true,
    "createdAt": "2022-04-06T21:42:06.367Z",
    "updatedAt": "2022-04-18T13:28:51.921Z",
    "__v": 0,
    "taskStartedAt": "2022-04-18T13:28:51.846Z"
  }
```

#### Failure

```json
{
    "message": "Couldn't start task. The task has already ended",
    "stack": ""
}
```

```json
{
    "message": "Task not found",
    "stack": ""
}
```

```json
{
    "message": "Could not fetch doc",
    "stack": ""
}
```

```json
{
    "message": "Not authorized, token failed",
    "stack": ""
}
```





