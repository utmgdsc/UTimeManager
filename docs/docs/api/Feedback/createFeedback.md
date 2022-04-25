---
title: Create Feedback
---

export const Endpoint = ({children, color}) => ( <span style={{
borderRadius: '2px',
color: '#E83E8C',
}}>{children}</span> );

<Endpoint>POST /feedback</Endpoint>: Create feedback for a particular task <br></br>

```json
{
    "body": string,
    "task_id": string,
    "satisfaction": number
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
    "body": "Feedback on feedback branch: fix this",
    "task_id": "621430805e4be46e981eef34",
    "satisfaction": 8
}
```

### Possible Responses

#### Immediate Success

```json
{
    "body": "Feedback on feedback branch: fix this",
    "user_id": "62227aab7a9965d0be73b052",
    "task_id": "621430805e4be46e981eef34",
    "satisfaction": 8
}
```

#### Failure

```json
{
    "message": "Invalid Feedback Input",
    "stack": ""
}
```

```json
{
    "message": "Not Authorized, token failed",
    "stack": ""
}
```


