import { useEffect, useState } from 'react'
import { ComponentResponse } from '../types';

type Props = {
  currentComponent: ComponentResponse
}


const ProgressComponent = ( { currentComponent }: Props) => {

  const [text, setText] = useState<string>('');

  const [progressColor, setProgressColor] = useState(
    {
      stepOne: false,
      stepTwo: false,
      stepThree: false,
    }
  );

  useEffect(() => {
    switch(currentComponent.currentComponent) {
      case 0:
        setText('Cargar archivo');
        setProgressColor({
          stepOne: true,
          stepTwo: false,
          stepThree: false,
        })

        break;
      case 1:
        setProgressColor({
          stepOne: true,
          stepTwo: true,
          stepThree: false,
        })
        setText('Generar plan de formación');
        break;
      case 2:
        setProgressColor({
          stepOne: true,
          stepTwo: true,
          stepThree: true,
        })
        setText('Descargar plan de formación');
        break;
    }

  })
  

  const mainContainerStyle = {
    backgroundColor: '#777'
  }

  const stepCircleStyle = {
    backgroundColor: '#333',
    color:'#FFF',
    fontSize: '1.3em'
  }

  return (
    <div style={mainContainerStyle}>
      <div className='container py-4 d-flex justify-content-around'>
        <div
          style={stepCircleStyle}
          className={progressColor.stepOne ? 'p-4 rounded-5 px-5 bg-primary' : 'p-4 rounded-5 px-5'}>
          1
        </div>

        <div
          style={stepCircleStyle}
          className={progressColor.stepTwo ? 'p-4 rounded-5 px-5 bg-primary' : 'p-4 rounded-5 px-5'}>
          2
        </div>

        <div
          style={stepCircleStyle}
          className={progressColor.stepThree ? 'p-4 rounded-5 px-5 bg-primary' : 'p-4 rounded-5 px-5'}>
          3
        </div>

      </div>
      <h2 className='container text-center pb-4'>{text}</h2>
    </div>
    
  )
}


export default ProgressComponent
