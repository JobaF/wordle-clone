import GuessesView from '../components/GuessesView'
import { solutionWordAtom } from '../helpers/atomDefinitions'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { getSolutionWord } from '../helpers/getSolutionWord'
import {
  activeGuessAtom,
  activeRowAtom,
  lockedInGuessesAtom,
} from '../helpers/atomDefinitions'
import KeysView from '../components/KeysView'
import { allWords } from '../files/words'

export default function Home() {
  const [solution, setSolution] = useAtom(solutionWordAtom)
  const [activeGuess, setActiveGuess] = useAtom(activeGuessAtom)
  const [activeRow, setActiveRow] = useAtom(activeRowAtom)
  const [lockedInGuesses, setLockedInGuesses] = useAtom(lockedInGuessesAtom)

  useEffect(() => {
    setSolution(getSolutionWord)
  }, [])

  const isWordAllowed = (word) => {
    return allWords.includes(word)
  }

  const handleKeyDown = (event) => {
    // Alphabetic key
    if (event.keyCode >= 65 && event.keyCode <= 90 && activeRow <= 5) {
      setActiveGuess((oldGuess) =>
        oldGuess.length < 5
          ? oldGuess + String(event.key).toUpperCase()
          : oldGuess,
      )
    }
    // Enter key
    else if (event.keyCode === 13) {
      if (activeGuess.length === 5 && activeRow <= 5) {
        setActiveRow((activeRow) => activeRow + 1)
        let newGuesses = [...lockedInGuesses]
        newGuesses[activeRow] = activeGuess
        setLockedInGuesses(newGuesses)
        setActiveGuess('')
      }
    }
    // Backspace
    else if (event.keyCode === 8) {
      setActiveGuess((oldGuess) => oldGuess.slice(0, oldGuess.length - 1))
    }
  }

  useEffect(() => {
    window?.addEventListener('keydown', handleKeyDown)
    // cleanup this component
    return () => {
      window?.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  return (
    <div className="mt-6">
      <GuessesView />
      <div>{solution}</div>
      <KeysView />
    </div>
  )
}
