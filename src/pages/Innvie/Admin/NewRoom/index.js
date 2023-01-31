/* eslint-disable react/jsx-no-bind */
import {
  Alert,
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Switch,
} from "@mui/material";
import useRoom from "api/useRoom";
import useType from "api/useType";
import SelectPicker from "components/Innvie/SelectPicker";
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKInput from "components/MKInput";
import MKTypography from "components/MKTypography";
import RoomList from "components/RoomList";
import SectionTitle from "components/SectionTitle";
import PropTypes from "prop-types";
import { useState } from "react";
import ImageSwipe from "./imageswipe";

function NewEditSwitch({ editSwitch, handleChangeNew }) {
  return (
    <MKBox pt={4} pb={0} px={5}>
      <Grid container spacing={2}>
        <FormGroup>
          <FormControlLabel
            control={<Switch checked={editSwitch} onChange={handleChangeNew} />}
            label="Nuevo"
          />
          <FormControlLabel
            control={<Switch checked={!editSwitch} onChange={handleChangeNew} />}
            label="Editar"
          />
        </FormGroup>
      </Grid>
    </MKBox>
  );
}

NewEditSwitch.propTypes = {
  editSwitch: PropTypes.bool.isRequired,
  handleChangeNew: PropTypes.func.isRequired,
};

