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
import useType from "api/useType";
import SelectPicker from "components/Innvie/SelectPicker";
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKInput from "components/MKInput";
import MKTypography from "components/MKTypography";
import React, { useState } from "react";
import PropTypes from "prop-types";
import ColumnHeader from "components/Innvie/ColumnHeader";
import ImageSwipe from "./imageswipe";

function NewRoomType({ room }) {
  const {
    error,
    setError,
    data,
    addType,
    addPhoto,
    getPhotos,
    photos,
    setPhotos,
    cacheRoom,
    setCacheRoom,
    getAll,
    getType,
    setDefault,
  } = useType(room);
  const options = ["Habitación", "Departamento"];
  const [editSwitch, setEditSwitch] = useState(true);

  const handleChangeNew = (e) => {
    e.preventDefault();
    if (editSwitch) {
      getAll();
    }
    setDefault();
    setEditSwitch(!editSwitch);
    setPhotos([]);
  };

  const handleChangeName = async (e) => {
    if (editSwitch) {
      setCacheRoom({ ...cacheRoom, name: e.target.value });
    }
    if (!editSwitch) {
      setCacheRoom({ ...cacheRoom, name: e.target.innerText });
    }
    if (!editSwitch && e.target.innerText) {
      getType(e.target.innerText);
      getPhotos(e.target.innerText);
    }
  };

  const handleAddPhoto = async (e) => {
    e.preventDefault();
    const url = await addPhoto(e.target.files[0]);
    if (url) {
      setPhotos([...photos, url]);
    }
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
    if (!cacheRoom?.name) {
      setError("Ingrese un nombre");
      return;
    }
    if (!cacheRoom?.type) {
      setError("Ingrese un tipo de habitación");
      return;
    }

    console.log(cacheRoom);
    addType(cacheRoom).then((success) => {
      if (success) {
        e.target.reset();
      }
    });
    setDefault();
    setEditSwitch(false);
    setPhotos([]);
  }

  return (
    <Card sx={{ width: "700px", margin: "auto", marginTop: "30px" }}>
      <MKBox
        variant="gradient"
        bgColor="primary"
        borderRadius="lg"
        coloredShadow="primary"
        mx={2}
        mt={-3}
        p={3}
        mb={1}
        textAlign="center"
      >
        <MKTypography display="block" variant="button" color="white" my={1}>
          Crea o edita un tipo de habitación
        </MKTypography>
      </MKBox>
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
      {/* eslint-disable-next-line react/jsx-no-bind */}
      <MKBox pt={4} pb={3} px={3} component="form" role="form" onSubmit={hadleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} xl={6}>
            {!editSwitch && (
              <MKBox mb={2}>
                <SelectPicker
                  options={data ? data.map((o) => o.name) : []}
                  name="name"
                  label="Nombre"
                  onChange={handleChangeName}
                  value={cacheRoom.name}
                />
              </MKBox>
            )}
            {editSwitch && (
              <MKBox mb={2}>
                <MKInput
                  type="text"
                  name="name"
                  label="Nombre"
                  fullWidth
                  onChange={handleChangeName}
                />
              </MKBox>
            )}
            <MKBox mb={2}>
              <SelectPicker
                options={options}
                defaultValue={cacheRoom.type}
                name="type"
                label="Tipo"
                onChange={(e) => {
                  setCacheRoom({ ...cacheRoom, type: e.target.innerText });
                }}
                value={cacheRoom.type}
              />
            </MKBox>
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
          <ColumnHeader title="Number" />
          <ColumnHeader title="Status" />
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
            disabled={!cacheRoom?.name}
          >
            Guardar
          </MKButton>
        </MKBox>
      </MKBox>
    </Card>
  );
}
NewRoomType.defaultProps = {
  room: {
    name: "",
    accessories: ["microwave", "desk", "tv", "dish", "wifi", "minifridge", "fullbath"],
    beds: { full: 0, queen: 0 },
    photos: [],
    price: 0,
    type: "Habitación",
  },
};
NewRoomType.propTypes = {
  room: PropTypes.shape({
    name: PropTypes.string,
    accessories: PropTypes.arrayOf(PropTypes.string),
    beds: PropTypes.shape({ full: PropTypes.number, queen: PropTypes.number }),
    photos: PropTypes.arrayOf(PropTypes.string),
    price: PropTypes.number,
    type: PropTypes.string,
  }),
};

export default NewRoomType;
