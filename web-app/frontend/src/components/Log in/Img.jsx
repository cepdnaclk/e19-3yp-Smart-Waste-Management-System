import React from "react";
import Image from "../pics/img.png";

const Img = () => {
  return (
    <div style={styles.image}>
      {/* Include your logo image or any other logo content here */}
      <img
        src={Image}
        alt="Img"
        style={{ width: "500px", height: "auto" }}
      />
    </div>
  );
};

const styles = {
  image: {
    position: "absolute",
    top: "200px",
    left: "50px",
  },
};

export default Img;
