import Swal from "sweetalert2";
import { getAPI_URL } from "../env/apiUrlHelper";
import { ComponentResponse, StudentExcelResponse } from "../types";

//const ACI_URL = 'http://formationplanbackend.cgb2gegzehhzg2ak.westus.azurecontainer.io';
// const env : string = 'prod'
const ACI_URL = getAPI_URL('dev')

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
      
            const urlLink = `${ACI_URL}/uploadFile`;
        
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

                    Swal.fire(
                        {
                            title: 'Archivo Cargado',
                            text: '¡El archivo ha sido cargado exitosamente!',
                            icon: 'success',
                            confirmButtonColor:'#198754',
                    });

                    //alert('El archivo ha sido cargado');



                    break;
                case 403:
                    //alert('El mentor no puede generar el plan del alumno');

                    Swal.fire(
                        {
                            title: 'Error!',
                            text: 'El mentor no puede generar el plan para el alumno.',
                            icon: 'error',
                            confirmButtonColor:'#FF0000'
                    });
                    break;

                case 400:
                    //alert('El archivo es incorrecto');
                    Swal.fire(
                        {
                            title: 'Error!',
                            text: 'Se encontró un error en la cédula.',
                            icon: 'error',
                            confirmButtonColor:'#FF0000'
                    });
                    break;

            }
          } else {
            
            Swal.fire(
                {
                    title: 'Error!',
                    text: 'Por favor, seleccione un archivo.',
                    icon: 'error',
                    confirmButtonColor:'#FF0000'
            });
          }
      
        } else {
            Swal.fire(
            {
                title: 'Error!',
                text: 'Por favor, seleccione un mentor.',
                icon: 'error',
                confirmButtonColor:'#FF0000'
            });
        }
    }

    return {
        uploadFile
    }
}

export default useUploadFile;