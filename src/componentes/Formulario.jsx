// Importación del hook useState de React
import { useState } from "react";
// Importación del componente DialogoConfirmacion
import { DialogoConfirmacion } from "./DialogoConfirmacion";
// Importación de los componentes Button y TextField de Material-UI
import { Button, TextField } from "@mui/material";
// Importación del icono Add de Material-UI
import AddIcon from "@mui/icons-material/Add";

// Componente InputField
const InputField = ({ value, onChange }) => (
  // Este componente es un campo para ingresar texto
  <TextField
    label="Nueva tarea"
    color="warning"
    variant="outlined"
    value={value}
    onChange={onChange}
    sx={{ margin: "10px", flex: "1" }}
  />
);

// Componente SubmitButton
const SubmitButton = () => (
  // Este componente es el botón para enviar el texto a la lista
  <Button
    title="Agregar tarea"
    type="submit"
    variant="contained"
    color="warning"
    sx={{ margin: "10px" }}
  >
    <AddIcon />
  </Button>
);

// Exportación del componente principal Formulario
export const Formulario = ({ agregarTarea }) => {
  // Uso  del hook useState para manejar el estado del nombre de la tarea y de la ventana de diálogo
  const [nombre, setNombre] = useState("");
  const [abierto, setAbierto] = useState(false);

  // Función para abrir o cerrar la ventana de diálogo
  const toggleDialog = () => setAbierto(!abierto);

  // Función para manejar el envío del formulario
  const enviarFormulario = (e) => {
    e.preventDefault();
    // Si el nombre de la tarea está vacío, se muestra la ventana de diálogo
    // Se  elimina los espacios en blanco del principio y del final de lo ingresado
    // Para verificar si nada fue ingresado en el campo entrada y abrir la ventana de diálogo
    if (nombre.trim() === "") {
      toggleDialog();
      return;
    }
    // Si el nombre de la tarea no está vacío, se agrega la tarea y se limpia el campo de entrada
    agregarTarea(nombre);
    setNombre("");
  };

  // Renderización del formulario y la ventana de diálogo
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <form
        // Cuando se envía el formulario, se llama a la función enviarFormulario
        onSubmit={enviarFormulario}
        // Estilos del formulario
        style={{ display: "flex", alignItems: "center", maxWidth: "600px" }}
      >
        <InputField 
          // El valor del campo de entrada es el estado actual del nombre de la tarea
          value={nombre} 
          // Cuando cambia el valor del campo de entrada, se actualiza el estado del nombre de la tarea
          onChange={(e) => setNombre(e.target.value)} 
        />
        <SubmitButton />
      </form>
      <DialogoConfirmacion
        // El diálogo se muestra si el estado abierto es verdadero
        abierto={abierto}
        // Cuando se cierra el diálogo, se llama a la función toggleDialog
        manejarCerrar={toggleDialog}
        // Título del diálogo
        titulo="Atención"
        // Mensaje del diálogo
        mensaje="Por favor, ingrese una tarea."
        // Los botones del diálogo
        botones={[
          // Hay un solo botón, que cierra el diálogo cuando se hace click en el
          { etiqueta: "Aceptar", onClick: toggleDialog, autoFocus: true },
        ]}
      />

    </div>
  );
};
