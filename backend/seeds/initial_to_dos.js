/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('to_dos_table').del()
  await knex('to_dos_table').insert([
    {id: 1, toDo: 'Wash laundry'},
    {id: 2, toDo: 'Vacuum room'},
    {id: 3, toDo: 'Wash dishes'}
  ]);
};
