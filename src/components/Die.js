import React from 'react'

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? '#59E391' : '',
    }
    return (
        <div
            onClick={props.holdDice}
            className='die-face'
            style={styles}>
            <h2>{props.value}</h2>
        </div>
    )
}
