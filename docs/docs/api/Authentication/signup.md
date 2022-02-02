---
title: Signup
---

export const Endpoint = ({children, color}) => ( <span style={{
borderRadius: '2px',
color: '#E83E8C',
}}>{children}</span> );

<Endpoint>POST /signup</Endpoint>: Signs up the user provided a unique username, email and password

```json
{
    "Username": string,
    "Password": string,
    "Email": string
}
```
### Example Request
#### Body
```json
{
    "Username": "Chris",
    "Email": "hello@2ofClubs.app",
    "Password": "password"
}
```
### Parameters
---
**Username** (Required, Unique)

Usernames must start with a letter and can only contain the following characters: a-zA-Z0-9_ and must be 50 characters or less <br></br>

**Note**: If the username is valid, it will be lowercased

Min: 2 characters <br></br>
Max: 15 characters

---
**Email** (Required, Unique)

Emails must be valid (i.e. Must include @ and a valid TLD)

---
**Password** (Required)

Min: 3 characters <br></br>
Max: 45 characters (**See note below**)

**Note**: Since bcrypt is used to hash the passwords, there is a 50 character string length limitation.

---
### Possible Responses
#### Immediate Success
```json
{
	"code": 1,
	"message": "signup successful",
	"data": {}
}
```
#### Failure
```json
{
	"code": -1,
	"message": "unable to sign up user",
	"data": {
		"username": "username already exists",
		"email": "email already exists",
		"password": ""
	}
}
```
```json
{
	"code": -1,
	"message": "unable to sign up user",
	"data": {
		"username": "username must start with a letter and can only contain the following characters: a-zA-Z0-9_ and must be 50 characters or less",
		"email": "must be a valid email",
		"password": "a password is required"
	}
}
```



