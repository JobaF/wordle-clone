import GuessesView from '../components/GuessesView'
import { useAtom, useAtomValue } from 'jotai'
import { useEffect } from 'react'
import { getSolutionWord } from '../helpers/getSolutionWord'
import {
  activeGuessAtom,
  activeRowAtom,
  lockedInGuessesAtom,
  isGuessAllowed,
  isGuessSolution,
  solutionWordAtom,
  gameEndedAtom,
} from '../helpers/atomDefinitions'
import KeysView from '../components/KeysView'

export default function Home() {
  const [solution, setSolution] = useAtom(solutionWordAtom)
  const [activeGuess, setActiveGuess] = useAtom(activeGuessAtom)
  const [activeRow, setActiveRow] = useAtom(activeRowAtom)
  const [lockedInGuesses, setLockedInGuesses] = useAtom(lockedInGuessesAtom)
  const [gameEnded, setGameEnded] = useAtom(gameEndedAtom)
  const isWordAllowed = useAtomValue(isGuessAllowed)
  const isGuessTheSolution = useAtomValue(isGuessSolution)

  useEffect(() => {
    setSolution(getSolutionWord)
  }, [])

  const handleKeyDown = (event) => {
    if (!gameEnded) {
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
        if (activeGuess.length === 5 && activeRow <= 5 && isWordAllowed) {
          if (isGuessTheSolution) {
            setGameEnded((oldVal) => true)
            setTimeout(() => {
              window.alert('WINNER')
            }, 1000)
          }
          setActiveRow((activeRow) => activeRow + 1)
          let newGuesses = [...lockedInGuesses]
          newGuesses[activeRow] = activeGuess
          setLockedInGuesses(newGuesses)
          setActiveGuess('')
          if (activeRow === 6) setGameEnded(true)
        }
      }
      // Backspace
      else if (event.keyCode === 8) {
        setActiveGuess((oldGuess) => oldGuess.slice(0, oldGuess.length - 1))
      }
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
    <div className="h-screen flex flex-col justify-around ">
      <GuessesView />
      <KeysView />
    </div>
  )
}