function NewRoomType({ room }) {
  const { roomsByType, deleteRoomByNumber, addRoom, roomError, getRoomsByType, deleteRoomByType } =
    useRoom();
  const {
    error,
    setError,
    types,
    addType,
    updateType,
    addPhoto,
    getPhotos,
    photos,
    setPhotos,
    cacheRoom,
    setCacheRoom,
    getAll,
    getType,
    setDefault,
    deleteTypeByName,
  } = useType(room);
  const options = ["Habitación", "Departamento"];
  const [editSwitch, setEditSwitch] = useState(true);
  const [roomNumber, setRoomNumber] = useState("");
  const [roomComment, setRoomComment] = useState("");

  const resetAll = () => {
    if (editSwitch) {
      getAll();
    }
    setDefault();
    setEditSwitch(!editSwitch);
    setPhotos([]);
  };

  const handleChangeNew = (e) => {
    e.preventDefault();
    resetAll();
  };

  const handleChangeName = async (e) => {
    if (editSwitch) {
      setCacheRoom({ ...cacheRoom, type: e.target.value });
    }
    if (!editSwitch) {
      setCacheRoom({ ...cacheRoom, type: e.target.innerText });
    }
    if (!editSwitch && e.target.innerText) {
      getType(e.target.innerText);
      getPhotos(e.target.innerText);
      getRoomsByType(e.target.innerText);
    }
  };

  const handleAddPhoto = async (e) => {
    e.preventDefault();
    const url = await addPhoto(e.target.files[0]);
    console.log("🚀 ~ file: index.js:112 ~ handleAddPhoto ~ url", url);
    if (url) {
      setPhotos([...photos, url]);
      const updatedRoom = { ...cacheRoom, photos: [...photos, url] };
      setCacheRoom(updatedRoom);
    }
  };

  const handleDeleteType = async (e) => {
    e.preventDefault();
    await deleteTypeByName(cacheRoom.type);
    await deleteRoomByType(cacheRoom.type);
    resetAll();
  };

  const handleDeleteRoom = async (rn) => {
    await deleteRoomByNumber(rn.toString());
    await getRoomsByType(cacheRoom.type);
  };

  const setAccesory = async (e, accesory) => {
    const { checked } = e.target;
    let { accessories } = cacheRoom;
    const exists = accessories.indexOf(accesory) !== -1;
    if (checked && !exists) {
      accessories.push(accesory);
    }
    if (!checked && exists) {
      accessories = accessories.filter((a) => a !== accesory);
    }
    setCacheRoom({ ...cacheRoom, accessories });
  };

  async function hadleSubmit(e) {
    e.preventDefault();
    if (!cacheRoom?.type) {
      setError("Ingrese un nombre");
      return;
    }
    if (!cacheRoom?.category) {
      setError("Ingrese una categoría");
      return;
    }

    console.log(cacheRoom);
    addType(cacheRoom).then((success) => {
      console.log("success?", success);
      if (success) {
        e.target.reset();
      } else {
        updateType(cacheRoom).then(() => {
          console.log("actualización concluida");
        });
      }
    });
    setDefault();
    setEditSwitch(true);
    setPhotos([]);
  }

  async function handleAddRoom(e) {
    e.preventDefault();
    addRoom({
      number: roomNumber,
      comment: roomComment,
      type: cacheRoom.type,
      typeId: cacheRoom.id,
    }).then((success) => {
      if (success) {
        e.target.reset();
      }
    });
  }

  return (
    <Card sx={{ width: "auto", maxWidth: "700px", margin: "auto", marginTop: "30px" }}>
      <SectionTitle title="Crea o edita un tipo de habitación" />
      <NewEditSwitch editSwitch={editSwitch} handleChangeNew={handleChangeNew} />
      {/* eslint-disable-next-line react/jsx-no-bind */}
      <MKBox pt={4} pb={3} px={3} component="form" role="form" onSubmit={hadleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} xl={6}>
            {!editSwitch && (
              <MKBox mb={2}>
                <SelectPicker
                  options={types ? types.map((o) => o.type) : []}
                  name="type"
                  label="Nombre"
                  onChange={handleChangeName}
                  value={cacheRoom.type}
                />
              </MKBox>
            )}
            {editSwitch && (
              <MKBox mb={2}>
                <MKInput
                  type="text"
                  name="type"
                  label="Nombre"
                  fullWidth
                  onChange={handleChangeName}
                />
              </MKBox>
            )}
            <MKBox mb={2}>
              <SelectPicker
                options={options}
                name="category"
                label="Categoría"
                onChange={(e) => {
                  setCacheRoom({ ...cacheRoom, category: e.target.innerText });
                }}
                value={cacheRoom.category}
              />
            </MKBox>
            {cacheRoom.category === "Departamento" && (
              <MKBox mb={2}>
                <MKInput
                  type="number"
                  name="rooms"
                  label="Habitaciones"
                  defaultValue={0}
                  fullWidth
                  value={cacheRoom?.rooms ?? 0}
                  onChange={(e) => {
                    let rooms = cacheRoom?.rooms ?? 0;
                    rooms = e.target.value ?? rooms;
                    setCacheRoom({ ...cacheRoom, rooms });
                  }}
                />
              </MKBox>
            )}
            <MKBox mb={2}>
              <MKInput
                type="number"
                name="queen"
                label="Camas Queen"
                defaultValue={0}
                fullWidth
                value={cacheRoom.beds?.queen ?? 0}
                onChange={(e) => {
                  const beds = cacheRoom.beds ?? {};
                  beds.queen = e.target.value;
                  setCacheRoom({ ...cacheRoom, beds });
                }}
              />
            </MKBox>
            <MKBox mb={2}>
              <MKInput
                type="number"
                name="full"
                label="Camas Full"
                defaultValue={0}
                fullWidth
                value={cacheRoom.beds?.full ?? 0}
                onChange={(e) => {
                  const beds = cacheRoom.beds ?? {};
                  beds.full = e.target.value;
                  setCacheRoom({ ...cacheRoom, beds });
                }}
              />
            </MKBox>
            <MKBox mb={2}>
              <MKInput
                type="number"
                name="single"
                label="Camas Single"
                defaultValue={0}
                fullWidth
                value={cacheRoom.beds?.single ?? 0}
                onChange={(e) => {
                  const beds = cacheRoom.beds ?? {};
                  beds.single = e.target.value;
                  setCacheRoom({ ...cacheRoom, beds });
                }}
              />
            </MKBox>
            <MKBox mb={2}>
              <MKInput
                type="number"
                name="sofas"
                label="Sofas"
                defaultValue={0}
                fullWidth
                value={cacheRoom.sofas ?? 0}
                onChange={(e) => {
                  let sofas = cacheRoom.sofas ?? 0;
                  sofas = e.target.value;
                  setCacheRoom({ ...cacheRoom, sofas });
                }}
              />
            </MKBox>
            <MKBox mb={2}>
              <MKInput
                type="number"
                name="maxOccupants"
                label="Máximo número de ocupantes"
                defaultValue={0}
                fullWidth
                value={cacheRoom.maxOccupants ?? 0}
                onChange={(e) => {
                  let maxOccupants = cacheRoom.maxOccupants ?? 0;
                  maxOccupants = e.target.value;
                  setCacheRoom({ ...cacheRoom, maxOccupants });
                }}
              />
            </MKBox>
            <MKBox mb={2}>
              <FormControl fullWidth>
                <InputLabel htmlFor="outlined-adornment-amount">Precio</InputLabel>
                <OutlinedInput
                  name="price"
                  id="price"
                  type="number"
                  startAdornment={<InputAdornment position="start">$</InputAdornment>}
                  label="Price"
                  value={cacheRoom.price}
                  onChange={(e) => setCacheRoom({ ...cacheRoom, price: e.target.value })}
                />
              </FormControl>
            </MKBox>
          </Grid>
          <Grid item xs={12} md={6} xl={6}>
            <MKBox mb={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={cacheRoom?.accessories?.includes("microwave")}
                    onChange={(e) => setAccesory(e, "microwave")}
                  />
                }
                name="microwave"
                label="Microwave"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={cacheRoom?.accessories?.includes("desk")}
                    onChange={(e) => setAccesory(e, "desk")}
                  />
                }
                name="desk"
                label="Desk"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={cacheRoom?.accessories?.includes("tv")}
                    onChange={(e) => setAccesory(e, "tv")}
                  />
                }
                name="tv"
                label="TV"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={cacheRoom?.accessories?.includes("dish")}
                    onChange={(e) => setAccesory(e, "dish")}
                  />
                }
                name="dish"
                label="Dish"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={cacheRoom?.accessories?.includes("wifi")}
                    onChange={(e) => setAccesory(e, "wifi")}
                  />
                }
                name="wifi"
                label="WiFi"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={cacheRoom?.accessories?.includes("minifridge")}
                    onChange={(e) => setAccesory(e, "minifridge")}
                  />
                }
                name="minifridge"
                label="You can ask for a mini fridge"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={cacheRoom?.accessories?.includes("fullbath")}
                    onChange={(e) => setAccesory(e, "fullbath")}
                  />
                }
                name="fullbath"
                label="Full bath"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={cacheRoom?.accessories?.includes("stovetop")}
                    onChange={(e) => setAccesory(e, "stovetop")}
                  />
                }
                name="stovetop"
                label="Stovetop"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={cacheRoom?.accessories?.includes("diningtable")}
                    onChange={(e) => setAccesory(e, "diningtable")}
                  />
                }
                name="diningtable"
                label="Dining Table"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={cacheRoom?.accessories?.includes("fridge")}
                    onChange={(e) => setAccesory(e, "fridge")}
                  />
                }
                name="fridge"
                label="Fridge"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={cacheRoom?.accessories?.includes("sink")}
                    onChange={(e) => setAccesory(e, "sink")}
                  />
                }
                name="sink"
                label="Sink"
              />
            </MKBox>
          </Grid>
          <Grid item xs={12}>
            <MKBox mb={2}>
              <MKInput
                type="file"
                name="picture"
                label="Picture"
                InputLabelProps={{ shrink: true }}
                fullWidth
                onChange={handleAddPhoto}
              />
            </MKBox>
            {photos && <ImageSwipe images={photos} />}
          </Grid>
        </Grid>
        <MKBox mt={3} mb={1}>
          {error && (
            <Alert severity="error" color="error">
              {error}
            </Alert>
          )}
          <MKButton
            type="submit"
            variant="gradient"
            color="primary"
            fullWidth
            disabled={!cacheRoom?.type}
          >
            Guardar
          </MKButton>
          {!editSwitch && (
            <MKButton
              sx={{ mt: 2 }}
              variant="gradient"
              color="error"
              fullWidth
              disabled={!cacheRoom?.type}
              onClick={handleDeleteType}
            >
              Eliminar
            </MKButton>
          )}
        </MKBox>
      </MKBox>
      {!editSwitch && (
        <MKBox pt={1} pb={5} px={3} component="form" role="form" onSubmit={handleAddRoom}>
          <MKTypography
            display="flex"
            width="100%"
            variant="h5"
            mb={2}
            sx={{ justifyContent: "center" }}
          >
            Agregar o quitar Habitaciones
          </MKTypography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} xl={6} s>
              <MKBox mt={2} mb={2} mr={4} ml={4}>
                <MKInput
                  type="number"
                  name="number"
                  label="Número de habitacion"
                  defaultValue={0}
                  fullWidth
                  value={roomNumber ?? 0}
                  onChange={(e) => {
                    setRoomNumber(e.target.value);
                  }}
                />
              </MKBox>
              <MKBox mt={2} mb={2} mr={4} ml={4}>
                <MKInput
                  type="text"
                  name="comment"
                  label="Comentario"
                  fullWidth
                  onChange={(e) => {
                    setRoomComment(e.target.value);
                  }}
                />
              </MKBox>
              {roomError && (
                <Alert severity="error" color="error">
                  {roomError}
                </Alert>
              )}
              <MKButton
                type="submit"
                variant="gradient"
                color="primary"
                fullWidth
                disabled={!cacheRoom?.type}
              >
                Agregar
              </MKButton>
            </Grid>
            <Grid item xs={12} md={6} xl={6}>
              <RoomList deleteRoom={handleDeleteRoom} rooms={roomsByType} />
            </Grid>
          </Grid>
        </MKBox>
      )}
    </Card>
  );
}
NewRoomType.defaultProps = {
  room: {
    type: "",
    accessories: ["microwave", "desk", "tv", "dish", "wifi", "minifridge", "fullbath"],
    beds: { full: 0, queen: 0 },
    photos: [],
    price: 0,
    category: "Habitación",
  },
};
NewRoomType.propTypes = {
  room: PropTypes.shape({
    type: PropTypes.string,
    accessories: PropTypes.arrayOf(PropTypes.string),
    beds: PropTypes.shape({ full: PropTypes.number, queen: PropTypes.number }),
    photos: PropTypes.arrayOf(PropTypes.string),
    price: PropTypes.number,
    category: PropTypes.string,
  }),
};

export default NewRoomType;
