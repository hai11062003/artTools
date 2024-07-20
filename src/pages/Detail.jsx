import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Detail.scss";

function Detail() {
  const { id } = useParams();
  const [art, setArt] = useState(null);

  const fetchArtDetails = async () => {
    try {
      const response = await axios.get(
        `https://662a6bda67df268010a3dc8f.mockapi.io/ArtTools/${id}`
      );
      setArt(response.data);
    } catch (error) {
      console.error("Failed to fetch art details:", error);
    }
  };

  useEffect(() => {
    fetchArtDetails();
  }, []);

  if (!art) {
    return <div>Loading...</div>;
  }

  return (
    <div className="detail-container">
      <h1>Art Details</h1>
      <p>
        <strong>ID:</strong> {art.id}
      </p>
      <p>
        <strong>Name:</strong> {art.artName}
      </p>
      <p>
        <strong>Price:</strong> {art.price}
      </p>
      <p>
        <strong>Decription:</strong> {art.description}
      </p>
      <p>
        <strong>GlassSurface:</strong> {art.glassSurface ? "True" : "False"}
      </p>
      <p>
        <strong>Brand:</strong> {art.brand}
      </p>
      <p>
        <strong>LimitedTimeDeal:</strong> {art.limitedTimeDeal}%
      </p>
      <img
        src={art.image}
        alt="Art"
        style={{
          maxWidth: "100%",
          height: "200px",
          marginTop: "10px",
        }}
      />
    </div>
  );
}

export default Detail;
