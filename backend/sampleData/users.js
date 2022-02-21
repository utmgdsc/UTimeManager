const bcrypt = require("bcrypt");

const users = [
  {
    name: "Nestor",
    email: "nestor@mail.utoronto.ca",
    password: bcrypt.hashSync("abcd", 10),
  },
  {
    name: "Vallens",
    email: "vallens@mail.utoroto.ca",
    password: bcrypt.hashSync("abcde", 10),
  },
  {
    name: "Giovanni",
    email: "giovanni@mail.utoronto.ca",
    password: bcrypt.hashSync("abcdef", 10),
  },
];

module.exports = users;
