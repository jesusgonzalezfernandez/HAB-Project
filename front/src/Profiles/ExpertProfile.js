import Moment from 'react-moment';
import avatarPic from '../imagenes/avatar-experto.png';
import { useEffect, useState } from 'react';




function ExpertProfile({ data }) {
  // const [question, setQuestion] = useState()
  
  // useEffect(() => {
  //   async function fetchData() {
  //     const res = await fetch(

  //       `http://localhost:3001/users/profile/${userID}`,
  //       {
  //         headers: { 'Content-Type': 'application/json', auth: login.token },
  //         method: 'GET'
  //       })

  //     const data = await res.json();
  //     setData(data)

  //     console.log(`Resultado de la búsqueda: ${JSON.stringify(data)}`)
  //   }
  //   fetchData()
  // }, [])

  if (!data) return 'Loading...'


  return (

    <div>
      <h2>Admin</h2>
      <aside className='expert-profile'>
        <img src={avatarPic} alt="avatar-expert" />
        <h3>{data.name} {data.surname}</h3>
        <h4>{data.username}</h4>

        <Moment format='DD/MM/YYYY'>
          {data.birthDate}
        </Moment>
      </aside>
      <div className='panel'>

      </div>

    </div>

  );
}

export default ExpertProfile;

