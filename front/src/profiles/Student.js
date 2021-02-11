// import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import useFetch from '../useFetch'

function Student() {
    const { id } = useParams()
    // const login = useSelector(l => l.login)
    // const dispatch = useDispatch()  
    const data = useFetch(`http://localhost:9999/users/profile/2`) || [] 
    console.log(data)
      return (
        <div>
            {data.map(s => s.email)}

        </div>
      );
    }
    

export default Student
