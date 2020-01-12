exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("products")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("products").insert([
        {
          title: "Supreme Hoodie",
          description: "Something you should never buy!",
          inventory: 1,
          price: 999.99
        },
        {
          title: "Rolex Watch",
          description: "Automatic movement. Water-resistant up to 200m.",
          inventory: 3,
          price: 14000.99
        },
        {
          title: "Toilet Paper",
          description: "2-ply.",
          inventory: 234,
          price: 10.99
        }
      ]);
    });
};
