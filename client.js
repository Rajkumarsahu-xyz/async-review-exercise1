const fetch = require("node-fetch");

async function getTodosPer5UsersConcurrently(data1, arrOfIds) {
  let startuser = 0,
    chunks = 5,
    enduser = data1.users.length;
  let fiveUserPerChunk = [];
  let fiveTodos;
  while (startuser < enduser) {
    const chunkend = startuser + chunks;
    while (startuser < chunkend) {
      let promise = fetch(
        `http://localhost:3000/todos?user_id=${arrOfIds[startuser]}`
      )
        .then((res) => res.json())
        .then((data) => data.todos);

      fiveUserPerChunk.push(promise);
      startuser++;
    }

    fiveTodos = await Promise.all(fiveUserPerChunk);
    console.log(fiveTodos);

    if (startuser <= enduser) {
      await new Promise((res, rej) => setTimeout(res, 1000));
    }
  }

  return fiveTodos;
}

async function getUserAndTheirCompletedTodosCount(allChunksOf5Todos, data1) {
  let completedTodosCount = [];
  for (let i = 0; i < allChunksOf5Todos.length; i++) {
    let ctr = 0;
    for (let j = 0; j < allChunksOf5Todos[i].length; j++) {
      ctr = allChunksOf5Todos[i][j].isCompleted === true ? ctr + 1 : ctr;
    }
    completedTodosCount.push(ctr);
  }

  UserAndCompletedTodos = [];
  for (let i = 0; i < data1.users.length; i++) {
    UserAndCompletedTodos.push({
      id: i + 1,
      name: `User ${i + 1}`,
      numTodosCompleted: completedTodosCount[i],
    });
  }

  console.log(UserAndCompletedTodos);
}

async function main() {
  const res1 = await fetch(`http://localhost:3000/users`);
  const data1 = await res1.json();
  console.log(data1);
  
  const arrOfIds = data1.users.map((user) => user.id);

  const allChunksOf5Todos = await getTodosPer5UsersConcurrently(
    data1,
    arrOfIds
  );

  await getUserAndTheirCompletedTodosCount(allChunksOf5Todos, data1);
}

main();
