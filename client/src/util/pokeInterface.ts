export interface PokeObj {
  base: {
    HP: number
    Attack: number
    Defense: number
    ['Sp. Attack']: number
    ['Sp. Defebse']: number
    Speed: number
  }
  id: number
  name: {
    chinese: string
    english: string
    french: string
    japanese: string
  }
  type: string[]
}
