import { useAtom } from 'jotai'
import {
  activeGuessAtom,
  activeRowAtom,
  lockedInGuessesAtom,
} from '../helpers/atomDefinitions'

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
        <Square key={i} character={word[i]} />
      ))}
    </div>
  )
}

const Square = ({ character }) => {
  return (
    <div className="border-black/40 border-2 w-24 h-24 text-5xl flex justify-center items-center">
      {character}
    </div>
  )
}

export default GuessesView
