import React from 'react'
import Die from './components/Die'
import Confetti from 'react-confetti'
import { nanoid } from 'nanoid'


export default function App() {
    const [dice, setAllDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [count, setCount] = React.useState(1)

    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
        }
    }, [dice])


    function generateNewDie() {
        return {
            value: Math.floor(Math.random() * 6 + 1),
            isHeld: false,
            id: nanoid()
        }
    }

    function allNewDice() {
        let arr = []
        for (let i = 0; i < 10; ++i){
            arr.push(generateNewDie())
        }
        return arr
    }

    function rollDice() {
        if (!tenzies){
            setAllDice(prevDice => (
                prevDice.map(die => (die.isHeld ? die : generateNewDie()))
            ))
        } else {
            setTenzies(false)
            setCount(1)
            setAllDice(allNewDice())
        }
    }

    function holdDice(id) {
        setAllDice(prevDice => (prevDice.map(die => ({
            ...die,
            isHeld: die.id === id ? !die.isHeld : die.isHeld
        }))))
    }

    function countTries() {
        setCount(lastCount => ++lastCount)
    }

    const diceElements = dice.map(die => <Die
        isHeld={die.isHeld}
        value={die.value}
        key={die.id}
        holdDice={() => holdDice(die.id)}
        />)


    return (

        <main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            {!tenzies ? <p className="instructions">Roll until all dice are the same.
                Click each die to freeze it at its current value between rolls.
            </p> : <h1>Congrats, You Won with {count} rolls!</h1>}
            <div className="container">
                {diceElements}
            </div>
            <div className='roll-dice'>
                <button onClick={() => {rollDice(); countTries()}}>{tenzies ? 'New Game' : 'Roll'}</button>
            </div>
        </main>
    )
}
