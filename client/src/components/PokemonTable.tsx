import React, { useEffect, useState } from "react";
import { http } from "../util/util";
import { PokeObj } from "../util/pokeInterface";

export function PokemonTable() {
	const [pokemon, setPokemon] = useState([]);
	const [headers, setHeaders]: any = useState([]);

	useEffect(() => {
		const tempHeaders: string[] = [];
		http("/pokemon")
			.then((response: any) => {
				// avoidable any with an interface
				setPokemon(response);

				Object.keys(response[0]).map((key) =>
					key !== "base"
						? tempHeaders.push(key)
						: Object.keys(response[0][key]).map((subKey) => {
								console.log(key, subKey);
								tempHeaders.push(subKey);
								return tempHeaders;
						  })
				);
				if (headers.length === 0) {
					setHeaders(tempHeaders);
				}
				return response;
			})
			.catch((error) => error);
	}, [headers]);
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
						{pokemon.map((el: PokeObj, i: number) => (
							<tr>
								<td key={i + "_" + el.id}>{el.id}</td>
								<td key={i + "_" + el.name.english}>{el.name.english}</td>
								<td>{el.type.map((type) => type + " ")}</td>
								{Object.entries(el.base).map((base, entry) => (
									<td key={base[1] + entry + i}>{base[1]}</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</React.Suspense>
		</div>
	);
}
