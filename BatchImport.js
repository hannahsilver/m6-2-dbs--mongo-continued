const { MongoClient } = require("mongodb");
const assert = require("assert");

require("dotenv").config();
const { MONGO_URI } = process.env;

// console.log(MONGO_URI);

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const seats = [];
const row = ["A", "B", "C", "D", "E", "F", "G", "H"];
for (let r = 0; r < row.length; r++) {
  for (let s = 1; s < 13; s++) {
    seats.push({
      _id: `${row[r]}-${s}`,
      price: 225,
      isBooked: false,
    });
  }
}

const batchImport = async () => {
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();

    const db = client.db("exercise_1");
    console.log(seats);
    const r = await db.collection("seats").insertMany(seats);
    console.log(r);
    assert.equal(seats.length, r.insertedCount);

    console.log("success");
  } catch (err) {
    console.log(err.message);
  }

  client.close();
};

batchImport();
