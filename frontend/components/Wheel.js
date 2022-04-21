import React from 'react'
import { connect } from 'react-redux'
import { moveClockwise, moveClockWise, moveCounterClockwise} from '../state/action-creators'

export function Wheel(props) {

  const { wheelPosition, moveClockwise, moveCounterClockwise } = props 

  const clockwiseClick = evt => {
    const { value } = evt.target
    moveClockwise(value)
  }

  const counterClockwiseClick = evt => {
    const { value } = evt.target
    moveCounterClockwise(value)
  }

  return (
    <div id="wrapper">
      <div id="wheel">
        <div className={wheelPosition === 0 ? "cog active" : 'cog'} style={{ "--i": 0 }}>{wheelPosition === 0 ? 'B' : ''}</div>
        <div className={wheelPosition === 1 ? "cog active" : 'cog'} style={{ "--i": 1 }}>{wheelPosition === 1 ? 'B' : ''}</div>
        <div className={wheelPosition === 2 ? "cog active" : 'cog'} style={{ "--i": 2 }}>{wheelPosition === 2 ? 'B' : ''}</div>
        <div className={wheelPosition === 3 ? "cog active" : 'cog'} style={{ "--i": 3 }}>{wheelPosition === 3 ? 'B' : ''}</div>
        <div className={wheelPosition === 4 ? "cog active" : 'cog'} style={{ "--i": 4 }}>{wheelPosition === 4 ? 'B' : ''}</div>
        <div className={wheelPosition === 5 ? "cog active" : 'cog'} style={{ "--i": 5 }}>{wheelPosition === 5 ? 'B' : ''}</div>{/* --i is a custom CSS property, no need to touch that nor the style object */}
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={counterClockwiseClick}>Counter clockwise</button>
        <button id="clockwiseBtn" onClick={clockwiseClick}>Clockwise</button>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    wheelPosition: state.wheel
  }
}

export default connect(mapStateToProps, { moveClockwise, moveCounterClockwise })(Wheel)