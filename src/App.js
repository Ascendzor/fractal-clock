import React from 'react';
import logo from './logo.svg';
import './App.css';

const App = props => {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div style={{marginLeft: 'auto', marginRight: 'auto', height: '100%', width: '100%', position: 'absolute'}}>
        <svg width='400' height='400' viewBox="0 0 400 400" style={{paddingTop: 50}}>
          <g transform='translate(200, 200)'>
            {/* <path style={{stroke: 'red', strokeWidth: 3}} d='M 0,-100 L 0,-120 Z' /> */}
            {[...Array(12)].map((nothing, i) => {
              const rotationFraction = i/12
              const rotationInDegrees = 360 * rotationFraction
              return <g transform={`rotate(${rotationInDegrees})`}>
                <path style={{stroke: 'grey', strokeWidth: 2}} d='M 0,-100 L 0,-115 Z' />
                <text transform={`translate(0,-85) rotate(-${rotationInDegrees})`} dominantBaseline="middle" textAnchor="middle" style={{stroke: 'grey'}}>{i || 12}</text>
              </g>
            })}
            {[...Array(60)].map((nothing, i) => {
              const rotationFraction = i/60
              const rotationInDegrees = 360 * rotationFraction
              return <g transform={`rotate(${rotationInDegrees})`}>
                <path style={{stroke: 'grey', strokeWidth: 1}} d='M 0,-110 L 0,-115 Z' />
              </g>
            })}
          </g>
        </svg>
      </div>
    </div>
  );
}

export default App;
