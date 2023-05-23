import { PlanGenerationRequestBody, StudentExcelResponse, ComponentResponse, PlanGeneratorResponse } from '../types'

// const ACI_URL = 'http://formationplanbackend.cgb2gegzehhzg2ak.westus.azurecontainer.io';

const ACI_URL = 'http://localhost'

type Props = {
    studentExcelData? : StudentExcelResponse,
    handleChange: ( cc : ComponentResponse) => ComponentResponse
}

const PlanPreviewComponent = ({studentExcelData, handleChange} : Props) => {


  return (
    <div className='mx-4'>
        <h2>Asignaturas Registradas:</h2>
        <p><strong>Alumno:</strong> {studentExcelData?.firstSurname}{' '}{studentExcelData?.lastSurname} {studentExcelData?.name}</p>
        <p><strong>Matrícula:</strong> {studentExcelData?.studentId}</p>

        <table className='table table-hover'>
            <thead className=''>
                <tr >
                    <th className='col-2'>Clave de materia</th>
                    <th className='text-center'>Nombre de materia</th>
                    <th>Periodo</th>
                    <th>Parciales</th>
                    <th>Válida</th>
                </tr>
            </thead>
            <tbody>
                {
                    studentExcelData?.subjectList.map((subject)=>{
                        return(
                        <tr key={subject.subjectId} className={subject.valid ? 'bg-success' : 'bg-danger'}>
                            <td className='col-2'>{subject.subjectId}</td>
                            <td>{subject.subjectName}</td>
                            <td>{subject.period}</td>
                            <td>{subject.partial}</td>
                            <td>{subject.valid ? 'Sí' : 'No'}</td>
                        </tr>   
                        )
                    })
                }
                
            </tbody>
        </table>
        <form onSubmit={e => handlePlanGeneration(e, studentExcelData!, handleChange)}>
            <label htmlFor="generation-date-input">Fecha de creación del plan de formación:</label>
            <input required type="date" className='generation-date-input' name='generation-date-input'/>
            <label htmlFor="period-input">Periodo:</label>
            <input required type="text" name="period-input" className="period-input"/>
            <input type="submit" value="Generar plan de formación" />
        </form>
    </div>
    )
}

const handlePlanGeneration = async (ev : React.FormEvent<HTMLFormElement>, studentExcelData: StudentExcelResponse, handleChange : ( cc : ComponentResponse) => ComponentResponse ) => {
    ev.preventDefault();
    // Petición de tipo  GET

    const generationDateInput : HTMLInputElement = document.querySelector('.generation-date-input')!;
    const periodInput : HTMLInputElement = document.querySelector('.period-input')!;

    // console.log(generationDateInput.value);

    if(! studentExcelData.subjectList.every( subject => subject.valid)) {
        alert('La cédula no es válida')
        return;
    }

    const reqBody : PlanGenerationRequestBody = {
        studentId : studentExcelData.studentId,
        studentFileName : studentExcelData.fileName,
        generationDateString: formatDate(generationDateInput.value),
        period: periodInput.value
    }

    /*  Handle await component*/
    alert('Generando plan de formación...')

    const response = await fetch(  `${ACI_URL}:8080/generatePlan`,
    {
        method: 'POST',
        body: JSON.stringify(reqBody),
        headers: {
            'Content-Type': 'application/json'
        }
        
    });

    let responseData : PlanGeneratorResponse;
    response.json().then(data => {
        responseData = data;

        const planGeneratorResponse : PlanGeneratorResponse = {
            wasGenerated: responseData.wasGenerated,
            fileName: studentExcelData.fileName,
            studentId: studentExcelData.studentId
        }
        
        console.log(planGeneratorResponse);

        if(! planGeneratorResponse.wasGenerated) {
            alert('PLan no generado, erro en la cédula')
            return;
        }
        
        handleChange({
            currentComponent: 2,
            response: planGeneratorResponse
        })

    });


    
}

const formatDate = ( localeDate : string ) : string => {
    const splitedDate : Array<string> = localeDate.split('-');
    splitedDate.reverse();
    return splitedDate.join('/')
}

export default PlanPreviewComponent
