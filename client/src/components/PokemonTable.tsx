import React, { useEffect, useState } from 'react'
import { http } from '../util/util'
import { PokeObj } from '../util/pokeInterface'

export function PokemonTable() {
  const [pokemon, setPokemon] = useState([])
  const [headers, setHeaders]: any = useState([])
  const [page, setPage]: any = useState([])
  const [pagination, setPagination] = useState(10)
  const [firstRender, setFirstRender] = useState(true)

  const setPages = (array: string[]) => {
    const tempArray = []
    const paginationBoxValue = +(document.getElementById(
      'paginationInput',
    ) as HTMLInputElement).value
    console.log(pagination, +paginationBoxValue)
    if (!!+paginationBoxValue) {
      setPagination(paginationBoxValue)
      tempArray.push(array.slice(0, pagination))
    } else {
      tempArray.push(array.slice(0, pagination))
      console.log(tempArray[0])
    }
    setPage(tempArray[0])
  }

  useEffect(() => {
    const tempHeaders: string[] = []
    http('/pokemon')
      .then((response: any) => {
        // avoidable any with an interface
        setPokemon(response)
        Object.keys(response[0]).map((key) =>
          key !== 'base'
            ? tempHeaders.push(key)
            : Object.keys(response[0][key]).map((subKey) => {
                tempHeaders.push(subKey)
                return tempHeaders
              }),
        )
        setHeaders(tempHeaders)
        return response
      })
      .catch((error) => error)
  }, [])

  if (pokemon.length > 0 && firstRender) {
    setFirstRender(false)
    setPages(pokemon)
  }

  return (
    <div>
      <React.Suspense fallback={<h1>Loading Pokemon...</h1>}>
        <table>
          <tbody>
            <tr>
              {headers.map((el: string) => (
                <th key={el}>{el}</th>
              ))}
            </tr>

            {page.length > 0
              ? page.map((el: PokeObj, i: number) => (
                  <tr key={el.name.japanese}>
                    <td key={el.id}>{el.id}</td>

                    <td key={el.name.english}>{el.name.english}</td>
                    <td key={el.type[0] + '_' + i}>
                      {el.type.map((type) => (
                        <p>
                          {type} <br />
                        </p>
                      ))}
                    </td>
                    {Object.entries(el.base).map((base, entry) => (
                      <td key={base[1] + entry}>{base[1]}</td>
                    ))}
                  </tr>
                ))
              : null}
          </tbody>
        </table>
        <div>
          <label>Pagination</label>
          <input type="text" id="paginationInput" placeholder="10" />
          <input
            type="button"
            value="Submit"
            onClick={() => setPages(pokemon)}
          />
        </div>
      </React.Suspense>
    </div>
  )
}
