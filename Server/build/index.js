"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// rest of the code remains same
const app = express_1.default();
const PORT = 8000;
app.get('/', (req, res) => {
    const fs = require('fs');
    const rawData = fs.readFileSync('./dataSources/data.json', 'utf8');
    let hitArray = false;
    let i = 0;
    let pokemonArray = rawData.split('');
    pokemonArray.splice(0, pokemonArray.indexOf('['));
    pokemonArray.length = pokemonArray.indexOf('©');
    pokemonArray = pokemonArray.join('');
    console.log(pokemonArray);
    let pokemonJSON = JSON.parse(pokemonArray);
    res.send(pokemonJSON);
});
app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
