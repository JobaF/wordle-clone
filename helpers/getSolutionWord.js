import { words } from '../files/words'

export const getSolutionWord = () => {
  const randomNumber = Math.floor(Math.random() * words.length)
  const word = words[randomNumber]
  return String(word).toUpperCase()
}
