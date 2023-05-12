import { StudentExcelResponse } from '../types'

type Props = {
    studentExcelData? : StudentExcelResponse
}

const PlanPreviewComponent = ({studentExcelData} : Props) => {

  return (
    <>
        <h2>Asignaturas Registradas:</h2>
        <p><strong>Alumno:</strong> {studentExcelData?.firstSurname} {studentExcelData?.lastSurname} {studentExcelData?.name}</p>
        <p><strong>Matrícula:</strong> {studentExcelData?.studentId}</p>
        
        <table>
            <thead>
                <tr>
                    <th>Clave de materia</th>
                    <th>Periodo</th>
                    <th>Parciales</th>
                </tr>
            </thead>
            <tbody>
                {
                    studentExcelData?.subjectList.map((subject)=>{
                        return(
                        <tr key={subject.subjectId}>
                            <td>{subject.subjectId}</td>
                            <td>{subject.period}</td>
                            <td>{subject.partial}</td>
                        </tr>   
                        )
                    })
                }
                
            </tbody>
        </table>
        <button>Generar plan de formación</button>
    </>
  )
}

export default PlanPreviewComponent
