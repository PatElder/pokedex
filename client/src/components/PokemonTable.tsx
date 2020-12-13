import React, { useEffect, useState, useRef, useCallback } from 'react'
import { http } from '../util/util'
import { PokeObj } from '../util/pokeInterface'
import { TextField } from '@rmwc/textfield'
import '@rmwc/textfield/styles'

export function PokemonTable() {
  const [pokemon, setPokemon] = useState([])
  const [pagination, setPagination] = useState(10)
  const [headers, setHeaders]: any = useState([])
  const [page, setPage]: any = useState([])

  const maxPokemon = useRef(0)
  const changeTableQty = useCallback(
    (e: number) => {
      const tempPage = []
      setPagination(e)

      for (let i = 0; i < pokemon.length; i += pagination) {
        tempPage.push(pokemon.slice(i, i + pagination))
      }

      setPage(tempPage)

      return tempPage
    },
    [pagination, pokemon],
  )

  useEffect(() => {
    const tempHeaders: string[] = []
    http('/pokemon')
      .then((response: any) => {
        // avoidable any with an interface
        setPokemon(response)
        maxPokemon.current = response.length
        changeTableQty(pagination)
        Object.keys(response[0]).map((key) =>
          key !== 'base'
            ? tempHeaders.push(key)
            : Object.keys(response[0][key]).map((subKey) => {
                console.log(key, subKey)
                tempHeaders.push(subKey)
                return tempHeaders
              }),
        )
        if (headers.length === 0) {
          setHeaders(tempHeaders)
        }
        return response
      })
      .catch((error) => error)
  }, [headers, pagination, changeTableQty])

  return (
    <div>
      <React.Suspense fallback={<h1>Loading Pokemon...</h1>}>
        <table>
          <tbody>
            <tr>
              {headers.map((el: string, i: number) => (
                <th key={i}>{el}</th>
              ))}
            </tr>
            {page.length > 0
              ? pokemon.map((el: PokeObj, i: number) => (
                  <tr>
                    <td key={i + '_' + el.id}>{el.id}</td>
                    <td key={i + '_' + el.name.english}>{el.name.english}</td>
                    <td>
                      {el.type.map((type) => (
                        <p>
                          {type}
                          <br />
                        </p>
                      ))}
                    </td>
                    {Object.entries(el.base).map((base, entry) => (
                      <td key={base[1] + entry + i}>{base[1]}</td>
                    ))}
                  </tr>
                ))
              : null}
          </tbody>
          <TextField
            outlined
            label="Pagination"
            pattern="[0-9]+"
            placeholder="10"
            max={maxPokemon.current}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              changeTableQty(+e.target.value)
            }
          />
        </table>
      </React.Suspense>
    </div>
  )
}
