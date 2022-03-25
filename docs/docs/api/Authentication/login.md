---
title: Login
---

export const Endpoint = ({children, color}) => ( <span style={{
borderRadius: '2px',
color: '#E83E8C',
}}>{children}</span> );

<Endpoint>POST /login</Endpoint>: Login to the app provided the correct user credentials <br></br>

```json
{
    "email": string,
    "password": string,
}
```

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

#### Failure

```json
{
  "message": "No user found",
  "stack": "Error: No user found"
}
```
