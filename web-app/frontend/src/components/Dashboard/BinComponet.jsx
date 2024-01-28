import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const BinComponent = () => {
  const [binId, setBinId] = useState("");
  const [area, setArea] = useState("");
  const [height, setHeight] = useState("");
  const [bins, setBins] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const binData = {
      binId,
      area,
      height,
    };

    try {
      const response = await fetch("http://52.74.74.48:1337/api/bins", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(binData),
      });

      if (response.ok) {
        const newBin = await response.json();
        setBins([...bins, newBin]);
      } else {
        console.error("Failed to create bin:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating bin:", error);
    }
  };

  useEffect(() => {
    const fetchBins = async () => {
      try {
        const response = await fetch("http://52.74.74.48:1337/api/bins");
        if (response.ok) {
          const binsData = await response.json();
          setBins(binsData.bin);
        } else {
          console.error("Failed to fetch bins:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching bins:", error);
      }
    };

    fetchBins();
  }, []);

  return (
    <div className="container">
      <h2>Create a New Bin</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="binId" className="form-label">
            Bin ID:
          </label>
          <input
            type="text"
            id="binId"
            className="form-control"
            value={binId}
            onChange={(e) => setBinId(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="area" className="form-label">
            Area:
          </label>
          <input
            type="text"
            id="area"
            className="form-control"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="height" className="form-label">
            Height:
          </label>
          <input
            type="number"
            id="height"
            className="form-control"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create Bin
        </button>
      </form>
      <br />
      <br />
      <h2>Bin Details</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Bin ID</th>
            <th>Area</th>
            <th>Height</th>
          </tr>
        </thead>
        <tbody>
          {bins.map((bin) => (
            <tr key={bin._id}>
              <td>{bin.binId}</td>
              <td>{bin.area}</td>
              <td>{bin.height}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BinComponent;
