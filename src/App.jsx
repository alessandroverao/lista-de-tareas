// Importación de los hooks de React
import { useEffect, useState } from "react";
// Importación de los componentes
import { Formulario } from "./componentes/Formulario";
import { ListaTareas } from "./componentes/ListaTareas";
import { BotonDesplazamiento } from "./componentes/BotonDesplazamiento";

// Componente principal de la aplicación
export const App = () => {
  // Obtener las tareas del localStorage
  const obtenerTareas = (clave) => JSON.parse(localStorage.getItem(clave)) || [];
  // Uso del hook useState para manejar el estado de las tareas
  const [tareas, setTareas] = useState(obtenerTareas("tareas"));

  // Función para actualizar el localStorage
  const actualizarLocalStorage = (clave, valor) => localStorage.setItem(clave, JSON.stringify(valor));
  // Uso del hook useEffect para actualizar el localStorage cada vez que cambia el estado de las tareas
  useEffect(() => actualizarLocalStorage("tareas", tareas), [tareas]);

  // Función para agregar una tarea
  const agregarTarea = (nombre) => {
    const fecha = new Date();
    const opciones = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    const fechaFormateada = fecha.toLocaleString("es-ES", opciones);

    // Actualización del estado de las tareas
    setTareas((prevTareas) => [
      ...prevTareas,
      {
        id: Date.now(),
        // Uso de la fecha completa actual como id
        nombre,
        completada: false,
        // Uso de visible para el momento de eliminar solamente dejar oculto del usuario
        visible: true,
        // Fecha con formato "domingo, 19 de noviembre de 2023, 20:54", se guarda como un string en localstorage
        fecha: fechaFormateada,
      },
    ]);
  };

  // Función para marcar una tarea como realizada o pendiente
  // Puede usarse para marcar una tarea como completada o incompleta, dependiendo de su estado actual
  const completarTarea = (id) => {
    setTareas((prevTareas) =>
      prevTareas.map((tarea) => (tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea))
    );
  };

  // Función para "eliminar" una tarea (no visible)
  const eliminarTarea = (id) => {
    setTareas((prevTareas) =>
      prevTareas.map((tarea) => (tarea.id === id ? { ...tarea, visible: false } : tarea))
    );
  };

  // Renderización del formulario, la lista de tareas y el boton de desplazamiento
  return (
    <>
      <Formulario agregarTarea={agregarTarea} />
      <ListaTareas
        tareas={tareas.filter((tarea) => tarea.visible)}
        completarTarea={completarTarea}
        eliminarTarea={eliminarTarea}
      />
      <BotonDesplazamiento />
    </>
  );
};

