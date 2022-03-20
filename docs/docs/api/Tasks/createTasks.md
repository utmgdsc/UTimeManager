---
title: Create Task
---

export const Endpoint = ({children, color}) => ( <span style={{
borderRadius: '2px',
color: '#E83E8C',
}}>{children}</span> );

<Endpoint>POST tasks/</Endpoint>: Create a task with provided task details <br></br>

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

### Example Request

#### Body

```json
{
  "title": "Task 2 - evvvve",
  "user_id": "62227aab7a9965d0be73b052",
  "description": "john",
  "startDate": "2022-02-25T15:02:08",
  "endDate": "2022-02-27T15:02:08",
  "isStarted": false
}
```

**Note**: Every attribute is required <br></br>

### Possible Responses

#### Immediate Success

```json
{
  "title": "Task 2 - evvvve",
  "user_id": "62227aab7a9965d0be73b052",
  "description": "john",
  "startDate": "2022-02-25T20:02:08.000Z",
  "endDate": "2022-02-27T20:02:08.000Z",
  "isStarted": false,
  "_id": "623688c4f5735bc51286682f",
  "createdAt": "2022-03-20T01:52:04.564Z",
  "updatedAt": "2022-03-20T01:52:04.564Z",
  "__v": 0
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
