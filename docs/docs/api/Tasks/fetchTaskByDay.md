---
title: Fetch Task By Day
---

export const Endpoint = ({children, color}) => ( <span style={{
borderRadius: '2px',
color: '#E83E8C',
}}>{children}</span> );

<Endpoint>GET /tasks/day/:day</Endpoint>: Fetching a single Task

```json
{}
```

### Example Request

This is a **protected route**, a **valid JWT is required** in the header field

#### Header

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTU4MjQyNzUsImlhdCI6IjIwMjAtMDctMjdUMDA6MjY6MTUuNzg5NTg0Mi0wNDowMCIsInN1YiI6ImNocmlzIn0.5US2_ITKcfgkpEbfsR-gxXbGPFY6XsgJPcGA5qaBD1M
```

#### Body

```json
{}
```

#### Parameters

```json
{
  "day": "yyyy-MM-dd'T'HH:mm:ss" // ISO formatted START date
}
```

### Possible Responses

#### Immediate Success

```json
{
  "code": 500,
  "message": "Could not fetch doc",
  "data": {}
}
```

#### Failure

```json
{
  "code": 200,
  "message": "",
  "data": {
    // List of all tasks from within two days of the starting date
  }
}
```

```json
{
  "code": -1,
  "message": "Forbidden",
  "data": {}
}
```

```json
{
  "code": -1,
  "message": "user not found",
  "data": {}
}
```
