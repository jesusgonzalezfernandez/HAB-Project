// import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';



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
    
  return (
    
    <div>
    
      <h1>Perfil de Usuario</h1>

    </div>

  );
}  

export default Profile;

