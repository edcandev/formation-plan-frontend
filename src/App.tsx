import HeaderComponent from './components/HeaderComponent';
import UploadComponent from './components/UploadComponent';
import PlanPreviewComponent from './components/PlanPreviewComponent';
import { useState } from 'react';
import PlanDownloadComponent from './components/PlanDownloadComponent';

import HandlerFuction, { UploadComponentResponse } from './types';


function App() {

  const [currentComponent, setCurrentComponent] = useState<UploadComponentResponse>({ currentComponent: 0 });

  const handleCurrentComponentChange = (cc : UploadComponentResponse) : UploadComponentResponse => {
    setCurrentComponent(cc);
    return cc;
  }



  const renderCurrentState = () : JSX.Element | void =>  {

    switch(currentComponent.currentComponent) {
      case 1:
        return( <PlanPreviewComponent studentExcelData={currentComponent.response}/>)
        break;
      case 2:
        return(
          <>
            <PlanPreviewComponent/>
            <PlanDownloadComponent/>
          </>
        )
        break;
    }
  }

  return (
    <>
      <HeaderComponent />
      <UploadComponent handleChange={handleCurrentComponentChange}/>
      {
        renderCurrentState()
      }
    </>
  )
}

export default App

/*
return (
    <div className='main-container container p-5'> 
      <h1 className='main-container-h1'>Generador de Planes de Formación</h1>

      <form  onSubmit={handleFileUpload} className='my-3' action="">
        <label className='my-2'htmlFor="">Adjuntar aquí la cédula del alumno</label>
        <br />
        <input onClick={ (e) => handleFileUpload} className='my-2 form-input' type="file" accept='.xls,.xlsx' name="" id="" />
        <input className='form-submit' type="submit" value="Enviar"/>
      </form>
        <a href="" download='archivo'>Click aquí para descargar una cédula de ejemplo</a>
    </div>
  )
*/
