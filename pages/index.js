import GuessesView from './guessesView'
import { solutionWordAtom } from '../helpers/atomDefinitions'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { getSolutionWord } from '../helpers/getSolutionWord'

export default function Home() {
  const [solution, setSolution] = useAtom(solutionWordAtom)

  useEffect(() => {
    setSolution(getSolutionWord)
  }, [])

  return (
    <div className="mt-6">
      <GuessesView />
      {solution}
    </div>
  )
}
