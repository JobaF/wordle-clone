const KeysView = () => {
  const keyboardLayout = [
    'qwertzuiop'.split(''),
    'asdfghjkl'.split(''),
    'yxcvbnm'.split(''),
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
  return (
    <div
      style={{
        MozUserSelect: 'none',
        WebkitUserSelect: 'none',
        msUserSelect: 'none',
        cursor: 'pointer',
      }}
      className="bg-gray-300 rounded-md border w-7 h-9  md:w-12 md:h-16 text-xl md:text-xl flex justify-center items-center"
    >
      {char}
    </div>
  )
}

export default KeysView
