---
title: Create Task
---

export const Endpoint = ({children, color}) => ( <span style={{
borderRadius: '2px',
color: '#E83E8C',
}}>{children}</span> );

<Endpoint>POST tasks/</Endpoint>: Create a task withh provided details <br></br>

```json
{
    "title": string,
    "user_id": string,
    "description": string,
    "startDate": string,
    "endDate": string,
    "isStarted": boolean
}
```

<!-- {
"title" : "Task 1 - john",
"user_id" : "62227aab7a9965d0be73b052",
"description" : "john",
"startDate" : "2022-02-25T15:02:08",
"endDate" : "2022-02-27T15:02:08",
"isStarted" : false
} -->

### Example Request

#### Body

```json
{
  "email": "nestor@gmail.com",
  "Password": "abc123"
}
```

### Possible Responses

#### Immediate Success

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTU4MjQyNzUsImlhdCI6IjIwMjAtMDctMjdUMDA6MjY6MTUuNzg5NTg0Mi0wNDowMCIsInN1YiI6ImNocmlzIn0.5US2_ITKcfgkpEbfsR-gxXbGPFY6XsgJPcGA5qaBD1M"
}
```

**Note**: If you log in again (while you're already logged in), any previous **access & refresh tokens** will be revoked. <br></br>

**Note**: The access token will be returned in `data.token`. The refresh token will be returned as an HTTPOnly, Secure, SameSite Cookie.

#### Failure

````json
{
    "message": "No user found",
    "stack": "Error: No user found"
}```
````
