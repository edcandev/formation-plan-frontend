import { useEffect, useState } from "react";
import { IEMentor } from "../types";
import { getAPI_URL } from "../env/apiUrlHelper";


//const ACI_URL = 'http://formationplanbackend.cgb2gegzehhzg2ak.westus.azurecontainer.io';

const env : string = 'prod'
const ACI_URL = getAPI_URL(env)

const useFetch = () => {

    const [mentors, setMentors] = useState<Array<IEMentor>>([])
    
    useEffect(()=> {
        
        let fetchedMentors : Array<IEMentor>;
        
        fetch(`${ACI_URL}:8080/getMentors`)
        .then(data => data.json())
        .then(json => {
            fetchedMentors = json;
            setMentors(fetchedMentors);
        })
        .catch(err => console.log(err))
    },[]);
    
    return {
        mentors
    }
}

export default useFetch;
  