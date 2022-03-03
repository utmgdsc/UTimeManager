---
title: Change Password
---

export const Endpoint = ({children, color}) => ( <span style={{
borderRadius: '2px',
color: '#E83E8C',
}}>{children}</span> );

<Endpoint>POST /changePassword/users/{"{username}"}</Endpoint>: Changing a user's password

```json
{
    "OldPassword": string,
    "NewPassword": string,
}
```

### Example Request
This is a **protected route**, a **valid JWT is required** in the header field
#### Header
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTU4MjQyNzUsImlhdCI6IjIwMjAtMDctMjdUMDA6MjY6MTUuNzg5NTg0Mi0wNDowMCIsInN1YiI6ImNocmlzIn0.5US2_ITKcfgkpEbfsR-gxXbGPFY6XsgJPcGA5qaBD1M
```

#### Body
```json
{
  "OldPassword": "abc123",
  "NewPassword": "lmnop123"
}
```

### Possible Responses
#### Immediate Success
```json
{
	"code": 1,
	"message": "successfully updated password",
	"data": {}
}
```
#### Failure
```json
{
	"code": -1,
	"message": "unable to update password",
	"data": {}
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


