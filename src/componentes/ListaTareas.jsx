import { useState } from "react";
import { Tarea } from "./Tarea";
import { MenuListaTareas } from "./MenuListaTareas";
import { Box, Badge, List, Typography, Tooltip } from "@mui/material";
import {
  CheckCircleOutlineRounded,
  HighlightOffRounded,
} from "@mui/icons-material";

// Estilos para la lista de tareas y el texto
const estilos = {
  lista: {
    width: "100%",
    maxWidth: "600px",
    margin: "0 auto",
    marginBottom: "20px",
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: "5px",
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.5)",
    cursor: "default",
  },
  texto: {
    margin: "10px",
    borderBottom: "1px solid rgba(0,0,0,0.2)",
  },
};

// Exportación del componente principal ListaTareas
export const ListaTareas = ({ tareas, completarTarea, eliminarTarea }) => {
  const [vista, setVista] = useState(0);
  const [orden, setOrden] = useState(1);

  // Filtro y orden de las tareas según la vista y el orden seleccionado en el menú "opciones" (select)
  const tareasFiltradasYOrdenadas = [...tareas]
    .filter((tarea) => {
      if (vista === 3) return !tarea.completada && tarea.visible; // Pendientes
      if (vista === 4) return tarea.completada && tarea.visible; // Realizados
      return tarea.visible;
    })
    .sort((a, b) => {
      if (orden === 1) return new Date(b.id) - new Date(a.id); // Nuevos
      if (orden === 2) return new Date(a.id) - new Date(b.id); // Antiguos
      return 0;
    });

  // Contadores de las tareas pendientes y completadas, para los "badge"
  const tareasPendientes = tareasFiltradasYOrdenadas.filter(
    (tarea) => !tarea.completada
  ).length;
  const tareasCompletadas = tareasFiltradasYOrdenadas.filter(
    (tarea) => tarea.completada
  ).length;

  return (
    <List sx={estilos.lista}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={estilos.texto}
      >
        <Tooltip title="Lista de tareas">
          <Typography
            variant="h5"
            component="div"
            style={{
              fontFamily: "'Bungee Spice', cursive",
              opacity: "0.8",
              textShadow: "2px 2px 4px #000000",
            }}
          >
            Lista de tareas
          </Typography>
        </Tooltip>
        <MenuListaTareas setOrden={setOrden} setVista={setVista} />
        <Box>
          <Tooltip title={`Tareas pendientes: ${tareasPendientes}`}>
            <Badge
              badgeContent={Math.min(tareasPendientes, 99) || "0"}
              color="error"
              sx={{ margin: "5px", opacity: "0.8" }}
            >
              <HighlightOffRounded />
            </Badge>
          </Tooltip>
          <Tooltip title={`Tareas realizadas: ${tareasCompletadas}`}>
            <Badge
              badgeContent={Math.min(tareasCompletadas, 99) || "0"}
              // Usa la función min del objeto Math. Toma dos argumentos, tareasCompletadas y 99, y devuelve el menor de los dos.
              // El badge tendra el número de tareas realizadas, pero no más de 99. Si es mas de 99 mostrara el 99.
              // se usa el || en el caso de que "tareasCompletadas" no tenga ningun valor y mostrara 0.
              color="success"
              sx={{ margin: "5px", opacity: "0.8" }}
            >
              <CheckCircleOutlineRounded />
            </Badge>
          </Tooltip>
        </Box>
      </Box>
      {tareasFiltradasYOrdenadas.map((tarea) => (
        // map crea un nuevo array con los resultados de llamar a una función para cada elemento del array original
        // (tarea) => Esta es la función que se pasa a map, toma una tarea como argumento y devuelve un componente Tarea
        <Tarea
          key={tarea.id}
          // Es una propiedad. Cada hijo en una lista debe tener una key única. Se usa el id de la tarea como key
          tarea={tarea}
          // Esta es una propiedad que se pasa al componente Tarea. El valor de esta propiedad es la tarea actual en el mapeo.
          completarTarea={completarTarea}
          // Estas son propiedades que se pasan al componente Tarea. Los valores de estas propiedades son las funciones completarTarea y eliminarTarea, que se utilizan para completar y eliminar tareas luego.
          eliminarTarea={eliminarTarea}
        />
      ))}
    </List>
  );
};
