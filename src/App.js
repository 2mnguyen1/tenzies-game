import React from 'react'
import Die from './components/Die'
export default function App() {
    const [dice, setAllDice] = React.useState(allNewDice())

    function allNewDice() {
        let arr = []
        for (let i = 0; i < 10; ++i){
            let random = Math.floor(Math.random() * 6 + 1)
            arr.push({
                value: random,
                isHeld: false
            })
        }
        return arr
    }

    function rollDice() {
        let newDice = allNewDice()
        return setAllDice(newDice)
    }

    const diceElements = dice.map(die => <Die value={die.value} />)


    return (
        <main>
            <div className="container">
                {diceElements}
            </div>
            <div className='roll-dice'>
                <button onClick={rollDice}>Roll</button>
            </div>
        </main>
    )
}
