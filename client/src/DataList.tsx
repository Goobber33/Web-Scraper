import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
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
    <Container className="py-5">
      <h1 className="container-title">Scraped Data</h1>
      <Row>
        {data.map((item, index) => (
          <Col md={4} key={item._id} className="mb-4">
            <Card className={`data-card shadow h-100`}>
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Link href={item.url} target="_blank" rel="noopener noreferrer" className="text-primary">
                  Visit source
                </Card.Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default DataList;
