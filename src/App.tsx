import HeaderComponent from './components/HeaderComponent';
import UploadComponent from './components/UploadComponent';
import PlanPreviewComponent from './components/PlanGeneratorComponent';
import ProgressComponent from './components/ProgressComponent';
import { useEffect, useState } from 'react';
import PlanDownloadComponent from './components/PlanDownloadComponent';

import { StudentExcelResponse, ComponentResponse, PlanGeneratorResponse } from './types';


function App() {

  const [currentComponent, setCurrentComponent] = useState<ComponentResponse>({ currentComponent: 0 });

  const handlePlanPreviewRender = (cc : ComponentResponse) : ComponentResponse => {
    setCurrentComponent(cc);
    return cc;
  }

  const renderCurrentState = () : JSX.Element | void =>  {

    switch(currentComponent.currentComponent) {


      case 0:
        return(
          <>
            <ProgressComponent
              currentComponent={currentComponent}
            />
            <UploadComponent handleChange={handlePlanPreviewRender}/>
          </>
        )

      case 1:
        return(
          <>
            <ProgressComponent
              currentComponent={currentComponent}
            />
            <PlanPreviewComponent studentExcelData={currentComponent.response as StudentExcelResponse} handleChange={handlePlanPreviewRender}/>
          </>)
      case 2:
        return(
          <>
            <ProgressComponent
              currentComponent={currentComponent}
            />
            <PlanDownloadComponent planGeneratorResponse={currentComponent.response as PlanGeneratorResponse} handleChange={handlePlanPreviewRender}/>
          </>
        )
    }
  }

  return (
    <>
      <HeaderComponent />
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
