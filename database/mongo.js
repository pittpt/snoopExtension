const MongoClient = require("mongodb").MongoClient;

//create new collection
async function addUser(client, userMail) {
  try {
    const result = await client.db("users").createCollection(userMail);
  } catch (e) {
    throw "Collection already exists";
  }
  console.log("success");
}

//Add id to user's collection
async function follow(client, user, adrs) {
  const search = await findAdrs(client, "users", user, adrs);
  if (search == null) {
    const result = await client
      .db("users")
      .collection(user)
      .insertOne({ artistAdrs: adrs });
    console.log("inserted with id:", result.insertedId);
  } else {
    console.error("already followed");
  }
}

//find that artist id in the user | null if not found and return the thing if found
async function findAdrs(client, db, collection, adrs) {
  const result = await client
    .db(db)
    .collection(collection)
    .findOne({ artistAdrs: adrs });
  return result;
}

//delete specified artist id
async function unfollow(client, user, adrs) {
  const result = await client
    .db("users")
    .collection(user)
    .deleteOne({ artistAdrs: adrs });
  console.log(result);
}

async function allArtists(client, adrs) {
  const search = await findAdrs(client, "artists", "all", adrs);
  if (search == null) {
    await client
      .db("artists")
      .collection("all")
      .insertOne({ artistAdrs: adrs });
    console.log("new artist!");
  } else {
    console.log("existed");
  }
}

module.exports = { follow, unfollow, addUser, allArtists };

// async function listDatabases(client) {
//   const databasesList = await client.db().admin().listDatabases();

//   console.log("Databases:");
//   databasesList.databases.forEach((db) => {
//     console.log("-", db.name);
//   });
// }

//REMOVING DUPLUCATES
//https://stackoverflow.com/questions/14184099/fastest-way-to-remove-duplicate-documents-in-mongodb
