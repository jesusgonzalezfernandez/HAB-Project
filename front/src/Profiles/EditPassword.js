import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

function EditPassword({ reload }) {
  const login = useSelector((state) => state.login);
  const { userID } = useParams();

  // Variables
  const [oldPassword, setOldPassword] = useState();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Errores
  const [passwordError, setPasswordError] = useState();
  const [apiError, setApiError] = useState();
  
  if (
    password.length >= 6 && confirmPassword.length >= 6 &&
    password !== confirmPassword &&
    !passwordError
  ) {
    setPasswordError("Las contraseñas no coinciden !");
  }

  if (
    password.length >= 6 && confirmPassword.length >= 6 &&
    password === confirmPassword &&
    passwordError
  ) {
    setPasswordError();
  }

  const handleSubmit = async (e) => {

    e.preventDefault();

    if(passwordError) {
      return
    }

    const reqData = {
      oldPassword,
      newPassword: password
    }

    const res = await fetch(`http://localhost:3001/users/${userID}/password`, {
      headers: { 'Content-Type': 'application/json', auth: 'Bearer ' + login.token },
      body: JSON.stringify(reqData),
      method: 'PUT'
    });

    if (!res.ok) {
      console.log("Se ha producido un error");
      res.text().then((e) => setApiError(e));
    } else {
      console.log("El perfil se ha actualizado correctamente");
      setOldPassword('');
      setPassword('');
      setConfirmPassword('');
      setApiError('')
      reload();
    }
  };

  return (
    <div className="edit-password">

      {passwordError && 
        <span>{passwordError}</span>
      }

      {apiError && 
        <span>{apiError}</span>
      }

      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Antigua contraseña..."
          value={oldPassword}
          onChange={e => setOldPassword(e.target.value)}
          minLength="3"
          required
        />
        <input
          type="password"
          placeholder="Nueva contraseña..."
          value={password}
          onChange={e => setPassword(e.target.value)}
          minLength="6"
          required
        />
        <input
          type="password"
          placeholder="Confirma tu nueva contraseña..."
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
          minLength="6"
        />
        <button>Guardar</button>
        <button onClick={() => reload()}>Cancelar</button>
      </form>
    </div>
  );
}

export default EditPassword;
