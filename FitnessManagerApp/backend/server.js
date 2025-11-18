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
    const users = await sql`SELECT * FROM clienti`;
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});
app.get('/full-paid-subscriptions', async (req, res) => {
  try {
    const raport = await sql`SELECT * FROM abonamente_achitate_integral()`;
    res.json(raport);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

app.get('/full-report', async (req, res) => {
  try {
    const raport = await sql`SELECT * FROM raport_abonamente_detaliat();`;
    res.json(raport);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

app.listen(3001, () => console.log('Server running on port 3001'));
