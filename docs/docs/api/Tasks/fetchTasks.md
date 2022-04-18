---
title: Get All Tasks
---

export const Endpoint = ({children, color}) => ( <span style={{
borderRadius: '2px',
color: '#E83E8C',
}}>{children}</span> );

<Endpoint>GET /tasks?start=yyyymmdd&end=yyyymmdd</Endpoint>: Get all tasks <br></br>

### Description

If start and end dates parameters are not specified, then it will return all the user's tasks. Otherwise, it will filter out the tasks within the range specified by start and end parameters.

### Example Request

This is a **protected route**, a **valid JWT is required** in the header field

#### Header

```
Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTU4MjQyNzUsImlhdCI6IjIwMjAtMDctMjdUMDA6MjY6MTUuNzg5NTg0Mi0wNDowMCIsInN1YiI6ImNocmlzIn0.5US2_ITKcfgkpEbfsR-gxXbGPFY6XsgJPcGA5qaBD1M
```

#### Parameters

start: yyyymmdd\
end: yyyymmdd

#### Body

```json
{}
```

### Possible Responses

#### Immediate Success

```json
[
  {
    "_id": "621a4344ef06ebbe8c54b32c",
    "title": "Test for eve",
    "user_id": "62073a5b9d6357d1e8805942",
    "description": "Teset",
    "startDate": "2022-02-12T15:02:08.669Z",
    "endDate": "2022-02-12T15:02:08.669Z",
    "isStarted": false,
    "createdAt": "2022-02-26T15:12:04.048Z",
    "updatedAt": "2022-02-26T15:12:04.048Z",
    "__v": 0
  },
  {
    "_id": "621a468144cb69f3354c56f3",
    "title": "Test for evee 2",
    "user_id": "62073a5b9d6357d1e8805942",
    "description": "Teset",
    "startDate": "2022-02-12T15:02:08.669Z",
    "endDate": "2022-02-12T15:02:08.669Z",
    "isStarted": false,
    "createdAt": "2022-02-26T15:25:53.154Z",
    "updatedAt": "2022-02-26T15:25:53.154Z",
    "__v": 0
  }
]
```

#### Failure

```json
{
  "message": "Not authorized, token failed",
  "stack": ""
}
```

```json
{
  "message": "Invalid Date Input",
  "stack": ""
}
```

```json
{
  "message": "Not Authorized, token failed",
  "stack": ""
}
```

```json
{
  "message": "Could not fetch doc",
  "stack": ""
}
```
