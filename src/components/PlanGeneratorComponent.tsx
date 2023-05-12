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
        <form onSubmit={e => handlePlanGeneration(e, studentExcelData!)}>
            <input type="date"/>

            <input type="submit" value="Generar plan de formación" />

        </form>
    </>
  )
}

const handlePlanGeneration = async (ev : React.FormEvent<HTMLFormElement>, studentExcelData: StudentExcelResponse) => {
    ev.preventDefault();
    console.log('get...')

    // Petición de tipo  GET

    const reqBody = {
        //studentId : studentExcelData.studentId,
        //studentFileName : studentExcelData.fileName
    }
    
    console.log();


    const response = await fetch('http://localhost:8080/generatePlan',
    {
        method: 'POST',
        body: JSON.stringify(reqBody),
        headers: {
            'Content-Type': 'application/json'
        }
        
    })      

    console.log(response);

}

export default PlanPreviewComponent
