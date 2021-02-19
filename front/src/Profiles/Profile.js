// import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import Loading from '../Home/Loading';
import ExpertProfile from './ExpertProfile';
import UserProfile from './UserProfile';



function Profile() {
  const [data, setData] = useState()
  
  const login = useSelector(state => state.login)

  // Obtener id del usuario buscado
  const { userID } = useParams()
  console.log(`Buscando el usuario con ID: ${userID}`);

  // Ejecutar fetch al cargar la página
  useEffect ( () => {
    async function fetchData() {
      const res = await fetch(

        `http://localhost:3001/users/profile/${userID}`,
        {
          headers: { 'Content-Type': 'application/json', auth: login.token },
          method: 'GET'
        })
    
        const data = await res.json();
        setData(data)
    
        console.log(`Resultado del perfil del usuario: ${JSON.stringify(login)}`)
    }
    fetchData()
  }, [])

  if(!login) return  <Redirect to='/'/>

  if(!data) return <Loading />
    
  return (
    
    <div>
      
      
      {login.role === 'admin' && <div> 

        <ExpertProfile data={data}/>

      </div>}

      {login.role === 'student' && <div>
        
        <UserProfile data={data}/>

      </div>
      
      }
    
    </div>

  );
}  

export default Profile;

