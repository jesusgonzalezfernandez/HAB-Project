

function ExpertProfile( {data} ) {

    
  return (
    
    <div>
    
      <h1>Perfil de Usuario</h1>
      <h2>Usuario</h2>
      {data.username}
      <button onClick={() => console.log('Era broma, no se puede editar aun')}>Editar Perfil</button>
    </div>

  );
}  

export default ExpertProfile;

