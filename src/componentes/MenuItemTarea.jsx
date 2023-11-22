import { MenuItem } from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/Delete";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";

export const MenuItemTarea = ({
  tarea,
  completarTarea,
  manejarAbrir,
  manejarMenu,
}) => {
  const estiloItemMenu = {
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.2)",
      borderRadius: "5px",
    },
  };

  const estiloIcono = { opacity: "0.8", marginRight: "10px" };

  const handleCompleteTask = () => {
    completarTarea(tarea.id);
    manejarMenu(null);
  };

  const handleDeleteTask = () => {
    manejarAbrir();
    manejarMenu(null);
  };

  return (
    <>
      <MenuItem autoFocus onClick={handleCompleteTask} sx={estiloItemMenu}>
        {tarea.completada ? (
          <HighlightOffRoundedIcon sx={estiloIcono} />
        ) : (
          <CheckCircleOutlineRoundedIcon sx={estiloIcono} />
        )}
        {tarea.completada ? "Pendiente" : "Realizada"}
      </MenuItem>
      <MenuItem onClick={handleDeleteTask} sx={estiloItemMenu}>
        <DeleteRoundedIcon sx={estiloIcono} />
        Eliminar
      </MenuItem>
    </>
  );
};
