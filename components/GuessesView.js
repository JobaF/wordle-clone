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
  const [activeGuess] = useAtom(activeGuessAtom)
  const [activeRow] = useAtom(activeRowAtom)
  const [lockedInGuesses] = useAtom(lockedInGuessesAtom)
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
      <Square key={'square' + 0} character={word[0]} charId={0} rowId={rowId} />
      <Square key={'square' + 1} character={word[1]} charId={1} rowId={rowId} />
      <Square key={'square' + 2} character={word[2]} charId={2} rowId={rowId} />
      <Square key={'square' + 3} character={word[3]} charId={3} rowId={rowId} />
      <Square key={'square' + 4} character={word[4]} charId={4} rowId={rowId} />
    </div>
  )
}

const Square = ({ character, charId, rowId }) => {
  const [activeRow] = useAtom(activeRowAtom)
  const [correctWord] = useAtom(solutionWordAtom)
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
      className={`${backgroundColor} border-black/40 border-2 w-14 h-14 md:w-24 md:h-24 text-2xl md:text-5xl flex justify-center items-center`}
    >
      {character}
    </div>
  )
}

export default GuessesView
