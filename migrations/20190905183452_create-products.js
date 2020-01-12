exports.up = function(knex) {
  return knex.schema.createTable("products", table => {
    table.increments(); // id SERIAL PRIMARY KEY
    table.string("title").notNullable(); //username VARCHAR(255) NOT NULL
    table.text("description").notNullable(); //description TEXT NOT NULL
    table.integer("inventory"); //inventory INTEGER
    table.decimal("price").notNullable(); //price INTEGER NOT NULL
    table.timestamps(true, true);
    // created_at timestamp with time zone NOT NULL default now()
    // updated_at timestamp with time zone NULL default now()
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("products");
};
