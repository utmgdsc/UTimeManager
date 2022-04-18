---
title: Create Task
---

export const Endpoint = ({children, color}) => ( <span style={{
borderRadius: '2px',
color: '#E83E8C',
}}>{children}</span> );

<Endpoint>POST /feedback</Endpoint>: Create a feedback with provided feedback details <br></br>

```json
{
    "body": string,
    "user_id": String,
    "task_id": String,
    "satisfaction": Number,
    "createDate": String,
}
```

### Example Request

This is a **protected route**, a **valid JWT is required** in the header field

#### Header

```
Cookie:
token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTU4MjQyNzUsImlhdCI6IjIwMjAtMDctMjdUMDA6MjY6MTUuNzg5NTg0Mi0wNDowMCIsInN1YiI6ImNocmlzIn0.5US2_ITKcfgkpEbfsR-gxXbGPFY6XsgJPcGA5qaBD1M
```

#### Body

```json
{
  "body": "Feedback on feedback branch: fix this",
  "user_id": "62227aab7a9965d0be73b052",
  "task_id": "621430805e4be46e981eef34",
  "satisfaction": 8,
  "createDate": "2022-03-20T01:52:04.564Z"
}
```

**Note**: Every attribute is required except createDate <br></br>

### Possible Responses

#### Immediate Success

```json
{
  "body": "Feedback on feedback branch: fix this",
  "user_id": "62227aab7a9965d0be73b052",
  "task_id": "621430805e4be46e981eef34",
  "satisfaction": 8,
  "createDate": "2022-03-20T01:52:04.564Z"
}
```

#### Failure

```json
{
    "message": "Task validation failed: user_id: Cast to ObjectId failed for value \"62227aab7a99673b052\" (type string) at path \"user_id\"",
    "stack": "ValidationError: Task validation failed: user_id: Cast to ObjectId failed for value \"62227aab7a99673b052\" (type string) at path \"user_id\"
}
```

```json
{
  "message": "Task validation failed: title: Path `title` is required.",
  "stack": "ValidationError: Task validation failed: title: Path `title` is required."
}
```
