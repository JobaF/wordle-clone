import { activeRowAtom, activeGuessAtom } from '../helpers/atomDefinitions'
import { useAtom } from 'jotai'

const KeysView = () => {
  const keyboardLayout = [
    'QWERTZUIOP'.split(''),
    'ASDFGHJKL'.split(''),
    ['YXCVBNM'.split(''), 'BACK'].flat(),
  ]
  return (
    <div className="flex gap-1 flex-col">
      {keyboardLayout.map((keyboardRow, id) => (
        <KeyRow key={'keyboardRow' + id} keyRow={keyboardRow} />
      ))}
    </div>
  )
}

const KeyRow = ({ keyRow }) => {
  return (
    <div className="flex justify-center gap-0.5 md:gap-1">
      {keyRow.map((key, i) => (
        <Key key={'key' + i} char={key} />
      ))}
    </div>
  )
}

const Key = ({ char }) => {
  const [activeRow] = useAtom(activeRowAtom)
  const [activeGuess, setActiveGuess] = useAtom(activeGuessAtom)
  const handleKeyClick = (char) => {
    if (activeRow < 6 && activeGuess.length < 5) {
      setActiveGuess((lastGuess) => lastGuess + char)
    }
  }
  if (char === 'BACK') return <BackSpaceIcon />
  return (
    <div
      style={{
        MozUserSelect: 'none',
        WebkitUserSelect: 'none',
        msUserSelect: 'none',
        cursor: 'pointer',
      }}
      onClick={() => handleKeyClick(char)}
      className="bg-gray-300 rounded-md border w-7 h-9 md:w-12 md:h-16 text-xl md:text-xl flex justify-center items-center"
    >
      {char}
    </div>
  )
}

const BackSpaceIcon = () => {
  return (
    <div className="flex justify-center items-center w-7 h-9 md:w-12 md:h-16 bg-gray-300 rounded-md border">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"
        />
      </svg>
    </div>
  )
}

export default KeysView
