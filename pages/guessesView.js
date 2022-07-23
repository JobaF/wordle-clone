import { useAtom } from 'jotai'
import {
  activeGuessAtom,
  activeRowAtom,
  lockedInGuessesAtom,
  solutionWordAtom,
} from '../helpers/atomDefinitions'

const charIsInWord = (char, word) => {
  return word.split('').includes(char)
}

const charIsInCorrectPlace = (char, index, word) => {
  console.log(word)
  return word.split('')[index] === char
}

const GuessesView = () => {
  const [activeGuess, setActiveGuess] = useAtom(activeGuessAtom)
  const [activeRow, setActiveRow] = useAtom(activeRowAtom)
  const [lockedInGuesses, setLockedInGuesses] = useAtom(lockedInGuessesAtom)
  return (
    <div className="grid gap-1">
      {[...Array(6)].map((_, i) => {
        if (i === activeRow) {
          return <Row rowId={i} key={i} word={activeGuess} />
        } else if (i < activeRow) {
          return <Row rowId={i} key={i} word={lockedInGuesses[i]} />
        } else return <Row rowId={i} key={i} word={''} />
      })}
    </div>
  )
}

const Row = ({ rowId, word }) => {
  return (
    <div className="flex justify-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Square key={i} character={word[i]} charId={i} rowId={rowId} />
      ))}
    </div>
  )
}

const Square = ({ character, charId, rowId }) => {
  const [activeRow, setActiveRow] = useAtom(activeRowAtom)
  const [correctWord, setCorrectWord] = useAtom(solutionWordAtom)
  const correctCharAndIndex = character
    ? charIsInCorrectPlace(character, charId, correctWord)
    : false
  const isLoggedIn = rowId < activeRow
  const charInWord = charIsInWord(character, correctWord)
  const whichBackground = () => {
    if (isLoggedIn) {
      if (correctCharAndIndex) return 'bg-green-600'
      else if (charInWord) return 'bg-yellow-600'
    } else return 'bg-grey-600'
  }
  const backgroundColor = whichBackground()
  return (
    <div
      className={`${backgroundColor} border-black/40 border-2 w-24 h-24 text-5xl flex justify-center items-center`}
    >
      {character}
    </div>
  )
}

export default GuessesView
