import { atom } from 'jotai'

export const activeGuessAtom = atom('')
export const activeRowAtom = atom(0)
export const lockedInGuessesAtom = atom(Array.from({ length: 6 }))
export const solutionWordAtom = atom('')
