import { useState, useEffect } from 'react'
import { GAME_HEIGHT, GAME_WIDTH, BIRD_WIDTH, BIRD_HEIGHT, BIRD_JUMP, GRAVITY, PIPE_WIDTH, BIRD_LEFT, PIPE_GAP, GROUND_HEIGHT } from "../constants"
import Bird from './Bird'
import Pipes from './Pipes'
import Ground from './Ground'
import Score from './Score'

const Game = () => {
    const [gameStatus, setGameStatus] = useState('no-playing')
    const [birdY, setBirdY] = useState(GAME_HEIGHT / 2 - BIRD_WIDTH / 2)
    const [angle, setAngle] = useState(0)
    const [time, setTime] = useState(0)
    const [pipes, setPipes] = useState([
        {
            pipeHeight: Math.floor(Math.random() * (GAME_HEIGHT / 2 - 2 * BIRD_HEIGHT + 1) + 2 * BIRD_HEIGHT),
            pipeLeft: GAME_WIDTH
        },
        {
            pipeHeight: Math.floor(Math.random() * (GAME_HEIGHT / 2 - 2 * BIRD_HEIGHT + 1) + 2 * BIRD_HEIGHT),
            pipeLeft: GAME_WIDTH + 200
        },
    ])
    const [score, setScore] = useState(0)
    const [played, setPlayed] = useState(false)

    const handleOnClick = () => {
        if (gameStatus === 'no-playing' && !played) {
            setGameStatus('playing')
            setPlayed(true)
        }
        if (gameStatus === 'playing') {
            // fly
            setBirdY(birdY => birdY - BIRD_JUMP)
            setAngle(-20)
            setTime(0)
        }
    }

    useEffect(() => {
        let timer
        if (gameStatus === 'playing') {
            timer = setTimeout(() => {
                //bird drop
                setBirdY(birdY => birdY + GRAVITY + (50 * time * time) / 2000000)
                setAngle(20)
                setTime(time => time + 100)
                //pipes move
                setPipes(pipes => pipes.map((item) => {
                    return {
                        ...item,
                        pipeLeft: item.pipeLeft - 10
                    }
                }))
                //pipes generate
                if (pipes[score].pipeLeft + PIPE_WIDTH <= BIRD_LEFT) {
                    const newPipes = [...pipes]
                    newPipes.push(
                        {
                            pipeHeight: Math.floor(Math.random() * (GAME_HEIGHT / 2 - 2 * BIRD_HEIGHT + 1) + 2 * BIRD_HEIGHT),
                            pipeLeft: GAME_WIDTH + 200
                        }
                    )
                    setPipes(newPipes)
                    setScore(score => score + 1)
                }
            }, 100)
        }
        return () => {
            if (timer) clearTimeout(timer)
        }
    })

    useEffect(() => {
        let timer
        if (gameStatus === 'playing') {
            timer = setTimeout(() => {
                if (pipes[score].pipeLeft <= BIRD_LEFT + BIRD_WIDTH && pipes[score].pipeLeft + PIPE_WIDTH >= BIRD_LEFT) {
                    if (birdY <= pipes[score].pipeHeight || birdY >= pipes[score].pipeHeight + PIPE_GAP) {
                        setGameStatus('no-playing')
                    }
                }
                if (birdY >= GAME_HEIGHT - GROUND_HEIGHT - BIRD_HEIGHT) {
                    setGameStatus('no-playing')
                }
            }, 10)
        }
        return () => {
            if (timer) clearTimeout(timer)
        }
    })

    const newGame = () => {
        setBirdY(GAME_HEIGHT / 2 - BIRD_WIDTH / 2)
        setAngle(0)
        setTime(0)
        setPipes([
            {
                pipeHeight: Math.floor(Math.random() * (GAME_HEIGHT / 2 - 2 * BIRD_HEIGHT + 1) + 2 * BIRD_HEIGHT),
                pipeLeft: GAME_WIDTH
            },
            {
                pipeHeight: Math.floor(Math.random() * (GAME_HEIGHT / 2 - 2 * BIRD_HEIGHT + 1) + 2 * BIRD_HEIGHT),
                pipeLeft: GAME_WIDTH + 200
            },
        ])
        setScore(0)
        setPlayed(false)
    }

    return (
        <div style={{
            position: "relative",
            width: GAME_WIDTH,
            height: GAME_HEIGHT,
            backgroundColor: "pink",
            backgroundImage: "url('/images/bg.png')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            overflow: "hidden"
        }} onClick={handleOnClick}>
            {gameStatus === 'no-playing' && played && <button style={{
                position: 'absolute',
                width: 155,
                height: 44,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                border: 'none',
                cursor: 'pointer',
                zIndex: 20,
                backgroundImage: "url('/images/replay.png')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                mixBlendMode: 'multiply'
            }} onClick={newGame}></button>}
            <Score score={score} />
            <Bird birdY={birdY} angle={angle} />
            <Pipes pipes={pipes} />
            <Ground />
        </div>
    )
}

export default Game