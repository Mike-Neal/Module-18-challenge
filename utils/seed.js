const connection = require('../config/connection');
const { Homie, Networker } = require('../models');
const { getRandomName, getRandomIdeas } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
    
    let homieCheck = await connection.db.listCollections({ name: 'homies' }).toArray();
    if (homieCheck.length) {
      await connection.dropCollection('homies');
    }

    let networkersCheck = await connection.db.listCollections({ name: 'networkers' }).toArray();
    if (networkersCheck.length) {
      await connection.dropCollection('networkers');
    }

  const networkers = [];

  for (let i = 0; i < 20; i++) {
    const ideas = getRandomIdeas(20);

    const fullName = getRandomName();
    const first = fullName.split(' ')[0];
    const last = fullName.split(' ')[1];
    const email = `${first}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}`;

    networkers.push({
      first,
      last,
      email,
      ideas,
    });
  }

  
  await Networker.collection.insertMany(networkers);

  
  await Homie.collection.insertOne({
    homieName: 'Mike',
    networkers: [...networkers],
  });

  console.table(networkers);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
