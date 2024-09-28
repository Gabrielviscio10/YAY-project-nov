const getState = ({ getStore, getActions, setStore }) => { 
    return {
        store: {
            message: null,
            intereses: [],  // Nueva propiedad para almacenar la lista de intereses
            demo: [
                {
                    title: "FIRST",
                    background: "white",
                    initial: "white"
                },
                {
                    title: "SECOND",
                    background: "white",
                    initial: "white"
                }
            ]
        },
        actions: {
            // Ejemplo de función que cambia el color
            exampleFunction: () => {
                getActions().changeColor(0, "green");
            },

            // Acción para obtener el mensaje desde el backend
            getMessage: async () => {
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
                    const data = await resp.json();
                    setStore({ message: data.message });
                    return data;
                } catch (error) {
                    console.log("Error loading message from backend", error);
                }
            },

            // Acción para obtener la lista de intereses desde el backend
            getInteres: async () => {
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "/api/interes");
                    const data = await resp.json();
                    
                    if (resp.ok) {
                        // Guarda los intereses en el store
                        setStore({ intereses: data });
                    } else {
                        console.log("Error: ", data.message);
                    }
                    
                    return data;
                } catch (error) {
                    console.log("Error loading interests from backend", error);
                }
            },

            // Acción para obtener un interés por ID
            getInteresById: async (id) => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/interes/${id}`);
                    const data = await resp.json();
                    
                    if (resp.ok) {
                        return data; // Retorna el interés encontrado
                    } else {
                        console.log("Error: ", data.message);
                    }
                    
                    return null;
                } catch (error) {
                    console.log("Error loading interest from backend", error);
                }
            },

           // Acción para eliminar un interés por ID
			// Acción para eliminar un interés por ID
deleteInteres: async (id) => {
    try {
        const resp = await fetch(`${process.env.BACKEND_URL}/api/interes/${id}`, {
            method: "DELETE",
        });
        
        if (resp.ok) {
            // Actualiza el store eliminando el interés de la lista
            const store = getStore();
            const updatedIntereses = store.intereses.filter(interes => interes.id !== id);
            setStore({ intereses: updatedIntereses });
        } else {
            const data = await resp.json();
            console.log("Error: ", data.message);
        }
    } catch (error) {
        console.log("Error deleting interest from backend", error);
    }
},
createInteres: async (newInteres) => {
    try {
        const resp = await fetch(`${process.env.BACKEND_URL}/api/interes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newInteres)
        });

        if (resp.ok) {
            const data = await resp.json();
            // Puedes optar por actualizar el store directamente o volver a obtener la lista de intereses
            setStore((store) => ({ intereses: [...store.intereses, data] }));
        } else {
            const data = await resp.json();
            console.log("Error: ", data.message);
        }
    } catch (error) {
        console.log("Error creating interest from backend", error);
    }
},


            // Acción para editar un interés
            editInteres: async (id, updatedInteres) => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/interes/${id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(updatedInteres)
                    });

                    if (resp.ok) {
                        // Actualiza la lista de intereses después de la edición
                        actions.getInteres(); // Vuelve a obtener la lista actualizada
                    } else {
                        const data = await resp.json();
                        console.log("Error: ", data.message);
                    }
                } catch (error) {
                    console.log("Error editing interest from backend", error);
                }
            },

            changeColor: (index, color) => {
                const store = getStore();

                const demo = store.demo.map((elm, i) => {
                    if (i === index) elm.background = color;
                    return elm;
                });

                // Actualiza el store con los nuevos colores
                setStore({ demo: demo });
            }
        }
    };
};

export default getState;
