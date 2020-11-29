# devForum
This repository contains all the packages that make up a developer forum to work.

- *USER* This service holds the changes that can create a user.
- *QUESTION* This service holds the changes for creating a question, comment on it, vote on it, list all the available questions, search for a question
- *ANSWER* This service holds the changes for answering a question, comment on it, vote on it, list all the available answers for the question and the owner can select the correct answer.

Working on this code base:
To see the api's with its default input type [import](https://www.getpostman.com/collections/b867915168212bed9c34) this postman Collection.

*Note: To run this project locally
```
yarn
yarn start
```

You can see the urls to api's will be listed in the console like this

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
