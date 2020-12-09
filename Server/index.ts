import express from 'express'
// rest of the code remains same
const app = express()
const PORT = 8000
app.get('/pokemon', (req, res) => {
  const fs = require('fs')
  const rawData = fs.readFileSync('./dataSources/data.json', 'utf8')
  let hitArray = false
  let i = 0
  let pokemonArray = rawData.split('')
  pokemonArray.splice(0, pokemonArray.indexOf('['))
  pokemonArray.length = pokemonArray.indexOf('©')
  pokemonArray = pokemonArray.join('')

  let pokemonJSON = JSON.parse(pokemonArray)

  res.send(pokemonJSON)
})

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`)
})
