import React, { useState } from "react";
import {
  Box,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import ArrowCircleUpRoundedIcon from "@mui/icons-material/ArrowCircleUpRounded";
import ArrowCircleDownRoundedIcon from "@mui/icons-material/ArrowCircleDownRounded";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";

const opcionesMenu = [
  { value: 1, icon: <ArrowCircleUpRoundedIcon />, text: "Nuevos" },
  { value: 2, icon: <ArrowCircleDownRoundedIcon />, text: "Antiguos" },
  { value: 3, icon: <HighlightOffRoundedIcon />, text: "Pendientes" },
  { value: 4, icon: <CheckCircleOutlineRoundedIcon />, text: "Realizadas" },
];

export const MenuListaTareas = ({ setOrden, setVista }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleSelectChange = (valor) => {
    if (valor === 1 || valor === 2) {
      setOrden(valor);
      setVista(0);
    } else {
      setVista(valor);
    }
    handleClose();
  };

  return (
    <Box sx={{ width: "20px", marginRight: "5px" }}>
      <Tooltip title="Filtros de visualización">
        <IconButton
          id="basic-button"
          aria-controls="basic-menu"
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          sx={{
            height: "27px",
            width: "27px",
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
          }}
        >
          <FilterListRoundedIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem disabled>Ordenar:</MenuItem>
        {opcionesMenu.slice(0, 2).map((opcion) => (
          <MenuItem
            onClick={() => handleSelectChange(opcion.value)}
            sx={{
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                borderRadius: "5px",
              },
            }}
            key={opcion.value}
          >
            {React.cloneElement(opcion.icon, {
              sx: { opacity: "0.8", marginRight: "10px" },
            })}
            {opcion.text}
          </MenuItem>
        ))}
        <Divider
          sx={{
            opacity: 1,
            border: "5px",
            height: "1px",
            background: "rgba(0, 0, 0, 0.4)",
            width: "75%",
            position: "relative",
            margin: "auto",
          }}
        />
        <MenuItem disabled>Ver:</MenuItem>
        {opcionesMenu.slice(2).map((opcion) => (
          <MenuItem
            onClick={() => handleSelectChange(opcion.value)}
            sx={{
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                borderRadius: "5px",
              },
            }}
            key={opcion.value}
          >
            {React.cloneElement(opcion.icon, {
              sx: { opacity: "0.8", marginRight: "10px" },
            })}
            {opcion.text}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
