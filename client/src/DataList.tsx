import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import './index.css';

interface DataType {
  _id: string;
  url: string;
  title: string;
}

const DataList: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/data');
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Scraped Data</h1>
      <Row>
        {data.map((item, index) => (
          <Col md={4} key={item._id}>
            <Card
              className={`data-card mb-4 ${index % 2 === 0 ? 'bg-primary' : 'bg-secondary'} text-white`}
            >
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Link href={item.url} target="_blank" rel="noopener noreferrer">
                  Visit source
                </Card.Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default DataList;
