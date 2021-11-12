Tutorial 6 Submission

Done by: Benjamin Aw A0124029N

Instructions to set up environement (similar to tutorial 5):

Assumption: npm, git and mogo are set up in environment already.

- Expose both port 5000 and 3000 for API and UI server respectively
- Pull the files into the home directory

- Start up mogodb in API folder
  - Using command: `screen mongod`
  - Initialise first 3 entries in database: `mongo custtracker scripts/init.mongo.js`

- Start API
  - cd to API folder
  - Run `npm install`
  - `npm start` to load at localhost:5000

- Start UI
  - Open an new terminal
  - cd to UI folder
  - Run `npm install`
  - `npm start` to load at localhost:3000

- Start react native
  - Open up android studio and start up Android Virtual Device
  - Using command line, naviage to Android App folder 
  - Run `npm install`
  - Open App.js file, change `const client = new ApolloClient({uri: 'http://OWN-IP-ADDRESS/graphql'});`
  - `npm run android` to start android app
