const publicMovies = [{
  name: '1917',
  rating: 'R',
  synopsis: 'During World War I, two British soldiers -- Lance Cpl. Schofield and Lance Cpl. Blake -- receive seemingly impossible orders. In a race against time, they must cross over into enemy territory to deliver a message that could potentially save 1,600 of their fellow comrades -- including Blake\'s own brother.',
  genre: 'Drama',
  release_date: '2020-01-10',
}, {
  name: 'Soul',
  rating: 'PG',
  synopsis: 'Joe is a middle-school band teacher whose life hasn\'t quite gone the way he expected. His true passion is jazz -- and he\'s good. But when he travels to another realm to help someone find their passion, he soon discovers what it means to have soul.',
  genre: 'Animation',
  release_date: '2020-12-25',
}, {
  name: 'Black Widow',
  rating: 'PG-13',
  synopsis: 'Natasha Romanoff, aka Black Widow, confronts the darker parts of her ledger when a dangerous conspiracy with ties to her past arises. Pursued by a force that will stop at nothing to bring her down, Natasha must deal with her history as a spy, and the broken relationships left in her wake long before she became an Avenger.',
  genre: 'Action',
  release_date: '2021-06-09',
}, {
  name: 'One Night In Miami',
  rating: 'R',
  synopsis: 'On one incredible night in 1964, four icons of sports, music, and activism gathered to celebrate one of the biggest upsets in boxing history. When underdog Cassius Clay, soon to be called Muhammad Ali, (Eli Goree), defeats heavy weight champion Sonny Liston at the Miami Convention Hall, Clay memorialized the event with three of his friends: Malcolm X (Kingsley Ben-Adir), Sam Cooke (Leslie Odom Jr.) and Jim Brown (Aldis Hodge).',
  genre: 'Drama',
  release_date: '2022-12-25',
}, {
  name: 'Portrait Of A Lady On Fire',
  rating: 'R',
  synopsis: 'In 1770 the young daughter of a French countess develops a mutual attraction to the female artist commissioned to paint her wedding portrait.',
  genre: 'Drama',
  release_date: '2019-12-06',
}, {
  name: 'Minari',
  rating: 'PG-13',
  synopsis: 'A tender and sweeping story about what roots us, Minari follows a Korean-American family that moves to a tiny Arkansas farm in search of their own American Dream. The family home changes completely with the arrival of their sly, foul-mouthed, but incredibly loving grandmother. Amidst the instability and challenges of this new life in the rugged Ozarks, Minari shows the undeniable resilience of family and what really makes a home.',
  genre: 'Drama',
  release_date: '2021-02-12',
}, {
  name: '2001: A Space Odyssey',
  rating: 'G',
  synopsis: 'An imposing black structure provides a connection between the past and the future in this enigmatic adaptation of a short story by revered sci-fi author Arthur C. Clarke. When Dr. Dave Bowman (Keir Dullea) and other astronauts are sent on a mysterious mission, their ship\'s computer system, HAL, begins to display increasingly strange behavior, leading up to a tense showdown between man and machine that results in a mind-bending trek through space and time.',
  genre: 'Sci-fi',
  release_date: '2007-10-23',
}]

exports.up = function(knex) {
  return knex.schema.createTable('users', function (table) {
    table.increments('id')
    table.string('email', 255).notNullable()
    table.string('password', 255).notNullable()
  }).createTable('tokens', function (table) {
    table.string('token', 255).notNullable()
    table.integer('user', 8).notNullable()
  }).createTable('movies', function (table) {
    table.increments('id')
    table.string('name', 255).notNullable()
    table.string('rating', 10).notNullable()
    table.string('synopsis', 500).nullable()
    table.string('genre', 20).notNullable()
    table.date('release_date', 255).nullable()
    table.integer('user', 8).unsigned().nullable()
  }).createTable('likes', function(table) {
    table.increments('id')
    table.integer('user', 8).notNullable()
    table.integer('movie', 8).notNullable()
  }).then(function () {
    return knex.insert(publicMovies).into('movies')
  })
}

exports.down = function(knex) {
  knex.schema
    .dropTable('users')
    .dropTable('movies')
}
