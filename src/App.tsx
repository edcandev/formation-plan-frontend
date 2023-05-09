import { useState } from 'react'
import { MouseEvent, FormEvent } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './custom-styles.css'


function App() {

  const [inputAnswered, setInputAnswered] = useState<boolean>(false);

  const handleFileUpload = (ev: FormEvent<HTMLFormElement>) : void=> {
    ev.preventDefault();
    console.log("se ha enviado..");
  }

  return (
    <div className='main-container container p-5'> 
      <h1 className='main-container-h1'>Generador de Planes de Formación</h1>

      <form onSubmit={handleFileUpload} className='my-3' action="">
        <label className='my-2'htmlFor="">Adjuntar aquí la cédula del alumno</label>
        <br />
        <input onClick={ (e) => handleFileUpload} className='my-2 form-input' type="file" accept='.xls,.xlsx' name="" id="" />
        <input className='form-submit' type="submit" value="Enviar"/>
      </form>
        <a href="" download='archivo'>Click aquí para descargar una cédula de ejemplo</a>
    </div>
  )
}

export default App
