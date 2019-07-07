# Woolies X API coding exercise

### Base URL 
https://wooliesx.herokuapp.com/api/answers

### Framework

- Node 10.x
- JavaScript ES6 language features
- Express 4.x

### Plugins

- Babel 7.x

### Code quality control

- eslint
- prettier
- unit tests

### Installation

```
git clone git@github.com:ChristianRich/wooliesx.git
cd ./wooliesx
yarn build
yarn start
```

# Tests

```
yarn test
```

# Exercise URLs

### Exercise 1
https://wooliesx.herokuapp.com/api/answers/user  

Passed test, request

```shell
curl -X POST \
  http://dev-wooliesx-recruitment.azurewebsites.net/api/Exercise/exercise1 \
  -H 'Accept: application/json' \
  -H 'Cache-Control: no-cache' \
  -H 'Connection: keep-alive' \
  -H 'Content-Type: application/json' \
  -H 'Host: dev-wooliesx-recruitment.azurewebsites.net' \
  -H 'accept-encoding: ' \
  -H 'cache-control: no-cache' \
  -H 'content-length: 108' \
  -d '{
  "token": "e902399f-ae3a-4a9e-b066-61b3c7fd9aa0",
  "url": "https://wooliesx.herokuapp.com/api/answers"
}'
```

Response  

```json
[
    {
        "passed": true,
        "url": "https://wooliesx.herokuapp.com/api/answers/user",
        "message": "Name returned correctly: Christian Rich."
    }
]
```
### Exercise 2  

https://wooliesx.herokuapp.com/api/answers/sort?sortOption=low  
https://wooliesx.herokuapp.com/api/answers/sort?sortOption=high  
https://wooliesx.herokuapp.com/api/answers/sort?sortOption=ascending  
https://wooliesx.herokuapp.com/api/answers/sort?sortOption=descending  
https://wooliesx.herokuapp.com/api/answers/sort?sortOption=recommended  



Passed test, request  

```shell
curl -X POST \
  http://dev-wooliesx-recruitment.azurewebsites.net/api/Exercise/exercise2 \
  -H 'Accept: */*' \
  -H 'Cache-Control: no-cache' \
  -H 'Connection: keep-alive' \
  -H 'Content-Type: application/json' \
  -H 'Host: dev-wooliesx-recruitment.azurewebsites.net' \
  -H 'cache-control: no-cache' \
  -H 'content-length: 110' \
  -d '{  
   "token":"e902399f-ae3a-4a9e-b066-61b3c7fd9aa0",
   "url":"https://wooliesx.herokuapp.com/api/answers"
}'
```

Response  
```json
[
    {
        "passed": true,
        "url": "https://wooliesx.herokuapp.com/api/answers/sort",
        "message": "Ascending Sort Passed"
    },
    {
        "passed": true,
        "url": "https://wooliesx.herokuapp.com/api/answers/sort",
        "message": "Descending Sort Passed"
    },
    {
        "passed": true,
        "url": "https://wooliesx.herokuapp.com/api/answers/sort",
        "message": "High Sort Passed"
    },
    {
        "passed": true,
        "url": "https://wooliesx.herokuapp.com/api/answers/sort",
        "message": "Low Sort Passed"
    },
    {
        "passed": true,
        "url": "https://wooliesx.herokuapp.com/api/answers/sort",
        "message": "Recommended Sort Passed"
    }
]
```

