import { useState } from "react";
import { DialogoConfirmacion } from "./DialogoConfirmacion";
import { MenuItemTarea } from "./MenuItemTarea";
import {
  ListItem,
  ListItemText,
  Checkbox,
  Menu,
  Box,
  Typography,
  Tooltip,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
const estilos = {
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "15px",
    cursor: "default",
    borderBottom: "1px solid rgba(0,0,0,0.2)",
    "&:nth-last-child(1)": {
      borderBottom: "none",
    },
  },
  MoreHorizIcon: {
    cursor: "pointer",
    transition: "0.3s",
    "&:hover": {
      background: "rgba(0, 0, 0, 0.3)",
      borderRadius: "5px",
      transform: "scale(1.2)",
    },
    "&:not(:hover)": {
      transition: "0.3s",
      transform: "scale(1)",
    },
  },
};
export const Tarea = ({ tarea, completarTarea, eliminarTarea }) => {
  const [abierto, setAbierto] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(null);
  const manejarDialogo = (valor) => setAbierto(valor);
  const manejarMenu = (event) =>
    setMenuAbierto(event ? event.currentTarget : null);
  const manejarConfirmar = () => {
    manejarDialogo(false);
    eliminarTarea(tarea.id);
  };
  return (
    <ListItem sx={estilos.listItem}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="start"
        width="100%"
      >
        <Tooltip title={tarea.fecha}>
          <Typography variant="body2" color="textSecondary">
            {tarea.fecha}
          </Typography>
        </Tooltip>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="start"
          width="100%"
        >
          <Checkbox
            checked={tarea.completada}
            color="success"
            readOnly
            icon={<CheckCircleOutlineRoundedIcon />}
            checkedIcon={<CheckCircleRoundedIcon />}
            sx={{
              cursor: "default",
              marginLeft: "-20px",
              visibility: tarea.completada ? "visible" : "hidden",
            }}
          />
          <ListItemText
            primary={<div style={{ maxWidth: "430px" }}>{tarea.nombre}</div>}
            sx={{
              textDecoration: tarea.completada ? "line-through" : "",
              overflowWrap: "break-word",
            }}
          />
          <Tooltip title="Más opciones">
            <MoreHorizIcon
              variant="contained"
              color="default"
              sx={estilos.MoreHorizIcon}
              onClick={manejarMenu}
            />
          </Tooltip>
          <Menu
            anchorEl={menuAbierto}
            open={Boolean(menuAbierto)}
            onClose={() => manejarMenu(null)}
          >
            <MenuItemTarea
              tarea={tarea}
              completarTarea={completarTarea}
              manejarAbrir={() => manejarDialogo(true)}
              manejarMenu={manejarMenu}
            />
          </Menu>
          <DialogoConfirmacion
            abierto={abierto}
            manejarCerrar={() => manejarDialogo(false)}
            botones={[
              { etiqueta: "Cancelar", onClick: () => manejarDialogo(false) },
              {
                etiqueta: "Eliminar",
                onClick: manejarConfirmar,
                autoFocus: true,
              },
            ]}
          />
        </Box>
      </Box>
    </ListItem>
  );
};
