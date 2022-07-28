import { atom } from 'jotai'
import { allWords } from '../files/words'

const isWordAllowed = (word) => {
  if (word.length !== 5) return false
  return allWords.includes(String(word).toLowerCase())
}
export const activeGuessAtom = atom('')
export const activeRowAtom = atom(0)
export const lockedInGuessesAtom = atom(Array.from({ length: 6 }))
export const solutionWordAtom = atom('')

export const getActiveGuess = atom((get) => get(activeGuessAtom))
export const getActiveRow = atom((get) => get(activeRowAtom))
export const getSolutionWord = atom((get) => get(solutionWordAtom))

export const isGuessAllowed = atom((get) => isWordAllowed(get(activeGuessAtom)))
