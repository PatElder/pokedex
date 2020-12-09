import React, { useEffect, useRef } from 'react'
import './App.css'
import { PokemonTable } from './components/PokemonTable'
import '@rmwc/data-table/styles'

function App() {
  let selectedPokemon = useRef('')

  useEffect(() => {
    document.title =
      selectedPokemon.current === ''
        ? 'Pokédex'
        : `Pokédex | ${selectedPokemon}`
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Pokédex{' '}
          {selectedPokemon.current === '' ? null : `${selectedPokemon.current}`}
        </h1>
      </header>
      <PokemonTable />
    </div>
  )
}

export default App
