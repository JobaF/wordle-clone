import { activeRowAtom, activeGuessAtom } from '../helpers/atomDefinitions'
import { useAtom } from 'jotai'

const KeysView = () => {
  const keyboardLayout = [
    'QWERTZUIOP'.split(''),
    'ASDFGHJKL'.split(''),
    ['ENTER', 'YXCVBNM'.split(''), 'BACK'].flat(),
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
  const handleBackspaceClick = () => {
    if (activeRow < 6 && activeGuess.length <= 5 && activeGuess.length > 0) {
      setActiveGuess((lastGuess) => lastGuess.slice(0, lastGuess.length - 1))
    }
  }
  const handleEnterClick = () => {
    setActiveGuess((lastGuess) => lastGuess.slice(0, lastGuess.length - 1))
  }
  if (char === 'BACK') {
    return <BackSpaceIcon handleBackspaceClick={() => handleBackspaceClick()} />
  }
  if (char === 'ENTER') {
    return <EnterIcon handleEnterClick={() => handleEnterClick()} />
  }
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

const BackSpaceIcon = ({ handleBackspaceClick }) => {
  return (
    <div
      style={{ cursor: 'pointer' }}
      onClick={handleBackspaceClick}
      className="flex justify-center items-center w-7 h-9 md:w-12 md:h-16 bg-gray-300 rounded-md border"
    >
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

const EnterIcon = ({ handleEnterClick }) => {
  return (
    <div
      style={{ cursor: 'pointer' }}
      onClick={handleEnterClick}
      className="flex justify-center items-center w-7 h-9 md:w-12 md:h-16 bg-gray-300 rounded-md border"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          d="M21,4 C21.5128358,4 21.9355072,4.38604019 21.9932723,4.88337887 L22,5 L22,11.5 C22,13.3685634 20.5357224,14.8951264 18.6920352,14.9948211 L18.5,15 L5.415,15 L8.70710678,18.2928932 C9.06759074,18.6533772 9.09532028,19.2206082 8.79029539,19.6128994 L8.70710678,19.7071068 C8.34662282,20.0675907 7.77939176,20.0953203 7.38710056,19.7902954 L7.29289322,19.7071068 L2.29289322,14.7071068 C2.25749917,14.6717127 2.22531295,14.6343256 2.19633458,14.5953066 L2.12467117,14.4840621 L2.12467117,14.4840621 L2.07122549,14.371336 L2.07122549,14.371336 L2.03584514,14.265993 L2.03584514,14.265993 L2.0110178,14.1484669 L2.0110178,14.1484669 L2.00397748,14.0898018 L2.00397748,14.0898018 L2,14 L2.00278786,13.9247615 L2.00278786,13.9247615 L2.02024007,13.7992742 L2.02024007,13.7992742 L2.04973809,13.6878575 L2.04973809,13.6878575 L2.09367336,13.5767785 L2.09367336,13.5767785 L2.14599545,13.4792912 L2.14599545,13.4792912 L2.20970461,13.3871006 L2.20970461,13.3871006 L2.29289322,13.2928932 L2.29289322,13.2928932 L7.29289322,8.29289322 C7.68341751,7.90236893 8.31658249,7.90236893 8.70710678,8.29289322 C9.06759074,8.65337718 9.09532028,9.22060824 8.79029539,9.61289944 L8.70710678,9.70710678 L5.415,13 L18.5,13 C19.2796961,13 19.9204487,12.4051119 19.9931334,11.64446 L20,11.5 L20,5 C20,4.44771525 20.4477153,4 21,4 Z"
          id="🎨-Color"
        ></path>
      </svg>
    </div>
  )
}
export default KeysView
