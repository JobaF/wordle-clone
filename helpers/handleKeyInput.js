import { useAtom } from 'jotai'
import {
  activeGuessAtom,
  activeRowAtom,
  lockedInGuessesAtom,
} from './atomDefinitions'

export const handleKeyDown = (event) => {
  const [activeGuess, setActiveGuess] = useAtom(activeGuessAtom)
  const [activeRow, setActiveRow] = useAtom(activeRowAtom)
  const [lockedInGuesses, setLockedInGuesses] = useAtom(lockedInGuessesAtom)

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
      let newGuesses = [...guesses]
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
