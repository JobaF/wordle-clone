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
    <div className="flex justify-center gap-1">
      {keyRow.map((key, i) => (
        <Key char={key} />
      ))}
    </div>
  )
}

const Key = ({ char }) => {
  return (
    <div className="border-black/40 border w-12 h-12 text-2xl flex justify-center items-center">
      {char}
    </div>
  )
}

export default KeysView
