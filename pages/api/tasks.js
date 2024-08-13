import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const getTasks = async (req, res) => {
  await client.connect();
  const db = client.db('task-manager');
  const tasks = await db.collection('tasks').find().toArray();
  res.status(200).json(tasks);
};

const createTask = async (req, res) => {
  await client.connect();
  const db = client.db('task-manager');
  const result = await db.collection('tasks').insertOne(req.body);
  res.status(201).json(result.ops[0]);
};

const updateTask = async (req, res) => {
  await client.connect();
  const db = client.db('task-manager');
  const { id } = req.query;
  const result = await db.collection('tasks').findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: req.body },
    { returnOriginal: false }
  );
  res.status(200).json(result.value);
};

const deleteTask = async (req, res) => {
  await client.connect();
  const db = client.db('task-manager');
  const { id } = req.query;
  await db.collection('tasks').deleteOne({ _id: new ObjectId(id) });
  res.status(204).end();
};

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      await getTasks(req, res);
      break;
    case 'POST':
      await createTask(req, res);
      break;
    case 'PUT':
      await updateTask(req, res);
      break;
    case 'DELETE':
      await deleteTask(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
