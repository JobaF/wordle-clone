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
      checkWord(activeGuess)
      setActiveRow(activeRow + 1)
      let newGuesses = [...guesses]
      newGuesses[activeRow] = activeGuess
      setGuesses(newGuesses)
      setActiveGuess('')
    }
  }
  // Backspace
  else if (event.keyCode === 8) {
    setActiveGuess((oldGuess) => oldGuess.slice(0, oldGuess.length - 1))
  }
}
