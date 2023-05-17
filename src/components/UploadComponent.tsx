import React from 'react'
import { StudentExcelResponse, UploadComponentResponse } from '../types'


type Props = {
  handleChange: ( cc : UploadComponentResponse) => UploadComponentResponse
}



async function uploadFile({handleChange} : Props) : Promise<void> {

  const fileupload = document.querySelector<HTMLInputElement>('#fileupload');

  const mentorSelectElement = document.querySelector<HTMLSelectElement>('#select-mentor');
   // console.log(mentorSelectElement!.value);

  let selectedFile;
  // console.log(fileupload?.files);

  if(mentorSelectElement?.value != 'disabled') {

    if(fileupload?.files?.length != 0 && fileupload?.files != null) {
      selectedFile = fileupload.files[0]
      const formData : FormData = new FormData(); 
      formData.append("file", selectedFile);
      formData.append('mentor',mentorSelectElement!.value);
  
      const response = await fetch('http://localhost:8080/uploadFile',
      {
        method: "POST", 
        body: formData // Incluye el archivo y el mentor seleccionado
      })
      
      if (response.status == 200) {
        response.json()
          .then(data => {
            const response : StudentExcelResponse = data;

            const componentResponse : UploadComponentResponse = {
              currentComponent: 1,
              response: response
            }

            handleChange(componentResponse);

          });
        alert("El archivo ha sido cargado");
      }
    } else {
        console.log("No hay archivo");
        alert("Por favor, seleccione un archivo.");
    }

  } else {
    alert('Por favor, seleccione un mentor.')
  }
}

const handleSelect = ():void=> {
  const optionDisabled = document.querySelector('option');
  optionDisabled!.disabled = true;
}

const UploadComponent = ( {handleChange} : Props  ) => {

  return (
    <div className="container p-4 main-container">
      
      <label htmlFor="select-mentor">Mentor:</label>
      <select name="select-mentor" id="select-mentor" onClick={
        (e) => {
          handleSelect(e)
        }} >
        <option value="disabled">Seleccionar mentor</option>
        <option value="mentor-1">Mentor 1</option>
        <option value="mentor-2">Mentor 2</option>
      </select>

      <input className='d-flex mb-3 w-100 align-items-center file-input'  
      id="fileupload" type="file" name="fileupload" accept='.xls,.xlsx'/>
      <button id="upload-button" onClick={() => uploadFile({handleChange})
      }> Subir </button>
    </div>
  )
}


export default UploadComponent