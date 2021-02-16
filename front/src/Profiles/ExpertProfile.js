import Moment from 'react-moment';



function ExpertProfile({ data }) {

  return (

    <div>

      <h1>Perfil de Usuario</h1>
      <h2>Admin</h2>
      {data.username}
      <Moment format='YYYY/MM/DD'>
        {data.birthDate}
      </Moment>
    </div>

  );
}

export default ExpertProfile;

