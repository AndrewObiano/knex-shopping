exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        { email: "Aobiano", password: "what" },
        { email: "Lnozaki", password: "what" },
        { email: "Cmoon", password: "what" }
      ]);
    });
};
