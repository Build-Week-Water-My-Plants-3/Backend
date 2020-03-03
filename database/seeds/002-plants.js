
exports.seed = function(knex) {
  return knex('plants').insert([
    {
      id: 1,
      species_name: "Hendra",
      nickname: "Ivy",
      h2o_amount: "1 Cup per Week",
      user_id: "1"
    },
    {
      id: 2,
      species_name: "Succlent",
      nickname: "Boo-Boo Plant",
      h2o_amount: "1 cup per month",
      user_id: "1"
    },
    {
      id: 3, 
      species_name: "Cactacea",
      nickname: "Spikey",
      h2o_amount: "1/2 cup per month",
      user_id: "2"
    },
    {
      id: 4, 
      species_name: "Catacea",
      nickname: "Pointy",
      h2o_amount: "1 cup per month",
      user_id: "3"
    },
    {
      id: 5, 
      species_name: "Orchidacea",
      nickname: "Jade",
      h2o_amount: "1/4 per month",
      user_id: "3"
    },
    // {
    //   id: ,    
    //   species_name: "",
    //   nickname: "",
    //   h2o_amount: "",
    //   user_id: ""
    // },
  ])
};
