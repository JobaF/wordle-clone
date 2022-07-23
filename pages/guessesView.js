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
          return <Row rowId={i} key={'row' + i} word={activeGuess} />
        } else if (i < activeRow) {
          return <Row rowId={i} key={'row' + i} word={lockedInGuesses[i]} />
        } else return <Row rowId={i} key={'row' + i} word={''} />
      })}
    </div>
  )
}

const Row = ({ rowId, word }) => {
  return (
    <div className="flex justify-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Square
          key={'square' + i}
          character={word[i]}
          charId={i}
          rowId={rowId}
        />
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
      if (correctCharAndIndex) return 'bg-green-400'
      else if (charInWord) return 'bg-yellow-400'
      else return 'bg-gray-400'
    } else return ''
  }
  const backgroundColor = whichBackground()
  return (
    <div
      className={`${backgroundColor} border-black/40 border-2 w-12 h-12 md:w-24 md:h-24 text-5xl flex justify-center items-center`}
    >
      {character}
    </div>
  )
}

export default GuessesView
