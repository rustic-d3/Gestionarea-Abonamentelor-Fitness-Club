import express from "express";
import "dotenv/config";
import postgres from "postgres";
import cors from "cors";

const app = express();
const sql = postgres(process.env.DATABASE_URL, { ssl: "require" });

app.use(cors());
app.use(express.json());

app.get("/users", async (req, res) => {
  try {
    const users = await sql`SELECT * FROM clienti`;
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});
app.get("/full-paid-subscriptions", async (req, res) => {
  try {
    const raport = await sql`SELECT * FROM abonamente_achitate_integral()`;
    res.json(raport);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});

app.get("/full-report", async (req, res) => {
  try {
    const raport = await sql`SELECT * FROM raport_abonamente_detaliat();`;
    res.json(raport);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});
app.get("/subscriptions", async (req, res) => {
  try {
    const raport = await sql`SELECT * FROM abonamente;`;
    res.json(raport);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});
app.get("/clienti-eligibili", async (req, res) => {
  try {
    const raport = await sql`SELECT * FROM afiseaza_raport_clienti();`;
    res.json(raport);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});

app.get("/bad-client", async (req, res) => {
  try {
    const raport = await sql`SELECT * FROM get_client_cel_mai_restant();`;
    res.json(raport);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});

app.post("/addSubscription", async (req, res) => {
  const { cnp, subscription, price, finalPrice } = req.body;
  const suma_incasata = finalPrice;
  const transaction_date = new Date(); // Javascript Date object

  try {
    const response = await sql`
            CALL abonamente_achizitie(
                ${cnp}::CHAR(13),             
                ${subscription}::VARCHAR(20),  
                ${transaction_date}::DATE,     
                ${price}::NUMERIC(10,2),       
                ${suma_incasata}::NUMERIC(10,2)
            );
        `;

    res.json({
      ok: true,
      message: "Abonament achiziționat cu succes.",
      db_response: response,
    });
  } catch (err) {
    console.error("Eroare la baza de date sau excepție:", err.message);
    res.status(500).json({
      ok: false,
      error:
        "Eroare la achiziționarea abonamentului. Verificați soldul sau datele.",
      details: err.message,
    });
  }
});
app.post("/checkChange", async (req, res) => {
  const { cnp, serviciu } = req.body;

  if (!cnp || !serviciu) {
    return res.status(400).json({ error: "Lipsesc datele (cnp sau serviciu)." });
  }

  try {
    const response = await sql`
      SELECT * FROM rest_de_plata(${cnp}, ${serviciu})
    `;
    
    res.json(response); 
  } catch (err) {
    console.error("Eroare DB:", err.message);
    res.status(500).json({
      error: "Eroare la verificarea restanței.",
      details: err.message,
    });
  }
});


app.post("/addClient", async (req, res) => {
  const { cnp, nume, prenume, adresa, telefon, disponibil } = req.body;

  try {
    const response = await sql`
            insert into
  clienti (CNP, nume, prenume, adresa, telefon, disponibil)
values
  (
    ${cnp}::CHAR(13),
    ${nume}::VARCHAR(50),
    ${prenume}::VARCHAR(50),
    ${adresa}::VARCHAR(100),
    ${telefon}::CHAR(10),
    ${disponibil}::NUMERIC(10,2)
  );
        `;

    res.json({
      ok: true,
      message: "Client adăugat cu succes.",
      db_response: response,
    });
  } catch (err) {
    console.error("Eroare la baza de date sau excepție:", err.message);
    res.status(500).json({
      ok: false,
      error:
        "Eroare la adăugarea clientului. Verificați datele.",
      details: err.message,
    });
  }
});

app.listen(3001, () => console.log("Server running on port 3001"));
