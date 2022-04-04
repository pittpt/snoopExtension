const express = require("express");
const router = express.Router();
const Model = require("../models/model");
var MongoClient = require("mongodb").MongoClient;
require("dotenv").config();
var url = process.env.ATLAS_URI;
module.exports = router;

//for login
router.post("/newUser/:id", (req, res) => {
  MongoClient.connect(url, async (err, db) => {
    //add find,if found return error (do this if wanna return acc existed)
    if (err) return err;
    var dbo = db.db("users");

    dbo.createCollection(req.params.id, (err, res) => {
      if (err) return err;
      console.log("Created if does not already exist");
      db.close();
    });

    res.send("Created if does not already exist");
  });
});

router.post("/follow", (req, res) => {
  MongoClient.connect(url, async (err, db) => {
    var dbo = db.db("users");
    async function findAdrs(collection, adrs) {
      const result = await dbo
        .collection(collection)
        .findOne({ artistId: adrs });
      return result;
    }

    var collection = req.body.email;
    var adrs = req.body.adrs;

    const search = await findAdrs(collection, adrs);
    if (search == null) {
      const result = await dbo
        .collection(collection.toString())
        .insertOne({ artistId: adrs });
      console.log(result.insertedId);
      res.status(200).send("Inserted/Followed: " + result.insertedId);
    } else {
      res.send("already followed");
    }
  });
});

router.delete("/unfollow", (req, res) => {
  MongoClient.connect(url, async (err, db) => {
    var dbo = db.db("users");

    var collection = req.body.email;
    var adrs = req.body.adrs;

    const result = await dbo
      .collection(collection)
      .deleteOne({ artistId: adrs });
    var deleted = result.deletedCount;
    if (deleted == 1) res.send("deleted");
    else res.send("not deleted");
  });
});

router.get("/getFollows/:id", async (req, res) => {
  const user = req.params.id;

  MongoClient.connect(url, async (err, db) => {
    //add find,if found return error (do this if wanna return acc existed)
    if (err) throw err;
    var dbo = db.db("users");

    const result = await dbo.collection(user).find().toArray();
    console.log(result);
    res.send(result);
  });
});

//
//
//
//
//

//Post Method
router.post("/post", async (req, res) => {
  const data = new Model({
    name: req.body.name,
    age: req.body.age,
  });
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Get all Method
router.get("/getAll", async (req, res) => {
  try {
    const data = await Model.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get by ID Method
router.get("/getOne/:id", async (req, res) => {
  try {
    const data = await Model.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update by ID Method
router.patch("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Model.findByIdAndUpdate(id, updatedData, options);

    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete by ID Method
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Model.findByIdAndDelete(id);
    res.send(`Document with ${data.name} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
