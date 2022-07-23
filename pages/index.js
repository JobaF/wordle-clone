import GuessesView from './guessesView'
import { solutionWordAtom } from '../helpers/atomDefinitions'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { getSolutionWord } from '../helpers/getSolutionWord'
import { handleKeyDown } from '../helpers/handleKeyInput'

export default function Home() {
  const [solution, setSolution] = useAtom(solutionWordAtom)

  useEffect(() => {
    setSolution(getSolutionWord)
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    // cleanup this component
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  return (
    <div className="mt-6">
      <GuessesView />
      {solution}
    </div>
  )
}
