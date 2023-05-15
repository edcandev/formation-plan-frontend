import { PlanGenerationRequestBody, StudentExcelResponse } from '../types'

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
            <label htmlFor="generation-date-input">Fecha de creación del plan de formación:</label>
            <input required type="date" className='generation-date-input' name='generation-date-input'/>
            <label htmlFor="period-input">Periodo:</label>
            <input required type="text" name="period-input" className="period-input"/>
            <input type="submit" value="Generar plan de formación" />

        </form>
    </>
  )
}

const handlePlanGeneration = async (ev : React.FormEvent<HTMLFormElement>, studentExcelData: StudentExcelResponse) => {
    ev.preventDefault();
    // Petición de tipo  GET

    const generationDateInput : HTMLInputElement = document.querySelector('.generation-date-input')!;
    const periodInput : HTMLInputElement = document.querySelector('.period-input')!;

    // console.log(generationDateInput.value);

    if(generationDateInput.value == '' || generationDateInput.value == undefined) {
        alert('Ingresar una fecha...')
        return;
    }
    if(periodInput.value == '' || periodInput.value == undefined) {
        alert('Ingresar el periodo...')
        return;
    }

    //let date = new Date(generationDateInput.value).toLocaleDateString('en-GB');
    //const dateArr = date.split('/')

    //const date = new Date(generationDateInput.value)
    
    //console.log(generationDateInput.value);
    
    //console.log(date.getUTCDate());

    //console.log(date);
    

    const reqBody : PlanGenerationRequestBody = {
        studentId : studentExcelData.studentId,
        studentFileName : studentExcelData.fileName,
        generationDateString: formatDate(generationDateInput.value),
        period: periodInput.value
    }
    console.log(reqBody);


    const response = await fetch('http://localhost:8080/generatePlan',
    {
        method: 'POST',
        body: JSON.stringify(reqBody),
        headers: {
            'Content-Type': 'application/json'
        }
        
    })
    response.json().then(data => console.log(data))

}

const formatDate = ( localeDate : string ) : string => {
    const splitedDate : Array<string> = localeDate.split('-');
    splitedDate.reverse();
    return splitedDate.join('/')
}

export default PlanPreviewComponent
