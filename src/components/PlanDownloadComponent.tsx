import { getAPI_URL } from '../env/apiUrlHelper'
import { ComponentResponse, PlanGeneratorResponse } from '../types'

const env : string = 'prod'
const ACI_URL = getAPI_URL(env)

type Props = {
  planGeneratorResponse : PlanGeneratorResponse,
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

    <>
    <div className='my-5 p-3 container my-2 plan-download-component-container'>
      <h2>Se ha generado el plan de: {planGeneratorResponse.studentId}</h2>
      <p>¡Plan de formación generado con éxito!</p>
      <div className='d-flex download-component-div'>
      <a className='btn btn-primary' href={getCompleteDownloadLink()} download>Descargar plan de formación</a>
      <button className='btn btn-secondary' onClick={backToHome} >Generar otro plan de formación</button>
      </div>
    </div>
    <div className='loading-component'>
      CARGANDO...
      <img className='loading-component-perrito-asu' src="/perrito_asu.png" alt="" />
    </div>
    </>
  )
}


export default PlanDownloadComponent