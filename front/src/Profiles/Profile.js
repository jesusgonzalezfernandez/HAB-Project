// import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import ExpertProfile from './ExpertProfile';
import UserProfile from './UserProfile'



function Profile() {

  const [data, setData] = useState()

  const login = useSelector(state => state.login)
  if(login) console.log(`*GetUserProfile* - Usuario registrado con el ID: ${login.userID}, username: ${login.username} y rol: ${login.role} `);

  // Obtener id del usuario buscado
  const { userID } = useParams()
  console.log(`Buscando el usuario con ID: ${userID}`);

  // Ejecutar fetch al cargar la página
  useEffect ( async () => {

    // Enviar consulta a la API
    const res = await fetch(

    // Dirección
    `http://localhost:3001/users/profile/${userID}`,
    // Contenido
    {
      headers: { 'Content-Type': 'application/json', auth: login.token },
      method: 'GET'
    })

    const data = await res.json();
    setData(data)

    console.log(`Resultado de la búsqueda: ${JSON.stringify(data)}`)

  }, [])

  if(!login) return  <Redirect to='/'/>

  if(!data) return 'Loading ...'
    
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

