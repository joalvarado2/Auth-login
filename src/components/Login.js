import React, { useCallback, useState } from "react";
import { auth, db } from "../firebase";
import { withRouter } from "react-router-dom";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(null);
  const [esRegistro, setEsRegistro] = useState(false);

  const precesarDatos = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("ingrese un email");
      return;
    }
    if (!pass.trim()) {
      setError("ingrese una contraseña");
      return;
    }
    if (pass.length < 6) {
      setError("la contraseña debe ser mayor a 6 caracteres");
      return;
    }
    setError(null);
    // console.log("pasate todas las validaciones")
    if (esRegistro) {
      registrar();
    } else {
      login();
    }
  };

  const login = useCallback(async () => {
    try {
      const res = await auth.signInWithEmailAndPassword(email, pass);
      console.log(res);
      setEmail("");
      setError(null);
      setPass("");
      props.history.push("/admin");  // props.history se saca con withRouter y se usa para empujar hacia una ruta

    } catch (error) {
      console.log(error);
      if (error.code === "auth/invalid-email") {
        setError("Email no valido");
      }
      if (error.code === "auth/user-not-found") {
        setError("Email no registrado");
      }
      if (error.code === "auth/wrong-password") {
        setError("contraseña incorrecta");
      }
    }
  }, [email, pass, props.history]);

  const registrar = useCallback(async () => {
    try {
      const res = await auth.createUserWithEmailAndPassword(email, pass);
      console.log(res.user);
      await db.collection("usuarios").doc(res.user.email).set({
        email: res.user.email,
        uid: res.user.uid,
      });

      setEmail("");
      setError(null);
      setPass("");
      props.history.push("/admin");  // props.history se saca con withRouter y se usa para empujar hacia una ruta

    } catch (error) {
      console.log(error);
      if (error.code === "auth/invalid-email") {
        setError("Email no valido");
      }
      if (error.code === "auth/email-already-in-use") {
        setError("Email ya utilizado");
      }
    }
  }, [email, pass, props.history]);

  return (
    <div className="mt-5">
      <h3 className="text-center">
        {esRegistro ? "Registro de usuarios" : "Inicia Sesion"}
      </h3>
      <hr />
      <div className="row justify-content-center">
        <div className="col-12 col-sm-8 col-md-6 col-xl-4">
          <form onSubmit={precesarDatos}>
            {error && <div className="alert alert-danger">{error}</div>}
            <input
              type="email"
              className="form-control mb-2"
              placeholder="Ingrese un email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input
              type="Password"
              className="form-control mb-2"
              placeholder="Ingrese una contraseña"
              onChange={(e) => setPass(e.target.value)}
              value={pass}
            />

            <button className="btn btn-dark btn-lg btn-block" type="submit">
              {esRegistro ? "Registrarse" : "Acceder"}
            </button>
            <button
              className="btn btn-info btn-sm btn-block"
              type="button"
              onClick={() => setEsRegistro(!esRegistro)}
            >
              {esRegistro ? "¿Ya estas registrado?" : "¿No tienes cuenta?"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);
