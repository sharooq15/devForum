# devForum
This repository contains all the packages that make up a developer forum to work.

- *USER* This service holds the changes that can create a user.
- *QUESTION* This service holds the changes for creating a question, comment on it, vote on it, list all the available questions, search for a question
- *ANSWER* This service holds the changes for answering a question, comment on it, vote on it, list all the available answers for the question and the owner can select the correct answer.

Working on this code base:
To see the api's with its default input type [import](https://www.getpostman.com/collections/b867915168212bed9c34) this postman Collection or you can find it in project as apis.json.

*Note: To run this project locally
```
yarn
yarn start
```

You can see the urls to api's will be listed in the console like this

<img width="552" alt="Screenshot 2020-11-29 at 5 11 27 PM" src="https://user-images.githubusercontent.com/28434309/100541171-006c0980-3268-11eb-977a-f854dd083b18.png">


You can follow the url's in the terminal or replace the hostname in postman collection to localhost:3000

### TABLES CREATED
  * user
  * question
  * answer

### TECHNOLOGIES USED
  * TypeScript
  * Express.js
  * AWS Dynamodb

### UPDATE AWS CONFIG
const awsConfig = {
  "region": "",
  "endpoint": "",
  "accessKeyId": "",
  "secretAccessKey": ""
};
