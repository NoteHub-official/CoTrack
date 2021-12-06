# CoTrack

Team collaborative evaluation tracker.



# API Reference

### Authentication

#### Authorization Header

```json
{
  "Authorization": "JWT <access_token>"
}
```

##### 1. Login

* **URL:** `auth/jwt/create/`

* **HTTP**: **POST**
* **Login Required:** ***False***

Request Format:

```json
{
    "username": "test",
    "password": "123456"
}
```

Response Format (use ***Access token***):

```json
{
    "refresh": "...J0eXAiOiJKV1QiL...",
    "access": "...J0eXAiOiJKV1QiL..."
}
```

##### 1. Update User Information

* **URL:** `auth/users/me/`

* **HTTP**: **PATCH**
* **Login Required:** ***True***

Request Format:

```json
{
    "first_name": "Brian", // Optional
    "last_name": "Yin"     // Optional
}
```



### Evaluation

##### 1. Assign a new evaluation for user (Do not use this unless unexpected things happen!)

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
    "created_at": "2021-12-04",
    "completed": false,
    "task_list": {
      "id": 1,
      "week": 1,
      "created_at": "2021-12-04",
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

* **URL:** `api/assigned_evals/<evaluation_pk>/`

* **HTTP**: **PATCH**
* **Login Required:** ***True***

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
    "created_at": "2021-12-04",
    "evaluations": [
      {
        "content": "AAAAA",
        "rating": 0,
        "completed": false,
        "evaluator": 4,
        "created_at": "2021-12-04"
      },
      {
        "content": "BBBBBB",
        "rating": 0,
        "completed": false,
        "evaluator": 4,
        "created_at": "2021-12-04"
      },
      {
        "content": "CCCCCC",
        "rating": 0,
        "completed": false,
        "evaluator": 4,
        "created_at": "2021-12-04"
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
* **Login Required:** ***True***

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
* **Login Required:** ***True***

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



### Week

##### Modify an existing Task Item

* **URL:** `api/current_week/`

* **HTTP**: **GET**
* **Login Required:** ***True***

Response Format:

```json
{
  "week": 1
}
```





