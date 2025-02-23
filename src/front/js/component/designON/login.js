import React, { useState, useContext, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext";
import { Navigate } from "react-router-dom";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState(null);
  const formRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  // const [text, setText] = useState('');
  // const strings = ['Hola de nuevo...', 'Te veo bien...', '...es un decir...', '...verte no te veo...', '...pero estando aquí...', '...estarás bien.', ':)'];
  // let index = 0;
  // let charIndex = 0;
  // let typingSpeed = 90;
  // let backSpeed = 30;
  // let backDelay = 2500;
  // const [blink, setBlink] = useState(false);

  // useEffect(() => {
  //   const type = () => {
  //     if (charIndex < strings[index].length) {
  //       setText(prev => prev + strings[index][charIndex]);
  //       charIndex++;
  //       setTimeout(type, typingSpeed);
  //     } else {
  //       if (index === strings.length - 1) {
  //         setBlink(true);
  //         setInterval(() => {
  //           setBlink(!blink);
  //         }, 500);
  //       } else {
  //         setBlink(true);
  //         setTimeout(() => {
  //           setTimeout(() => {
  //             setBlink(false);
  //             backspace();
  //           }, backDelay);
  //         }, backSpeed);
  //       }
  //     }
  //   };

  //   const backspace = () => {
  //     if (charIndex > 0) {
  //       setText(prev => prev.slice(0, -1));
  //       charIndex--;
  //       setTimeout(backspace, backSpeed);
  //     } else {
  //       index = (index + 1) % strings.length;
  //       charIndex = 0;
  //       setTimeout(type, typingSpeed);
  //     }
  //   };

  //   type();
  // }, []);


  function sendData(e) {
    e.preventDefault();
    if (!email || !password) {
      setMessage("Por favor, rellene todos los campos");
      return;
    }
    if (password.length < 8) {
      setMessage("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    actions.loginUser(email, password).then((success) => {
      if (success) {
        localStorage.setItem("token", store.token);
        navigate("/dashboard");
        window.location.reload();
      } else {
        setTimeout(() => {
          if (!store.auth) {
            setMessage("Email y/o contraseña incorrectos");
          }
        }, 2000);
      }
    });
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendData(e);
    }
  };

  return (
    <>
      {store.auth ? <Navigate to="/dashboard" /> :
        <div className="d-flex align-items-center min-h-100 fondo-sigin">
          <main id="content" role="main" className="flex-grow-1">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-5 col-xl-4 d-none d-lg-flex justify-content-center align-items-center min-vh-lg-100 position-relative bg-dark" style={{ backgroundImage: 'url(https://htmlstream.com/preview/front-v4.3.1/assets/svg/components/wave-pattern-light.svg)', zIndex: '-1' }}>
                  <div className="flex-grow-1 p-5">
                    <figure className="text-center">

                    <blockquote className="blockquote blockquote-light fs-3 mx-4">“¿Pensaron alguna vez que si no fuera por todos, nadie sería nada? ”</blockquote>

                      <figcaption className="blockquote-footer blockquote-light">
                        <div className="mb-3 ">
                          <img className="avatar avatarSignin" src="https://i.pinimg.com/originals/39/7e/8e/397e8ec1c08498202adb949586da111f.png" alt="Image Description" />
                        </div>

                        <span className="fs-5">Mafalda</span>
                        <span className="blockquote-footer-source fs-5">Quino | Argentina</span>
                      </figcaption>
                    </figure>

                    <div className="position-absolute start-0 end-0 bottom-0 text-center p-5">
                      <div className="row justify-content-center">
                        <div className="col text-center py-3">
                          <img className="avatar avatar-lg avatar-4x3 signin4" src="https://clipart-library.com/images/dc4LABqni.png" alt="Logo" />
                        </div>

                        <div className="col text-center py-3">
                          <img className="avatar avatar-lg avatar-4x3 signin4" src="https://www.caixabank.com/deployedfiles/caixabank_com/Estaticos/Imagenes/infografias/logoCaixa.png" alt="Logo" />
                        </div>

                        <div className="col text-center py-3">
                          <img className="avatar avatar-lg avatar-4x3 signin4 iberia" src="https://www.totalisimo.com/wp-content/uploads/2023/03/iberia-logo-1.png" alt="Logo" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-7 col-xl-8 d-flex justify-content-center align-items-center min-vh-lg-100">
                  <div className="flex-grow-1 mx-auto" style={{ maxWidth: '28rem' }}>

                    <div className="text-center mb-5 mb-md-7">
                      <h1>
                        <span className="text text-highlight-warning" style={{ color: 'black' }}>
                          <span className="js-typedjs">
                            Hola de nuevo
                          </span>
                        </span>
                      </h1>
                      <h5>Me alegra que estés de vuelta</h5>
                    </div>

                    <form className="js-validate needs-validation" noValidate onSubmit={sendData} ref={formRef} onKeyDown={handleKeyDown}>
                      {message && <div className="alert alert-warning d-flex align-items-center mx-2"><i className="fa-solid fa-triangle-exclamation me-2" />{message}
                        <i type="button" className="btn-close ms-auto" style={{ fontSize: "10px" }} data-bs-dismiss="alert" aria-label="Close" onClick={() => setAlert(null)}></i></div>}
                      <div className="mb-3">
                        <label className="form-label" htmlFor="signupModalFormSignupEmail">Email</label>
                        <input type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="form-control form-control-lg"
                          name="email"
                          id="signupModalFormSignupEmail"
                          placeholder="Introduzca su email..."
                          aria-label="email@site.com"
                          required />
                        <span className="invalid-feedback">Por favor, introduzca una dirección de correo electrónico válida.</span>
                      </div>

                      <div className="mb-3">
                        <div className="d-flex justify-content-between align-items-center">
                          <label className="form-label" htmlFor="signupModalFormSignupPassword">Contraseña</label>
                          <a className="form-label-link"style={{color: '#7c488f'}} href="./forgot-password">¿Olvidaste tu contraseña?</a>
                        </div>
                        <div className="input-group input-group-merge">
                          <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="js-toggle-password form-control form-control-lg"
                            name="password"
                            id="signupModalFormSignupPassword"
                            placeholder="Contraseña..."
                            aria-label="8+ characters required"
                            required
                          />
                          <a
                            className="js-toggle-password-target-1 input-group-append input-group-text"
                            href="javascript:;"
                            onClick={() => setShowPassword(!showPassword)} // Cambia el estado al hacer clic
                          >
                            <i className={`js-toggle-passowrd-show-icon-1 bi ${showPassword ? 'bi-eye' : 'bi-eye-slash'}`}></i>
                          </a>
                        </div>
                        <span className="invalid-feedback">Su contraseña no vale. Por favor, inténtelo de nuevo.</span>
                      </div>
                      <div className="d-grid mb-3">
                        <button type="submit" className="btn btn-lg" style={{ backgroundColor: '#7c488f', color: 'white' }}>Iniciar Sesión</button>
                      </div>

                      <div className="text-center">
                      <h5 style={{ fontWeight: '400' }}>¿Es tu primera vez aquí? <Link to="/signup" style={{ color: '#7c488f' }}>Regístrate</Link></h5>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      }
    </>
  )
}