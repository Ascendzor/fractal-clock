import React, {useState, useEffect} from 'react';
import './App.css';
import { original } from 'immer';

const App = props => {

  const [timeyWimeys, setTimeyWimeys] = useState([0, 0, 0]) //[hours, minutes, seconds]
  const [angleShmangles, setAngleShmangles] = useState([0, 0, 0]) //[hourAngle, minuteAngle, secondAngle]
  const [lines, setLines] = useState(<g />)

  useEffect(() => {
    const now = new Date()
    const originalMilliseconds = now.getMilliseconds()
    const originalPerformanceTime = performance.now()
    const be = () => {
      
      const milliseconds = originalMilliseconds + originalPerformanceTime + performance.now()
      const seconds = now.getSeconds() + (milliseconds/1000)
      const minutes = now.getMinutes() + (seconds / 60)
      const secondAngle = 360 * seconds / 60
      const minuteAngle = 360 * minutes / 60

      const lineLength = 75
      const lineStyle = {strokeWidth: .2, stroke: '#E9E9EC'}
      const fractate = (minuteAngle, secondAngle, iteration, length) => {
        if(iteration == 10) return
        return <g>
          <g transform={`rotate(${minuteAngle})`}>
            <path style={lineStyle} d={`M 0,0 L 0,${-length} Z`} />
            <g transform={`translate(0,${-length})`}>
              {fractate(minuteAngle, secondAngle, iteration+1, length*0.7)}
            </g>
          </g>
          <g transform={`rotate(${secondAngle})`}>
            <path style={lineStyle} d={`M 0,0 L 0,${-length} Z`} />
            <g transform={`translate(0, ${-length})`}>
              {fractate(minuteAngle, secondAngle, iteration+1, length*0.7)}
            </g>
          </g>
        </g>
      }

      const lines = fractate(minuteAngle, secondAngle, 1, 75)
      // console.log(lines)
      setLines(lines)

      requestAnimationFrame(be)
    }
    be(performance.now())
  }, [])
  
  
  return (
    <div className="App">
      <div style={{marginLeft: 'auto', marginRight: 'auto', height: '100%', width: '100%', position: 'absolute'}}>
        <svg width='600' height='600' viewBox="0 0 600 600">
          <g transform='translate(300, 300)' style={{stroke: `#E9E9EC`, fill: `#E9E9EC`}}>
            {/* <path style={{stroke: 'red', strokeWidth: 3}} d='M 0,-100 L 0,-120 Z' /> */}
            {[...Array(12)].map((nothing, i) => {
              const rotationFraction = i/12
              const rotationInDegrees = 360 * rotationFraction
              return <g transform={`rotate(${rotationInDegrees})`} key={i}>
                <path style={{strokeWidth: 2}} d='M 0,-100 L 0,-115 Z' />
                <text transform={`translate(0,-85) rotate(-${rotationInDegrees})`} dominantBaseline="middle" textAnchor="middle">{i || 12}</text>
              </g>
            })}
            {[...Array(60)].map((nothing, i) => {
              const rotationFraction = i/60
              const rotationInDegrees = 360 * rotationFraction
              return <g transform={`rotate(${rotationInDegrees})`} key={i}>
                <path style={{strokeWidth: 1}} d='M 0,-110 L 0,-115 Z' />
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
