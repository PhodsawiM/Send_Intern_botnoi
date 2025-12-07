const express = require('express');
const cors = require('cors');
const fs = require('fs');
const _ = require('lodash');
const path = require('path');
const app = express();
app.use(cors());
app.use(express.json()); 

const { cards } = require('../../mock/cards.json');
const saveFilePath = path.join(__dirname, "..", "..", "mock", "savedata.json");

let savedData = { save: [] };
try {
  savedData = JSON.parse(fs.readFileSync(saveFilePath, "utf8"));
} catch (e) {
  console.log("empty");
}
app.get('/api/cards', (req, res) => {
  const { name, type, supertype = "Pokémon", limit = 20 } = req.query;

  if (_.every([name, type, supertype], item => item === undefined)) {
    return res.json({ cards: cards.slice(0, limit) });
  }

  res.json({
    cards: _.filter(cards, card => {
      const qName = _.toUpper(name || "");
      const qType = _.toUpper(type || "");
      const qSuper = _.toUpper(supertype || "Pokémon");

      if (!_.includes(_.toUpper(card.supertype), qSuper)) return false;
      if (!_.includes(_.toUpper(card.name), qName)) return false;
      if (!_.includes(_.toUpper(card.type), qType)) return false;
      return true;
    })
  });
});

app.post('/api/save', (req, res) => {
  const list = req.body.pokedex;

  if (!Array.isArray(list))
    return res.status(400).json({ message: 'error' });

  savedData.save = list;

  fs.writeFileSync(saveFilePath, JSON.stringify(savedData, null, 2));

  res.json({ message: 'saved_successfully' });
});

app.get('/api/load', (req, res) => {
  try {
    const json = fs.readFileSync(saveFilePath, 'utf8');
    const data = JSON.parse(json);
    res.json(data.save || []);
  } catch (err) {
    res.json([]);
  }
});



app.listen(3030, () => console.log('app start @ port 3030'));
