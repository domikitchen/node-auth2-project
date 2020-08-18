
exports.up = function(knex) {
  return knex.schema
    .createTable('users', tbl => {
        tbl.increments('userId');
        tbl.string('username', 200).notNullable().unique();
        tbl.string('password', 200).notNullable();
        tbl.integer('accountType').notNullable();
    })
    .createTable('accountTypes', tbl => {
        tbl.increments('typeId');
        tbl.string('name', 100).notNullable().unique();
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('users')
    .dropTableIfExists('accountTypes');
};
