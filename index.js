const express = require('express');
const { Pool } = require("pg");
const cors = require('cors');

const pool = new Pool({
  user: 'LucasCodeWorka',
  password: 'IO24VirZxBgc',
  host: 'ep-weathered-king-a59769hv.us-east-2.aws.neon.tech',
  port: '5432',
  database: 'liebe',
  ssl: {
    rejectUnauthorized: false,
    sslmode: 'require'
  }
});

const app = express();
const port1 = 3001;

const port = process.env.port || 3001; 

app.use(express.json());
app.use(cors());

app.get('/vendas_rep', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM public.vendas_rep');
    const data = result.rows;
    client.release();
    res.json(data);
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.listen(port1, () => {
  console.log(`Servidor rodando em http://localhost:${port1}`);
});
