const express = require("express");
const app = express(); //Varaible store
app.use(express.json());
const { MongoClient, ObjectId } = require("mongodb");
const URL = "mongodb://localhost:27017";

const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.post("/users", async (req, res) => {
  try {
    const connection = await MongoClient.connect(URL); //1.Connect
    const db = connection.db("demo"); //database("name")     //2. Data Insert
    await db.collection("user").insertOne(req.body); //collection("name")
    await connection.close(); //3. Connect.close
    res.json({ message: "User Created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.get("/users", async (req, res) => {
  try {
    const connection = await MongoClient.connect(URL);
    const db = connection.db("demo");
    const store = await db.collection("user").find().toArray();
    await connection.close();
    res.json(store);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const connection = await MongoClient.connect(URL);
    const db = connection.db("demo");
    const objID = new ObjectId(req.params.id);
    const user = await db.collection("user").findOne({ _id: objID });
    res.json(user);
    await connection.close();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something Went Wrong" });
  }
});

app.put("/users/:id", async (req, res) => {
  try {
    const connection = await MongoClient.connect(URL);
    const db = connection.db("demo");
    const objID = new ObjectId(req.params.id);
    await db
      .collection("user")
      .findOneAndUpdate({ _id: objID }, { $set: req.body });
    await connection.close();
    res.json({ message: "User Updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Soemthing went wrong" });
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const connection = await MongoClient.connect(URL);
    const db = connection.db("demo");
    const objID = new ObjectId(req.params.id);
    await db.collection("user").deleteOne({ _id: objID });
    await connection.close();
    res.json({ message: "User Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something Went wrong" });
  }
});


app.listen(3004); //POrt Run
