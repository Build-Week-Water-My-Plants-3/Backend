const bcrypt = require('bcryptjs'); 

exports.seed = function(knex) {
  return knex('users').insert([
    {
      id: 1,
      username:"lauralyeinc",
      password: bcrypt.hashSync("purpleee", 10),
      phone_number: "1234567890"
    },
    {
      id: 2,
      username: "testingtest",
      password: bcrypt.hashSync("testingpassword", 10),
      phone_number: "0987654321"
    },
    {
      id: 3,
      username: "lauralye",
      password: bcrypt.hashSync("purple", 10),
      phone_number: "9876545432"
    },
    // {
    //   id:  ,  
    //   username: "",
    //   password: bcrypt.hashSync("", 10),
    //   phone_number: ""
    // }
  ])
};
