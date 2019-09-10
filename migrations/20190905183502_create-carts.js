exports.up = function(knex) {
  return knex.schema.createTable("carts", table => {
    table.increments(); // id SERIAL PRIMARY KEY
    table.integer("user_id").references("users.id");
    table.integer("product_id").references("products.id");
    table.timestamps(true, true);
    // created_at timestamp with time zone NOT NULL default now()
    // updated_at timestamp with time zone NULL default now()
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("carts");
};
