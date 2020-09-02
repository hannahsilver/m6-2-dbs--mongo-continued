"use strict";
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getSeats = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();

    const db = client.db("exercise_1");

    const seats = await db.collection("seats").find().toArray();

    console.log(seats);

    res.status(200).json({ status: 200, data: seats });
  } catch (err) {
    res.status(400).json({ status: 404, data: "Seats Not Found" });
  }
  client.close();
};

const updateSeats = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  try {
    const { seatId, fullName, email } = req.body;
    const newValues = { $set: { fullName, email, isBooked: true } };

    const query = { _id: seatId };
    await client.connect();
    const db = client.db("exercise_1");
    const r = await db
      .collection("greetings")
      .updateOne(query, { ...newValues });

    if (r.modifiedCount === 0) {
      res.status(200).json({ message: "Seat Unavailable" });
    } else {
      res.status(200).json({ message: "Seat Booked" });
    }
  } catch (err) {
    res.status(400).json(err.message);
  }
  client.close();
};

module.exports = { getSeats, updateSeats };
