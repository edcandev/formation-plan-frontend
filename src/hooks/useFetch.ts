import { useEffect, useState } from "react";
import { IEMentor } from "../types";
import { getAPI_URL } from "../env/apiUrlHelper";



// const env : string = 'prod'
const ACI_URL = getAPI_URL('dev')

const useFetch = () => {

    const [mentors, setMentors] = useState<Array<IEMentor>>([])
    
    useEffect(()=> {
        
        let fetchedMentors : Array<IEMentor>;
        
        fetch(`${ACI_URL}/getMentors`)
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
  