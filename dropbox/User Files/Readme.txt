In order to start KAFKA follow the following steps:
1. Run zookeeper using the command: zkserver.cmd
2. once zookeeper server is up, start the KAFKA by typing ".\bin\windows\kafka-server-start.bat .\config\server.properties" in command window.
3. Now create the topics which will be used for passing messages to and from client. Use the script file available in this folder to create the KAFKA topics.
4. Once it is done, now node applications can be run.

Start the mongoDB server by typing mongod in command window.

First start the kafka-back-end server, it will be communicating with KAFKA
Steps to start server
1. npm install
2. npm start

Next start node/express server:
Steps to start node server
1. npm install
2. nodemon App.js

Next start react application:
1. Steps to run frontend :
1. npm install
2. npm start

