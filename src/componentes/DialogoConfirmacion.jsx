import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

const coloresEtiqueta = {
  Eliminar: "error",
  default: "primary",
};

const obtenerColor = (etiqueta) => coloresEtiqueta[etiqueta] || coloresEtiqueta.default;

export const DialogoConfirmacion = ({
  abierto,
  manejarCerrar,
  titulo = "¿Deseas eliminar esta tarea?",
  mensaje = "Esta acción no se puede revertir, y se eliminará de su lista de tareas.",
  botones = [
    { etiqueta: "No", onClick: () => {}, autoFocus: false },
    { etiqueta: "Sí", onClick: () => {}, autoFocus: true },
  ],
}) => (
  <Dialog
    open={abierto}
    onClose={manejarCerrar}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    disableRestoreFocus
  >
    <DialogTitle id="alert-dialog-title">{titulo}</DialogTitle>
    <DialogContent sx={{ maxWidth: "250px" }}>{mensaje}</DialogContent>
    <DialogActions>
      {botones.map((boton, index) => (
        <Button
          key={index}
          onClick={boton.onClick}
          color={obtenerColor(boton.etiqueta)}
          autoFocus={boton.autoFocus}
          sx={{ "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.3)" } }}
        >
          {boton.etiqueta}
        </Button>
      ))}
    </DialogActions>
  </Dialog>
);
