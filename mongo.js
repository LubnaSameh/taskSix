// MongoDB
// npm i mongodb

// sql: mySql => row , column => relational
// NoSql: MongoDB => key, value => non relational => data store on documents {},{}=> written by json but display in object
//document have a uniqe id

const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;

const connectionUrl = 'mongodb://127.0.0.1:27017';
const dbname = 'firstData';
console.log('Attempting to connect to MongoDB...');
mongoClient.connect(connectionUrl, (error, res1) => {
  if (error) {
    return console.log('Error has occurred');
  }
  console.log('Connected to MongoDB');

  const db = res1.db(dbname);
  ////////////

  db.collection('users').insertOne({
    name: 'lubna',
    age: 19

  }, (error, data) => {
    if (error) {
      console.log('Unable to insert data');
    }
    console.log('Data inserted');
    console.log(data.insertedId);

  });
  //////////
  db.collection('users').insertOne({
    name: 'sameh',
    age: 20
  }, (error, data) => {
    if (error) {
      console.log('Unable to insert data');
    } else {
      console.log('Data inserted2');
      console.log(data.insertedId);
    }
  });


  //////
  db.collection('users').insertMany(
    [


      {
        name: 'lubna',
        age: 17

      },
      {
        name: 'sameh',
        age: 17

      },
      {
        name: 'lilo',
        age: 17

      },
      {
        name: 'loly',
        age: 26

      },
      {
        name: 'lelo',
        age: 26

      },
      {
        name: 'noha',
        age: 27

      },
      {
        name: 'mohamed',
        age: 27

      },
      {
        name: 'omar',
        age: 27

      },
      {
        name: 'mohamed',
        age: 27

      },
      {
        name: 'ahmed',
        age: 27

      },

    ], (error, data) => {
      if (error) {
        console.log('Unable to insert data');
      }
      console.log('Data inserted');
      console.log(data.insertedCount);

    });



  /////////////
  // read with id
  // db.collection('users').findOne(
  //   { _id: mongodb.ObjectId("66b30321f4c44330b944f799") },
  //   (error, user) => {
  //     if (error) {
  //       return console.log('Unable to fetch data');
  //     }
  //     console.log(user);
  //   }
  // );

  /////

  // read all data
  // db.collection('users').find().toArray((error, data) => {
  //   if (error) {
  //     return console.log('Unable to fetch data');
  //   }
  //   console.log('Data fetched:');
  //   console.log(data);
  // });

  ///////



  db.collection('users').find({ age: 27 }).toArray((error, users) => {
    if (error) {
      return console.log('Unable to fetch data');
    }
    console.log('Users with age 27:');
    console.log(users);
  });


  /////

  // db.collection('users').countDocuments({}, (error, count) => {
  //   if (error) {
  //     return console.log('Unable to count documents');
  //   }
  //   console.log('Number of documents in the collection: ' + count);
  // });

  /////

  // awl 3 match condetion

  db.collection('users').find({ age: 27 }).limit(3).toArray((error, users) => {
    if (error) {
      return console.log('Unable to fetch data');
    }
    console.log('Users with age 27: with awl 3');
    console.log(users);
  });
  ////

  /// update operator
  // $set => edit
  //  $inc => add


  /// modifycount=> how many documents got a update

  // db.collection('users').updateOne(
  //   { _id: mongodb.ObjectId("66b30d551922ea86fabd1cda") }, // Filter condition
  //   {
  //     $inc: { age: 1 },   // Increment the age field by 1
  //     $set: { name: 'loly' } // Set the name field to 'Updated Name'
  //   })

  //   .then((result )=> {
  //     console.log(result.modifiedCount + ' document(s) modified');
  //   })
  //   .catch((error) => {
  //     console.log('Error occurred:', error);
  //   });

  ////////////

  // { } =>all documents

  db.collection('users').updateMany(
    { age: { $gte: 20 } }, // Filter condition: all users with age greater than or equal to 18 // or {} => all documents
    {
      $inc: { age: 30 }, // Increment the age field by 1
      $set: { status: 'Updated' } // Set the status field to 'Updated'
    }
  )
    .then(data => {
      console.log(data.modifiedCount + ' document(s) modified');
    })
    .catch(error => {
      console.log(error);
    });

  ///////////////


  db.collection('users').find({}).limit(4).toArray()
    .then(docs => {
      const ids = docs.map(doc => doc._id);
      return db.collection('users').updateMany(
        { _id: { $in: ids } },
        {
          $inc: { age: 4 }, // Increment the age field by 30
          $set: { status: 'Updated' } // Set the status field to 'Updated'
        }
      );
    })
    .then(data => {
      console.log(data.modifiedCount + ' document(s) modified');
    })
    .catch(error => {
      console.log(error);
    });

  /////////////
  // delete data

  db.collection('users').deleteMany({}, (error, result) => {
    if (error) {
      return console.log('Unable to delete data');
    }
    console.log('All data deleted');
    console.log(result.deletedCount + ' documents deleted');
  });

  //////////

  db.collection('users').deleteMany({ age: { $gt: 41 } })
    .then(result => {
      console.log(result.deletedCount + ' document(s) deleted');
    })
    .catch(error => {
      console.log('Error occurred while deleting documents:', error);
    });
  ///////////////////////
  // validation hard in mongoDb

});

//  node src/mongo.js
