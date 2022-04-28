---
title: Logout
---

export const Endpoint = ({children, color}) => ( <span style={{
borderRadius: '2px',
color: '#E83E8C',
}}>{children}</span> );

<Endpoint>POST /logout</Endpoint>: Logout the user <br></br>

```json
{}
```

### Example Request

#### Body

```json
{}
```

### Possible Responses

#### Immediate Success

```json
{
  "message": "Success"
}
```

#### Failure

```json
{
  "message": "Not authorized, token failed"
}
```