const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const vetor = [
  { mensagem: 'ku', numero: 0 },
  { mensagem: 'tienes', numero: 1 },
  { mensagem: 'medito', numero: 2 },
  { mensagem: 'do', numero: 3 },
  { mensagem: 'escuro', numero: 4 },
];

app.post('/falas', (req, res) => {
  const mensagem = req.body.mensagem;  
  console.log(mensagem);
  res.status(201).json({ mensagem: 'Será que deu boa?' });
});

app.delete('/falas', (req, res) => {
  const numero = req.body.numero;
  vetor.splice(numero, 1);
  console.log(vetor);
  res.status(201).json({ mensagem: 'Deu boa o DELETE' });
});

// PUT request - atualiza uma mensagem pelo número
app.put('/falas', (req, res) => {
  const numero = req.body.numero;
  const mensagem = req.body.mensagem;  // Corrigido
  vetor[numero].mensagem = mensagem;  // Corrigido
  console.log(vetor);
  res.status(201).json({ mensagem: 'Deu boa o PUT' });
});

// GET request - retorna o vetor de mensagens
app.get('/falas', (req, res) => {
  res.status(200).json({ vetor });
  console.log('Slk que maneiro mano');
});

// Rota raiz para teste
app.get('/', (req, res) => {
  res.status(200).json({ mensagem: 'Olá mundo!!!' });
  console.log('Oi');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});