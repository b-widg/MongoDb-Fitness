require('dotenv').config();
const { MongoClient } = require('mongodb');

const workout = {
  userName,
  date,
  time,
  weight,
  airSquats,
  doubleKettlebellSquatThrusters: { kettleBellWeignt, reps },
  doubleKettlebellStrictPress: { kettleBellWeignt, reps },
  doubleKettlebellDeadlift: { kettleBellWeignt, reps },
  pushUps,
};

const submitWorkout = async () => {
  const mongoCollection = process.env.MONGO_COLLECTION;
  const database = process.env.MONGO_DATABASE;
  const uri = process.env.MONGO_URI;

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    // preform database work here
    const result = await client
      .db(database)
      .collection(mongoCollection)
      .insertOne(workout);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
};

submitWorkout();
