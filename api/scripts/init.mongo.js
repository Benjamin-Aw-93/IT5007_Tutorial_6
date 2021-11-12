// Initialising database call: scripts/init.mongo.js.

db.customers.remove({});

const custDB = [
    {
      id: 'xxxx-xxxa', name: 'John Smith', number: '97487391',
      created: new Date('2018-08-15'), 
    },
    {
      id: 'xxxx-xxxb', name: 'Mary Sue', number: '97487392',
      created: new Date('2018-08-15'),
    },
    {
      id: 'xxxx-xxxc', name: 'Test Test', number: '97487393',
      created: new Date('2018-08-15'), 
    },
  ];


db.customers.insertMany(custDB);

const count = db.customers.count();

print('Inserted', count, 'customers');

db.customers.createIndex({ id: 1 }, { unique: true });
db.customers.createIndex({ name: 1 });
db.customers.createIndex({ number: 1 }, { unique: true });