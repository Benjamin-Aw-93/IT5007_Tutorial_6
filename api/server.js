const fs = require('fs');
const express = require('express');
const { ApolloServer , UserInputError } = require('apollo-server-express');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost/custtracker';

let db;

let aboutMessage = "Customer Tracker API v1.0";

const GraphQLDate = new GraphQLScalarType({
  name: 'GraphQLDate',
  description: "A Date() type in GraphQL as scalar",
  serialize(value){
    return value.toISOString();
  },
  parseValue(value) {
    const dateValue = new Date(value);
    return isNaN(dateValue) ? undefined : dateValue;
  },
  parseLiteral(ast) {
    if (ast.kind == Kind.STRING) {
      const value = new Date(ast.value);
      return isNaN(value) ? undefined : value;
    }
  },  
});

const resolvers = {
  Query:{
    about: () => aboutMessage,
    custList,
  },
  Mutation:{
    setAboutMessage,
    custAdd,
    custDel,
  },
  GraphQLDate,
};

function create_UUID(){
  var dt = new Date().getTime();
  var uuid = 'xxxx-xxxx'.replace(/[xy]/g, function(c) {
      var r = (dt + Math.random()*16)%16 | 0;
      dt = Math.floor(dt/16);
      return (c=='x' ? r :(r&0x3|0x8)).toString(16);
  });
  return uuid;
}

function test_phonenumber(inputtxt){
  const phoneno = /^[6,8-9]\d{7}$/;

  return inputtxt.match(phoneno)? true : false ;
}

function setAboutMessage(_, {message}){
  return aboutMessage = message;
}

async function custList(){
  const customers = await db.collection('customers').find({}).toArray();
  return customers;
}

async function getNextSequence(name) {
  const result = await db.collection('counters').findOneAndUpdate(
    { _id: name },
    { $inc: { current: 1 } },
    { returnOriginal: false },
  );
  return result.value.current;
}

function custValidate(cust) {
  const errors = [];
  const phoneno = /^[6,8-9]\d{7}$/
  
  if (cust.name.length <= 0) {
    errors.push('Field "Name" must be at least 1 characters long.');
  }
  if (cust.number.length <= 0  || !test_phonenumber(cust.number)) {
    errors.push('Field "Number" is required and valid"');
  }
  if (errors.length > 0) {
    throw new UserInputError('Invalid input(s)', { errors });
  }
}

async function custAdd(_, {cust}){
  custValidate(cust);
  cust.created = new Date();
  cust.id = create_UUID();

  const result = await db.collection('customers').insertOne(cust);

  const savedCustomer= await db.collection('customers').findOne({ _id: result.insertedId });

  return savedCustomer;
}

async function custDel(_, {id}){

  const savedCustomer= await db.collection('customers').findOne({ id: id });

  await db.collection('customers').deleteOne({id: id});

  return savedCustomer;
}

async function connectToDb() {
  const client = new MongoClient(url, { useNewUrlParser: true });
  await client.connect();
  console.log('Connected to MongoDB at', url);
  db = client.db();
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync('schema.graphql', 'utf-8'),
  resolvers,
  formatError: error => {
    console.log(error);
    return error;
  },
});

const app = express();

server.applyMiddleware({ app, path: '/graphql' });


(async function () {
  try {
    await connectToDb();
    app.listen(5000, function () {
      console.log('API server started on port 5000');
    });
  } catch (err) {
    console.log('ERROR:', err);
  }
})();