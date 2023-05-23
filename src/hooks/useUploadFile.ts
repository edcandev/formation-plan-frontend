import { ComponentResponse, StudentExcelResponse } from "../types";

const ACI_URL = 'http://formationplanbackend.cgb2gegzehhzg2ak.westus.azurecontainer.io';

type Props = {
    handleChange: ( cc : ComponentResponse) => ComponentResponse
}

const useUploadFile = () => {

    async function uploadFile({handleChange } : Props) : Promise<void> {

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
      
            const urlLink = `${ACI_URL}:8080/uploadFile`;
        
            const response = await fetch(urlLink,
            {
              method: "POST", 
              body: formData // Incluye el archivo y el mentor seleccionado
            })

            switch(response.status) {
                case 200:

                    response.json()
                    .then(data => {

                    const response : StudentExcelResponse = data;
                    const componentResponse : ComponentResponse = {
                        currentComponent: 1,
                        response: response
                    }
                    handleChange(componentResponse);
                    });
                    alert('El archivo ha sido cargado');
                    break;
                case 403:
                    alert('El mentor no puede generar el plan del alumno');
                    break;
                case 400:
                    alert('El archivo es incorrecto');
                    break;
            }
          } else {
              console.log("No hay archivo");
              alert("Por favor, seleccione un archivo.");
          }
      
        } else {
          alert('Por favor, seleccione un mentor.')
        }
    }

    return {
        uploadFile
    }
}

export default useUploadFile;