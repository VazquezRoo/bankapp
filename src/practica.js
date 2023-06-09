const day = new Date();

console.log(
  day.getMonth().toString() +
    day.getDate() +
    day.getFullYear() +
    day.getHours() +
    day.getMinutes() +
    day.getSeconds() +
    Math.ceil(Math.random() * (998 - 2) + 2)
);
