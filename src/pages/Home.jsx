import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Home.scss";
import { Card, Row, Col } from "antd";
import Meta from "antd/es/card/Meta";

function Home() {
  const [arts, setArts] = useState([]);

  useEffect(() => {
    fetchArts();
  }, []);

  const fetchArts = async () => {
    try {
      const response = await axios.get(
        "https://662a6bda67df268010a3dc8f.mockapi.io/ArtTools"
      );
      console.log(response.data);

      const filteredArts = response.data.filter(
        (art) => art.glassSurface === false
      );

      setArts(filteredArts);
    } catch (error) {
      console.error("Failed to fetch arts.");
    }
  };

  return (
    <div className="arts-container">
      <h1>List of Art</h1>

      <div className="arts-cards">
        <Row gutter={[16, 16]}>
          {arts.slice(0, 10).map((art) => (
            <Col span={6} key={art.id}>
              <Link to={`/detail/${art.id}`}>
                <Card
                  hoverable
                  style={{ width: 240 }}
                  cover={<img src={art.image} alt={art.artName} />}
                >
                  <Meta title={art.artName} />
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default Home;
