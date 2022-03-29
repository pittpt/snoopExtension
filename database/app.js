const MongoClient = require("mongodb").MongoClient;
const mongo = require("./mongo");

const email = "pitt.bcc@gmail.com";
const address = "0x0a99E21897Cc671a57C7e4184a9818B9B59F0B9F oo";

async function main() {
  const url =
    "mongodb+srv://snoop:snoopdatabase@cluster0.kmktr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  const client = new MongoClient(url);

  try {
    await client.connect();

    // await mongo.addUser(client, "ggg");
    // await mongo.follow(client, email, address);
    // await mongo.unfollow(client, email, address);
    await mongo.allArtists(client, address);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);
