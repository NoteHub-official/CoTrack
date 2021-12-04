# CoTrack

Team collaborative evaluation tracker.



# API Reference

### Evaluation

##### 1. Assign a new evaluation for user

* **URL:** `api/assigned_evals/`

* **HTTP**: **POST**
* **Login Required:** ***True***

Request Format:

```json
{
    "week": 1,
    "content": "Hi there!",
    "evaluated_user": 3
}
```

Response Format:

```json
{
    "week": 1,
    "content": "Hi there!",
    "evaluated_user": 3,
    "completed": false
}
```



##### 2. Get assigned evaluations for a user by week

* **URL:** `api/assigned_evals/?week=<int:week>`

* **HTTP**: **GET**
* **Login Required:** ***True***

Response Format:

```json
[
  {
    "id": 9,
    "week": 1,
    "content": "sadasdasd",
    "rating": 0,
    "evaluated_user": {
      "id": 3,
      "username": "BBB",
      "email": ""
    },
    "created_at": "2021-12-04T06:05:27.433740Z",
    "completed": false,
    "task_list": {
      "id": 1,
      "week": 1,
      "created_at": "2021-12-04T06:05:27.416548Z",
      "tasks": [
        {
          "id": 1,
          "content": "First task Item"
        },
        {
          "id": 2,
          "content": "Second task Item"
        }
      ]
    }
  },
  ...
]
```



##### 3. Edit evaluation content & rating

* **URL:** `api/received_evals/<evaluation_pk>/?week=<int:week>/`

* **HTTP**: **PATCH**
* **Login Required:** ***False***

Request Format:

```json
{
    "content": "Updated Content", // Optional
    "rating": 9 									// Optional
}
```

Response Format:

```json
{
    "content": "Updated Content",
    "rating": 9,
  	"completed": true
}
```



##### 4. Get all received evaluations 

* **URL:** `api/received_evals/`

* **HTTP**: **GET**
* **Login Required:** ***True***

Response Format (**GROUP BY task_list ORDER BY week DESC**):

```json
[
  {
    "id": 16,
    "week": 3,
    "created_at": "2021-12-04T21:35:54.266330Z",
    "evaluations": [
      {
        "content": "AAAAA",
        "rating": 0,
        "completed": false,
        "evaluator": 4,
        "created_at": "2021-12-04T21:35:54.277250Z"
      },
      {
        "content": "BBBBBB",
        "rating": 0,
        "completed": false,
        "evaluator": 4,
        "created_at": "2021-12-04T21:35:57.974349Z"
      },
      {
        "content": "CCCCCC",
        "rating": 0,
        "completed": false,
        "evaluator": 4,
        "created_at": "2021-12-04T21:36:00.749694Z"
      }
    ],
    "tasks": [
      {
        "id": 8,
        "content": "New Item 1",
        "completed": false
      },
      {
        "id": 9,
        "content": "New Item 2",
        "completed": false
      },
      {
        "id": 10,
        "content": "New Item 3",
        "completed": false
      }
    ]
  },
  ...
]
```



---

### TaskItem

##### 1. Add a new Task Item to a task list

* **URL:** `api/task_items/`

* **HTTP**: **POST**
* **Login Required:** ***False***

Request Format:

```json
{
    "task_list": 1,
    "content": "Hello there!"
}
```

Reponse Format:

```json
{
    "task_list": 1,
    "content": "Hello there!"
}
```



##### 2. Modify an existing Task Item

* **URL:** `api/task_items/<task_item_pk>/`

* **HTTP**: **PATCH**
* **Login Required:** ***False***

Request Format:

```json
{
    "content": "Modified task Item",  // Optional
    "completed": false								// Optional
}
```

Response Format:

```json
{
    "id": 1,
    "content": "Modified task Item",
  	"completed": false	
}
```

