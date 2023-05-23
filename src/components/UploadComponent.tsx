import {  ComponentResponse } from '../types'
import useFetch from '../hooks/useFetch';
import useUploadFile from '../hooks/useUploadFile';

//const ACI_URL = 'http://formationplanbackend.cgb2gegzehhzg2ak.westus.azurecontainer.io';

type Props = {
  handleChange: ( cc : ComponentResponse) => ComponentResponse
}


const UploadComponent = ( {handleChange } : Props  ) => {

  const { mentors } = useFetch();
  const { uploadFile } = useUploadFile();

  const handleSelect = ():void=> {
    const optionDisabled = document.querySelector('option');
    optionDisabled!.disabled = true;
  }

  return (
    <div className="container p-4 main-container">
      
      <label htmlFor="select-mentor">Mentor:</label>
      <select className='form-select my-3'  name="select-mentor" id="select-mentor" onClick={
        () => { handleSelect()}} >
        <option value="disabled">Seleccionar mentor</option>

        {mentors.map(mentor =>(
          <option key={mentor.fullName} value={mentor.fullName}>{mentor.fullName}</option>
        ))}
      </select>

      <input className='d-flex mb-3 w-100 align-items-center file-input form-input'  
      id="fileupload" type="file" name="fileupload" accept='.xls,.xlsx'/>
      <button className='btn btn-primary' id="upload-button" onClick={() => uploadFile({handleChange})
      }>Subir</button>
    </div>
  )
}

export default UploadComponent