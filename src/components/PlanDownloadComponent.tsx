import { ComponentResponse, PlanGeneratorResponse } from '../types'

//const ACI_URL = 'http://formationplanbackend.cgb2gegzehhzg2ak.westus.azurecontainer.io';

const ACI_URL = 'http://localhost'

type Props = {
  planGeneratorResponse? : PlanGeneratorResponse,
  handleChange: ( cc : ComponentResponse) => ComponentResponse

}

const PlanDownloadComponent = ({planGeneratorResponse, handleChange} : Props) => {

  const backToHome = () => {
    handleChange({currentComponent:0})
  }

  const getCompleteDownloadLink = () => {
    return `${ACI_URL}:8080/downloadPlan/${planGeneratorResponse?.studentId}.zip`
  }

  return (

    <div className='p-3 container my-2 bg-success'>
      <h2>Descarga</h2>
      <p>Plan de formación generado con éxito</p>
      <a className='btn btn-primary' href={getCompleteDownloadLink()} download>Descargar plan de formación</a>
      <button className='btn btn-secondary' onClick={backToHome} >Generar otro plan de formación</button>
    </div>
  )
}


const handlePlanDownload = () => {

}

export default PlanDownloadComponent