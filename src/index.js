const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const generateToken = require('./utils/generateToken');
const validateAge = require('./middlewares/validateAge');
const validateAuth = require('./middlewares/validateAuth');
const validateName = require('./middlewares/validateName');
const validateRate = require('./middlewares/validateRate');
const validateTalk = require('./middlewares/validateTalk');
const validateWatchedAt = require('./middlewares/validateWatchedAt');
const validationLogin = require('./middlewares/validationLogin');

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

app.post('/login', validationLogin, async (req, res) => {
  const token = generateToken();
  res.status(200).json({ token });
});

app.post('/talker', 
  validateAuth, 
  validateName, 
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  async (req, res) => {
    const { name, age, talk: { watchedAt, rate } } = req.body;
        const talker = await readFile();
        const newTalker = {
        id: talker[talker.length - 1].id + 1,
        name,
        age,
        talk: {
          watchedAt,
          rate,
        },
      };
        const allTalker = JSON.stringify([...talker, newTalker]);
        await fs.writeFile(talkerPath, allTalker);
        res.status(201).json(newTalker);
});

app.put('/talker/:id', validateAuth, 
validateName, 
validateAge,
validateTalk,
validateWatchedAt,
validateRate,
async (req, res) => {
  const { id } = req.params;
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const talker = await readFile();
  const index = talker.findIndex((element) => element.id === Number(id));
  talker[index] = { id: Number(id), name, age, talk: { watchedAt, rate } };
  const updateTalker = JSON.stringify(talker);
  await fs.writeFile(talkerPath, updateTalker);
  res.status(200).json(talker[index]);
});

app.delete('/talker/:id', validateAuth, async (req, res) => {
  const { id } = req.params;
  const talker = await readFile();
  const filteredTalker = talker.filter((talk) => talk.id !== Number(id));
  const updateTalker = JSON.stringify(filteredTalker);
  await fs.writeFile(talkerPath, updateTalker);
  res.status(204).end();
});
