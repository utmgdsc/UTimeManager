---
title: Signup
---

export const Endpoint = ({children, color}) => ( <span style={{
borderRadius: '2px',
color: '#E83E8C',
}}>{children}</span> );

<Endpoint>POST /users</Endpoint>: Signs up the user provided a unique username, email and password

```json
{
    "username": string,
    "password": string,
    "email": string
}
```

### Example Request

#### Body

```json
{
  "email": "john@example.com",
  "password": "12345"
}
```

### Parameters

---

**name** (Required, Unique)

Usernames must start with a letter and can only contain the following characters: a-zA-Z0-9\_ and must be 50 characters or less <br></br>

**Note**: If the username is valid, it will be lowercased

Min: 2 characters <br></br>
Max: 15 characters

---

**email** (Required, Unique)

Emails must be valid (i.e. Must include @ and a valid TLD)

---

**password** (Required)

Min: 3 characters <br></br>
Max: 45 characters (**See note below**)

**Note**: Since bcrypt is used to hash the passwords, there is a 50 character string length limitation.

---

### Possible Responses

#### Immediate Success

```json
{
  "_id": "6233edc698a43c3db89c4936",
  "email": "john@example.com"
}
```

#### Failure

```json
{
  "message": "User already exists",
  "stack": "Error: User already exists"
}
```

```json
{
  "message": "User validation failed: email: Path `email` is required.",
  "stack": "ValidationError: User validation failed: email: Path `email` is required.\n"
}
```
