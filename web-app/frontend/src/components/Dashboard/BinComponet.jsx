import React from "react";

function BinComponet() {
  return (
    <div style={style.AddBinContainer}>
      <button style={style.AddBinButton} className="AddBinButton">
        + Add a Bin
      </button>
    </div>
  );
}

const style = {
  AddBinContainer: {
    top: "10px",
    right: "30px",
    marginLeft: "30px",
    marginTop: "30px",
  },

  AddBinButton: {
    backgroundColor: "#4caf50",
    color: "white",
    padding: "10px 15px",
    fontSize: "16px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s",
    borderRadius: "5px",
  },

  AddBinButtonHover: {
    backgroundColor: "#45a049",
  },
};

export default BinComponet;
