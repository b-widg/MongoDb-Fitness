require('dotenv').config();
const { MongoClient } = require('mongodb');

// Recorded kettlenell weight is single kettlebell weight regardless
// of whether exercise is a single or double kettlebell exercise

const workout = {
  notes: '',
  userNam: '',
  date: '',
  time: '',
  weight: '',
  totalRepsForExercise: 0, // Don't enter manually
  // Squats
  airSquats: { totalReps: 0, maxContinuousReps: 0 },
  doubleKettlebellSquats: {
    kettleBellWeignt: 0,
    totalReps: 0,
    maxContinuousReps: 0,
  },
  doubleKettlebellSquatThrusters: {
    kettleBellWeignt: 0,
    totalReps: 0,
    maxContinuousReps: 0,
  },
  // Strict Presses
  doubleKettlebellStrictPress: {
    kettleBellWeignt: 0,
    totalReps: 0,
    maxContinuousReps: 0,
  },
  singleKettlebellStrictPress: {
    leftHand: {
      kettleBellWeignt: 0,
      totalReps: 0,
      maxContinuousReps: 0,
    },
    rightHand: {
      kettleBellWeignt: 0,
      totalReps: 0,
      maxContinuousReps: 0,
    },
    notes: '',
  },
  // Push Presses
  doubleKettlebellPushPress: {
    kettleBellWeignt: 0,
    totalReps: 0,
    maxContinuousReps: 0,
  },
  singleKettlebellPushPress: {
    leftHand: {
      kettleBellWeignt: 0,
      totalReps: 0,
      maxContinuousReps: 0,
    },
    rightHand: {
      kettleBellWeignt: 0,
      totalReps: 0,
      maxContinuousReps: 0,
    },
    notes: '',
  },

  // Swings
  russianKettkebellSwing: {
    kettleBellWeignt: 0,
    totalReps: 0,
    maxContinuousReps: 0,
  },
  // Deadlifts
  doubleKettlebellDeadlift: {
    kettleBellWeignt: 0,
    totalReps: 0,
    maxContinuousReps: 0,
  },
  pushUps: { totalReps: 0, maxContinuousReps: 0 },
  treadMill: { mins: 0, distanceMiles: 0 },
  // Jump Rope
  jumpRope: { totalReps: 0, maxContinuousReps: 0 },
  doubleUnders: { totalReps: 0, maxContinuousReps: 0 }, // someday...maybe...🤣
};

const [, , , , , , ...excercises] = Object.entries(workout);
const types = excercises
  .map((excercise) => {
    // look at fitst level to see if totalReps exists
    if (excercise[(1, 1)].totalReps) {
      return excercise[(1, 1)].totalReps;
      // if not drill down one more & return zero if still not found
    } else {
      return Object.values(excercise[1]).map((subExercise) => {
        return subExercise.totalReps ?? 0;
      });
    }
  })
  .flat();
workout.totalRepsForExercise = types.reduce((reps, type) => {
  return (reps += type);
}, 0);

console.log('totalRepsForExercise: ', workout.totalRepsForExercise);

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
    await client.close();
  } catch (err) {
    console.error(err);
  } finally {
  }
};

submitWorkout();
