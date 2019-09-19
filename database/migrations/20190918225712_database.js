exports.up = function(knex) {
    return knex.schema.createTable('users', users => {
      users.increments();
      users.string('firstname', 128).notNullable();
      users.string('lastname', 128).notNullable();
      users.string('email', 128).notNullable().unique();
      users
        .string('username', 128)
        .notNullable()
        .unique();
      users.string('password', 128).notNullable();
    })

    .createTable('jokes', jokes => {
        jokes.increments();
        jokes.string('setup', 2000).notNullable();
        jokes.string('punchline', 2000).notNullable();
        jokes.string('category', 2000);
        jokes.boolean('public').notNullable().defaultTo(true);
        jokes
            .integer('userId')
            .unsigned()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        jokes
            .string('author')
            .references('username')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    });
    
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema
        .dropTableIfExists('users')
        .dropTableIfExists('jokes');
  };
