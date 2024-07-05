import { MongoClient } from 'mongodb';
const uri = 'mongodb://localhost:27017/quiz-app';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
