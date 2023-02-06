const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
app.use(express.json());

const talkerPath = path.resolve(__dirname, './talker.json');

const readFile = async () => {
  try {
    const data = await fs.readFile(talkerPath);
    return JSON.parse(data);
  } catch (error) {
    console.error(`Arquivo não pode ser lido: ${error}`);
  }
};

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (req, res) => {
  try {
    const talker = await readFile();
    res.status(200).json(talker);
  } catch (err) {
    res.status(200).send({ err });
  }
});

app.get('/talker/:id', async (req, res) => {
    const talker = await readFile();
    const talkerId = talker.find(({ id }) => id === Number(req.params.id));
    if (!talkerId) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
      return res.status(200).json(talkerId);
});

function makeToken(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

// const loginTalker = [];

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const token = makeToken(16);
  const login = {
    email,
    password,
    token,
  };
  // loginTalker.push(login);
  res.status(200).json(login);
});
