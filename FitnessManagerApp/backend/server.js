import express from 'express';
import 'dotenv/config';
import postgres from 'postgres';
import cors from 'cors';

const app = express();
const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });

app.use(cors());
app.use(express.json());

app.get('/users', async (req, res) => {
  try {
    const users = await sql`SELECT * FROM clienti WHERE nume = 'Pedro'`;
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

app.listen(3001, () => console.log('Server running on port 3001'));
