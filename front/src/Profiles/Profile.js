// import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';



function Profile() {

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
    console.log(`Resultado de la búsqueda: ${JSON.stringify(data)}`)

  }, [])

  if(!login) return  <Redirect to='/'/>
    
  return (
    
    <div>
    
      <h1>Perfil de Usuario</h1>

      {login.role === 'admin' && <div> 

        <h1>Eres admin, tienes acceso</h1>

      </div>}

      {login.role === 'student' && <div>
        
        <h1>Eres un bastardo</h1>
        </div>
      }

    </div>

  );
}  

export default Profile;

