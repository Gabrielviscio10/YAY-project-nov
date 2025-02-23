import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export const Footer = ({ token }) => {

	const location = useLocation();

	const isSignin = location.pathname === "/login" || 
	location.pathname === "/signup" || 
	location.pathname === "/partners-login" || 
	location.pathname === "/partners-signup" || 
	location.pathname === "/forgot-password" || 
	location.pathname === "/logout";

	const notSignin = location.pathname === "/" || 
	location.pathname === "/sobre-nosotros"; 

	if (isSignin) {
		return null;
	}


	if (notSignin) {
		return (
			<footer className="bg-dark mt-5">
				<div className="container pb-1 pb-lg-5">
					<div className="row content-space-t-2">
						<div className="col-lg-3 mb-7 mb-lg-0">
							{/* Logo */}
							<div className="mb-5">
								<a className="navbar-brand" href="/" aria-label="Space">
									<img className="navbar-brand-logo" src= "https://i.ibb.co/9ZXQWRY/logoYAY.png" alt="Image Description" />
								</a>
							</div>
							{/* End Logo */}

							{/* List */}
							<ul className="list-unstyled list-py-1">
								<li><a className="link-sm link-light" ><i className="fa-solid fa-location-dot"></i> Passeig de Gràcia, 104 - 08007, Barcelona</a></li>
								<li><a className="link-sm link-light" ><i className="fa-solid fa-mobile-screen"></i> (+34) 777 888 999</a></li>
								<li><a className="link-sm link-light" ><i className="fa-solid fa-envelope"></i> info@yay.com</a></li>
							</ul>
							{/* End List */}
						</div>
						{/* End Col */}

						<div className="col-sm mb-7 mb-sm-0">
							<h5 className="text-white mb-3">Compañia</h5>
							{/* List */}
							<ul className="list-unstyled list-py-1 mb-0">
								<li><a className="link-sm link-light" href="/sobre-nosotros">Sobre nosotros</a></li>
								<li><a className="link-sm link-light" href="#">Empleos <span className="badge text-white rounded-pill ms-1" style={{backgroundColor: '#7c488f'}}>Proceso abierto</span></a></li>
								<li><a className="link-sm link-light" href="#">Noticias</a></li>
								<li><a className="link-sm link-light" href="#">Reseñas<i className="bi-box-arrow-up-right small ms-1"></i></a></li>
								<li><a className="link-sm link-light" href="/#land-contacto">Publicítate</a></li>
							</ul>
						</div>

						<div className="col-sm mb-7 mb-sm-0">
							<h5 className="text-white mb-3">Usuarios</h5>
							<ul className="list-unstyled list-py-1 mb-0">
								<li><a className="link-sm link-light" href="/signup">Regístrate <i className="bi-box-arrow-up-right small ms-1"></i></a></li>
								<li><a className="link-sm link-light" href="/login">Inicio sesión</a></li>
								<li><a className="link-sm link-light" href="/#land-eventos">Eventos</a></li>
								<li><a className="link-sm link-light" href="/login">Perfil</a></li>
							</ul>
						</div>

						<div className="col-sm mb-7 mb-sm-0">
							<h5 className="text-white mb-3">Partner</h5>
							<ul className="list-unstyled list-py-1 mb-0">
								<li><a className="link-sm link-light" href="/partners-signup">Registro</a></li>
								<li><a className="link-sm link-light" href="/partners-login">Inicio sesión</a></li>
								<li><a className="link-sm link-light" href="#">Estado</a></li>
								<li><a className="link-sm link-light" href="#">Inscripciones</a></li>
								<li><a className="link-sm link-light" href="/#land-eventos">Eventos</a></li>
							</ul>
						</div>


						<div className="col-sm">
							<h5 className="text-white mb-3">Resources</h5>
							<ul className="list-unstyled list-py-1 mb-5">
								<li><a className="link-sm link-light" href="/#land-contacto"><i className="bi-question-circle-fill me-1"></i> Ayuda</a></li>
								<li><a className="link-sm link-light" href="/login"><i className="bi-person-circle me-1"></i> Tu cuenta</a></li>
							</ul>
						</div>
					</div>

					<div className="border-top border-white-10 my-7"></div>

					<div className="row mb-7">
						<div className="col-sm mb-3 mb-sm-0">
							{/* Socials */}
							<ul className="list-inline list-separator list-separator-light mb-0">
								<li className="list-inline-item">
									<a className="link-sm link-light" href="https://policies.google.com/privacy?hl=en-US" target="_blank">Política de Privacidad</a>
								</li>
								<li className="list-inline-item">
									<a className="link-sm link-light" href="https://policies.google.com/terms?hl=es" target="_blank">Términos y condiciones de uso</a>
								</li>
								<li className="list-inline-item">
									<a className="link-sm link-light" href="/">Sitio Web</a>
								</li>
							</ul>
							{/* End Socials */}
						</div>

						<div className="col-sm-auto">
							{/* Socials */}
							<ul className="list-inline mb-0">
								<li className="list-inline-item">
									<a className="btn btn-soft-light btn-xs btn-icon" href="https://es.linkedin.com/school/4geeksacademyes/" target="_blank">
										<i className="bi-linkedin text-white"></i>
									</a>
								</li>

								<li className="list-inline-item">
									<a className="btn btn-soft-light btn-xs btn-icon" href="https://4geeksacademy.com/es/premios?lang=es" target="_blank">
										<i className="bi-google text-white"></i>
									</a>
								</li>

								<li className="list-inline-item">
									<a className="btn btn-soft-light btn-xs btn-icon" href="https://www.instagram.com/4geeksacademyes/?hl=es" target="_blank">
										<i className="bi-instagram text-white"></i>
									</a>
								</li>

								<li className="list-inline-item">
									<a className="btn btn-soft-light btn-xs btn-icon" href="https://github.com/4geeksacademy" target="_blank">
										<i className="bi-github text-white"></i>
									</a>
								</li>

								<li className="list-inline-item">
									{/* Button Group */}
									<div className="btn-group">
										<button type="button" className="btn btn-soft-light btn-xs dropdown-toggle" id="footerSelectLanguage" data-bs-toggle="dropdown" aria-expanded="false">
											<span className="d-flex align-items-center">
												<img className="avatar avatar-xss avatar-circle me-2" src="https://cdn-icons-png.flaticon.com/512/323/323365.png" alt="Image description" width="16" />
												<span>Español (SP)</span>
											</span>
										</button>

										<div className="dropdown-menu" aria-labelledby="footerSelectLanguage">
											<a className="dropdown-item d-flex align-items-center" href="#">
												<img className="avatar avatar-xss avatar-circle me-2" src="https://cdn-icons-png.flaticon.com/512/323/323365.png" alt="Image description" width="16" />
												<span>Español (SP)</span>
											</a>
											<a className="dropdown-item d-flex align-items-center disable" href="#">
												<img className="avatar avatar-xss avatar-circle me-2" src="https://images.vexels.com/content/163966/preview/england-flag-language-icon-circle-f39acf.png" alt="Image description" width="16" />
												<span>English (US)</span>
											</a>
										</div>
									</div>
									{/* End Button Group */}
								</li>
							</ul>
							{/* End Socials */}
						</div>
					</div>

					{/* Copyright */}
					<div className="w-md-85 text-lg-center mx-lg-auto">
						<p className="text-white-50 small">©2024-Yay.Todos los derechos reservados.</p>
						<p className="text-white-50 small">Si has llegado hasta aquí, y te ha gustado lo que has visto, no dudes en ponerte en contacto con nosotros. <br /> Estamos disponibles para incorporación inmediata y entusiasmados por empezar a ser profesionales en este sector.</p>
					</div>
					{/* End Copyright */}
				</div>
			</footer>
		);

	} else {
		return (
			<footer className="bg-dark mt-5 small-footer d-flex align-item-center justify-content-between fixed-bottom px-5">
				<div className="container mb-0 mt-1">
					<a className="go-to-top text-white small  mt-2 mb-0" href="#">Volver arriba</a>
				</div>

				<div className="container ">
					<p className="text-white-50 small mt-2 mb-0">©2024 - <b>YAY</b>   |   Todos los derechos reservados</p>
				</div>
				<div className="list-inline d-flex align-item-center">
					<li className="list-inline-item">
						<a className="btn btn-soft-light btn-xs btn-icon" href="https://es.linkedin.com/school/4geeksacademyes/" target="_blank">
							<i className="bi-linkedin text-white"></i>
						</a>
					</li>

					<li className="list-inline-item">
						<a className="btn btn-soft-light btn-xs btn-icon" href="https://4geeksacademy.com/es/premios?lang=es" target="_blank">
							<i className="bi-google text-white"></i>
						</a>
					</li>

					<li className="list-inline-item">
						<a className="btn btn-soft-light btn-xs btn-icon" href="https://www.instagram.com/4geeksacademyes/?hl=es" target="_blank">
							<i className="bi-instagram text-white"></i>
						</a>
					</li>

					<li className="list-inline-item">
						<a className="btn btn-soft-light btn-xs btn-icon" href="https://github.com/4geeksacademy" target="_blank">
							<i className="bi-github text-white"></i>
						</a>
					</li></div>
			</footer>

		);
	};
};