List.destroy_all
Task.destroy_all

List.create([
  {name: "Grocery List", priority: "Low"},
  {name: "Coding Languages to Learn", priority: "High"},
  {name: "Pokemons to Catch", priority: "Very High"},
  {name: "Instruments to Learn", priority: "Medium"},
  {name: "Books to Read", priority: "Medium"}
])
5.times do
  Task.create(name: Faker::Food.ingredient, done: [true, false].sample, list: List.first)
end
5.times do
  Task.create(name: Faker::ProgrammingLanguage.name, done: [true, false].sample, list: List.second)
end
5.times do
  Task.create(name: Faker::Pokemon.name, done: [true, false].sample, list: List.third)
end
5.times do
  Task.create(name: Faker::Music.instrument, done: [true, false].sample, list: List.fourth)
end
5.times do
  Task.create(name: Faker::Book.title, done: [true, false].sample, list: List.fifth)
end
