import { useEffect, useState } from "react";
import { IEMentor } from "../types";

const useFetch = () => {

    const [mentors, setMentors] = useState<Array<IEMentor>>([])
    
    useEffect(()=> {
        
        let fetchedMentors : Array<IEMentor>;
        
        fetch('http://localhost:8080/getMentors')
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
  