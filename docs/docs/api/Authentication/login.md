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
    "Username": string,
    "Password": string,
}
```

### Example Request
#### Body
```json
{
    "Username": "Chris",
    "Password": "password"
}
```
### Possible Responses
#### Immediate Success
```json
{
	"code": 1,
	"message": "successfully logged in",
	"data": {
	    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTU4MjQyNzUsImlhdCI6IjIwMjAtMDctMjdUMDA6MjY6MTUuNzg5NTg0Mi0wNDowMCIsInN1YiI6ImNocmlzIn0.5US2_ITKcfgkpEbfsR-gxXbGPFY6XsgJPcGA5qaBD1M"
	}
}
```
**Note**: If you log in again (while you're already logged in), any previous **access & refresh tokens** will be revoked. <br></br>

**Note**: The access token will be returned in `data.token`. The refresh token will be returned as an HTTPOnly, Secure, SameSite Cookie.
#### Failure
```json
{
	"code": -1,
	"message": "username or password is incorrect",
	"data": {}
}
```
```json
{
	"code": -1,
	"message": "sorry, your account has not been approved yet",
	"data": {}
}
```

