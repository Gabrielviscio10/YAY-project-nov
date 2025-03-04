import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Context } from '../store/appContext';
import { Mapa } from './mapa';

export const Evento_Form_Editar = () => {
    const { store, actions } = useContext(Context);
    const [nuevoEvento, setNuevoEvento] = useState({
        nombre: '',
        fecha: '',
        hora_inicio: '',
        hora_fin: '',
        direccion: '',
        breve_descripcion: '',
        accesibilidad: false,
        dificultad: '',
        precio: '',
        cupo: '',
        observaciones: '',
        interes_id: '',
        latitud: null,
        longitud: null
    });
    const [direccion, setDireccion] = useState("");
    const [alert, setAlert] = useState(null);
    const navigate = useNavigate();
    const { theid } = useParams();

    useEffect(() => {
        actions.getInteres();
        // Cargar el evento si el ID está presente
        if (theid) {
            const evento = store.eventos.find(evento => evento.id === parseInt(theid));
            if (evento) {

                const fechaParts = evento.fecha.split(' '); // Suponiendo que la fecha está en formato "DD de Mes de YYYY"
                const dia = fechaParts[0];
                const mes = new Date(Date.parse(fechaParts[2] + " " + fechaParts[1] + " 1")).getMonth() + 1; // Convertir el mes a número
                const anio = fechaParts[4];
                const formattedDate = `${anio}-${mes < 10 ? '0' + mes : mes}-${dia < 10 ? '0' + dia : dia}`; // Formato 'YYYY-MM-DD'

                setNuevoEvento({
                    ...evento,
                    fecha: formattedDate, // Asignar la fecha formateada
                    hora_inicio: evento.horario.split(' - ')[0],
                    hora_fin: evento.horario.split(' - ')[1]
                });
                setTimeout(() => {
                    setDireccion(evento.direccion);
                    setMapaLoaded(true);
                }, 500);
            }
        }
    }, [theid, store.eventos]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const { nombre, fecha, hora_inicio, hora_fin, direccion, latitud, longitud, breve_descripcion, dificultad, precio, cupo, observaciones, interes_id } = nuevoEvento;
        // Validación de campos
        if (!nombre || !fecha || !hora_inicio || !hora_fin || !direccion || latitud === null || longitud === null || !breve_descripcion || !dificultad || (precio === '') || !cupo || !observaciones || !interes_id) {
            if (!alert || alert.type !== 'danger') {
                setAlert({ type: 'danger', message: 'Por favor, complete todos los campos' });
            }
        } else {
            // Formatear la fecha
            const formattedDate = new Date(fecha).toISOString().split('T')[0]; // Formato 'YYYY-MM-DD'
            const formattedStartTime = hora_inicio; // formato 'HH:MM'
            const formattedEndTime = hora_fin; // formato 'HH:MM'

            const eventoData = {
                ...nuevoEvento,
                fecha: formattedDate,
                hora_inicio: formattedStartTime,
                hora_fin: formattedEndTime,
                partner_id: store.partnerId // Agregar el campo partner_id
            };


            actions.updateEvento(theid, eventoData, () => {
                setAlert({ type: 'success', message: ' Evento updated successfully' });
                setTimeout(() => {
                    navigate(-1);
                }, 1000);
            });


        }
    };
    return (
        <>
             <form onSubmit={handleSubmit} className="m-5 mx-auto w-50 p-4 shadow rounded" style={{ backgroundColor: '#ffffff' }}>
                <h1 className="text-center" style={{ color: '#7c488f' }}>Editar Evento</h1>
                {alert && (
                    <div className={`alert fade show alert-${alert.type}`} role="alert">
                        {alert.type === 'danger' ? <i className="fa-solid fa-triangle-exclamation"></i> : <i className="fa-solid fa-circle-check"></i>}
                        {alert.message}
                        <i type="button" className="btn-close float-end" data-bs-dismiss="alert" aria-label="Close" onClick={() => setAlert(null)}></i>
                    </div>
                )}
                <div className="mb-3">
                    <label htmlFor="nombreInput" className="form-label">Nombre del Evento</label>
                    <input type="text" value={nuevoEvento.nombre} onChange={(e) => setNuevoEvento({ ...nuevoEvento, nombre: e.target.value })} className="form-control" id="nombreInput" placeholder="Introduzca nombre del evento..." />
                </div>
                <div className="row mb-3">
                <div className="col-md-4">
                    <label htmlFor="fechaInput" className="form-label">Fecha del Evento</label>
                    <input type="date" value={nuevoEvento.fecha} onChange={(e) => setNuevoEvento({ ...nuevoEvento, fecha: e.target.value })} className="form-control" id="fechaInput" />
                </div>
                <div className="col-md-4">
                    <label htmlFor="hora_inicioInput" className="form-label">Hora de inicio</label>
                    <input type="time" value={nuevoEvento.hora_inicio} onChange={(e) => setNuevoEvento({ ...nuevoEvento, hora_inicio: e.target.value })} className="form-control" id="hora_inicioInput" />
                </div>
                <div className="col-md-4">
                    <label htmlFor="hora_finInput" className="form-label">Hora de fin</label>
                    <input type="time" value={nuevoEvento.hora_fin} onChange={(e) => setNuevoEvento({ ...nuevoEvento, hora_fin: e.target.value })} className="form-control" id="hora_finInput" />
                </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="direccionInput" className="form-label">Ubicacion</label>
                    {/* <input type="text" value={nuevoEvento.direccion} onChange={(e) => setNuevoEvento({ ...nuevoEvento, direccion: e.target.value })} className="form-control" id="direccionInput" placeholder="Introduzca direccion..." /> */}
                    <Mapa setDireccion={(newDireccion, newLatitud, newLongitud) => {
                        setDireccion(newDireccion);
                        setNuevoEvento({
                            ...nuevoEvento,
                            direccion: newDireccion,
                            latitud: newLatitud,
                            longitud: newLongitud
                        });
                    }} initialDireccion={direccion} />
                </div>
                <div className="mb-3">
                    <label htmlFor="breve_descripcionInput" className="form-label">Breve Descripción</label>
                    <input type="text" value={nuevoEvento.breve_descripcion} onChange={(e) => setNuevoEvento({ ...nuevoEvento, breve_descripcion: e.target.value })} className="form-control" id="breve_descripcionInput" placeholder="Introduzca breve descripción..." />
                </div>
                <div className="mb-3">
                    <label htmlFor="accesibilidadInput" className="form-label">Accesibilidad </label>
                    <input type="checkbox" checked={nuevoEvento.accesibilidad} onChange={(e) => setNuevoEvento({ ...nuevoEvento, accesibilidad: e.target.checked })} className="form-check-input" id="accesibilidadInput" />
                </div>
                <div className="row mb-3 align-items-end">
                <div className="col-md-5">
                    <label htmlFor="dificultadInput" className="form-label">Dificultad</label>
                    <input type="text" value={nuevoEvento.dificultad} onChange={(e) => setNuevoEvento({ ...nuevoEvento, dificultad: e.target.value })} className="form-control" id="dificultadInput" placeholder="Introduzca dificultad..." />
                </div>
                <div className="col-md-3">
                    <label htmlFor="precioInput" className="form-label">Precio</label>
                    <div className="position-relative">
                        <input type="number" value={nuevoEvento.precio} onChange={(e) => setNuevoEvento({ ...nuevoEvento, precio: e.target.value })} className="form-control" id="precioInput" placeholder="Puede ser 0..." min="0" />
                        <span className="position-absolute" style={{ right: '30px', top: '50%', transform: 'translateY(-50%)' }}>€</span>
                    </div>
                </div>
                <div className="col-md-4">
                    <label htmlFor="cupoInput" className="form-label">Cupo</label>
                    <input type="number" value={nuevoEvento.cupo} onChange={(e) => setNuevoEvento({ ...nuevoEvento, cupo: e.target.value })} className="form-control" id="cupoInput" placeholder="Introduzca cupo..." min="0" />
                </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="observacionesInput" className="form-label">Observaciones</label>
                    <input type="text" value={nuevoEvento.observaciones} onChange={(e) => setNuevoEvento({ ...nuevoEvento, observaciones: e.target.value })} className="form-control" id="observacionesInput" placeholder="Introduzca observaciones..." />
                </div>
                <div className="row mb-3">
                <div className="col-md-6">
                    <label htmlFor="interesSelect" className="form-label">Interés</label>
                    <select
                        id="interesSelect"
                        value={nuevoEvento.interes_id}
                        onChange={(e) => setNuevoEvento({ ...nuevoEvento, interes_id: e.target.value })}
                        className="form-select"
                    >
                        <option value="">Seleccione un interés</option>
                        {store.intereses.map(interes => (
                            <option key={interes.id} value={interes.id}>{interes.nombre}</option> // Aquí se muestra el nombre
                        ))}
                    </select>
                </div>
                </div>
                <div className="d-grid gap-2">
                    <button type="submit" className="btn w-100" style={{ backgroundColor: '#7c488f', color: 'white' }} onFocus={(e) => e.target.blur()}>Guardar</button>
                </div>
                <Link to="/partners-eventos" style={{ color: '#7c488f' }}>
                    o volver a la lista de eventos
                </Link>

            </form>
        </>
    );
};