import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

const App = props => {

  const [timeyWimeys, setTimeyWimeys] = useState([0, 0, 0]) //[hours, minutes, seconds]
  const [angleShmangles, setAngleShmangles] = useState([0, 0, 0]) //[hourAngle, minuteAngle, secondAngle]
  const [lines, setLines] = useState(<g />)

  useEffect(() => {
    setInterval(() => {
      const now = new Date()
      const milliseconds = now.getMilliseconds()
      
      const seconds = now.getSeconds() + (milliseconds/1000)
      const minutes = now.getMinutes() + (seconds / 60)
      const hours = now.getHours() + (minutes / 60)
      const secondAngle = 360 * seconds / 60
      const minuteAngle = 360 * minutes / 60
      
      const lineLength = 75
      const lineStyle = {strokeWidth: 1, stroke: 'grey'}
      const fractate = (minuteAngle, secondAngle, iteration) => {
        if(iteration == 9) return
        return <g>
          <g transform={`rotate(${minuteAngle})`}>
            <path style={lineStyle} d={`M 0,0 L 0,${-lineLength/iteration} Z`} />
            <g transform={`translate(0,${-lineLength/iteration})`}>
              {fractate(minuteAngle, secondAngle, iteration+1)}
            </g>
          </g>
          <g transform={`rotate(${secondAngle})`}>
            <path style={lineStyle} d={`M 0,0 L 0,${-lineLength/iteration} Z`} />
            <g transform={`translate(0, ${-lineLength/iteration})`}>
              {fractate(minuteAngle, secondAngle, iteration+1)}
            </g>
          </g>
        </g>
      }

      const lines = fractate(minuteAngle, secondAngle, 1)
      // console.log(lines)
      setLines(lines)
      // <path transform={`rotate(${angleShmangles[1]})`} style={{stroke: 'grey', strokeWidth: 2}} d='M 0,0 L 0,-75 Z' />
    }, 16)
  }, [])
  
  
  return (
    <div className="App">
      <div style={{marginLeft: 'auto', marginRight: 'auto', height: '100%', width: '100%', position: 'absolute'}}>
        <svg width='600' height='600' viewBox="0 0 600 600">
          <g transform='translate(300, 300)'>
            {/* <path style={{stroke: 'red', strokeWidth: 3}} d='M 0,-100 L 0,-120 Z' /> */}
            {[...Array(12)].map((nothing, i) => {
              const rotationFraction = i/12
              const rotationInDegrees = 360 * rotationFraction
              return <g transform={`rotate(${rotationInDegrees})`} key={i}>
                <path style={{stroke: 'grey', strokeWidth: 2}} d='M 0,-100 L 0,-115 Z' />
                <text transform={`translate(0,-85) rotate(-${rotationInDegrees})`} dominantBaseline="middle" textAnchor="middle" style={{stroke: 'grey'}}>{i || 12}</text>
              </g>
            })}
            {[...Array(60)].map((nothing, i) => {
              const rotationFraction = i/60
              const rotationInDegrees = 360 * rotationFraction
              return <g transform={`rotate(${rotationInDegrees})`} key={i}>
                <path style={{stroke: 'grey', strokeWidth: 1}} d='M 0,-110 L 0,-115 Z' />
              </g>
            })}
            <g>
              {lines}
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}

export default App;
