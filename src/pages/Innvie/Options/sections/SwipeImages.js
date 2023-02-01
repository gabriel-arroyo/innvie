import React from "react";
import PropTypes from "prop-types";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import MKBox from "components/MKBox";

function SwipeImages({ type, photos }) {
  return (
    <Carousel showThumbs={false}>
      {photos.map((photo) => (
        <TypeImage type={type.type} photo={photo} />
      ))}
    </Carousel>
  );
}

SwipeImages.propTypes = {
  type: PropTypes.string.isRequired,
  photos: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SwipeImages;

function TypeImage({ type, photo }) {
  return (
    <MKBox
      component="img"
      src={photo}
      alt={type}
      borderRadius="lg"
      shadow="md"
      width="100%"
      position="relative"
      zIndex={1}
      height="220px"
      sx={{ aspectRatio: "1 / 1" }}
    />
  );
}

TypeImage.propTypes = {
  type: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
};
