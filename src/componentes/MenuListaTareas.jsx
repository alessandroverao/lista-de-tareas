import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import ListSubheader from "@mui/material/ListSubheader";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ArrowCircleUpRoundedIcon from "@mui/icons-material/ArrowCircleUpRounded";
import ArrowCircleDownRoundedIcon from "@mui/icons-material/ArrowCircleDownRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";

const estilos = {
  menuItem: {
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.2)",
      borderRadius: "5px",
    },
  },
  icon: {
    opacity:"0.8",
    marginRight: "10px",
  },
};

const opcionesMenu = [
  { value: 1, icon: <ArrowCircleUpRoundedIcon sx={estilos.icon} />, text: "Nuevos" },
  { value: 2, icon: <ArrowCircleDownRoundedIcon sx={estilos.icon} />, text: "Antiguos" },
  { value: 3, icon: <HighlightOffRoundedIcon sx={estilos.icon} />, text: "Pendientes" },
  { value: 4, icon: <CheckCircleOutlineRoundedIcon sx={estilos.icon} />, text: "Realizadas" },
];

export const MenuListaTareas = ({ setOrden, setVista }) => {
  const handleSelectChange = (event) => {
    const valor = event.target.value;
    if (valor === 1 || valor === 2) {
      setOrden(valor);
      setVista(0);
    } else {
      setVista(valor);
    }
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small" color="warning">
      <InputLabel htmlFor="grouped-select">Opciones</InputLabel>
      <Select
        defaultValue=""
        id="grouped-select"
        label="Grouping"
        onChange={handleSelectChange}
        sx={{width:"161px", height:"47px"}}
      >
        <ListSubheader>Ordenar:</ListSubheader>
        {opcionesMenu.slice(0, 2).map((opcion) => (
          <MenuItem
            value={opcion.value}
            sx={estilos.menuItem}
            key={opcion.value}
          >
            {opcion.icon}
            {opcion.text}
          </MenuItem>
        ))}
        <ListSubheader>Ver:</ListSubheader>
        {opcionesMenu.slice(2).map((opcion) => (
          <MenuItem
            value={opcion.value}
            sx={estilos.menuItem}
            key={opcion.value}
          >
            {opcion.icon}
            {opcion.text}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};