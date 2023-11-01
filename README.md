# Async Exercise

## Instructions to setup the project

1. Clone the project

```sh
git clone https://github.com/pixyj/mb-async-live-review-1 async_live_review
```

2. cd to the `async_live_review` directory

```sh
cd async_live_review
```

3. Install dependencies

```sh
npm install
```

4. Start the server

```
node server.js
```

---

## In `client.js`, perform the below steps in the following order:

1. Fetch all the users by calling the `/users` API using `node-fetch`
2. Fetch todos for each user in chunks of 5 users by calling the `/todos` API, i.e,
   1. Fetch the todos for first 5 users concurrently.
   2. Once the todos for the first 5 users are fetched, wait for 1 second
   3. and then fetch the todos of the next 5 users concurrently
   4. wait for 1 more second and fetch the todos of the next 5 users concurrently and so on until todos for all users are fetched. We fetch the todos in chunks so as to not overload the server.
3. Once todos for all users are fetched, calculate how many todos are completed for each user and print the result in the following format:

```js
[
  {
    id: 1,
    name: "User 1",
    numTodosCompleted: 4,
  },
  {
    id: 2,
    name: "User 2",
    numTodosCompleted: 3,
  },
  {
    id: 3,
    name: "User 3",
    numTodosCompleted: 6,
  },
];
```

---

## Docs:

- node-fetch - https://www.npmjs.com/package/node-fetch
