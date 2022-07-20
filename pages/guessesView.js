const GuessesView = ({}) => {
  return (
    <div className="grid gap-1">
      {[...Array(6)].map((_, i) => (
        <Row key={i} />
      ))}
    </div>
  )
}

const Row = () => {
  return (
    <div className="flex justify-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Square key={i} />
      ))}
    </div>
  )
}

const Square = () => {
  return (
    <div className="border-black/40 border-2 w-24 h-24 text-5xl flex justify-center items-center"></div>
  )
}

export default GuessesView
