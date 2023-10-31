import './App.css'
import BouncingDiv from './BouncingDiv'
import styled from 'styled-components';
import { useState, useEffect } from 'react'

const ScoreCard = styled.div`
    position: absolute;
    font-size: 24px;
    top: 0;
    right: 0;
    left: 0;
    padding: 8px;
    background: white;
    color: black;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ScoreCount = styled.div`
`

const YippeeAndSkippee = styled.div`
  display: flex;
  gap: 16px;
`

const ActivatedYippee = styled.div`
  color: black;
`

const ActivatedSkippee = styled.div`
  color: black;
`

const DeactivatedYippee = styled.div`
  color: lightgray;
`

const DeactivatedSkippee = styled.div`
  color: lightgray;
`

function App() {
  const [activatedYippee, setActivatedYippee] = useState(false);
  const [activatedSkippee, setActivatedSkippee] = useState(false);
  const [score, setScore] = useState(0);
  const [noScoreAllowed, setNoScoreAllowed] = useState(false)

  useEffect(() => {
    if (activatedYippee && activatedSkippee) {
      setScore(prevScore => prevScore + 1)
      setTimeout(() => {
        setActivatedSkippee(false)
        setActivatedYippee(false)
        setNoScoreAllowed(false)
      }, 800)
    }

  }, [activatedYippee, activatedSkippee])

  return (
    <>
      <BouncingDiv setActivatedYippee={setActivatedYippee} setActivatedSkippee={setActivatedSkippee} noScoreAllowed={noScoreAllowed} setNoScoreAllowed={setNoScoreAllowed} />
      <ScoreCard>
        <YippeeAndSkippee>
          {activatedYippee ? (
            <ActivatedYippee>yippee</ActivatedYippee>
          ) : (
            <DeactivatedYippee>yippee</DeactivatedYippee>
          )}
          {activatedSkippee ? (
            <ActivatedSkippee>skippee</ActivatedSkippee>
          ) : (
            <DeactivatedSkippee>skippee</DeactivatedSkippee>
          )}
        </YippeeAndSkippee>
        <ScoreCount>
          {score}
        </ScoreCount>
      </ScoreCard>
    </>
  )
}

export default App
