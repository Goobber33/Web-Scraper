import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import './App.sass';

interface DataType {
    _id: string;
    url: string;
    name?: string;
    id?: number;
    types?: string[];
    abilities?: string[];
}

const DataList: React.FC = () => {
    const [data, setData] = useState<DataType[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://scraperbe.herokuapp.com/api/data');
                const data = await response.json();
                if (Array.isArray(data)) {
                    setData(data);
                  } else {
                    console.error('Invalid data received:', data);
                    setData([]);
                  };
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
                        <Card className={`data-card shadow h-100 d-flex flex-column`}>
                            <Card.Body className="d-flex flex-column">

                                {item.name && (
                                    <Card.Title>{item.name}</Card.Title>
                                )}


                                {item.types && (
                                    <>
                                        <p>Types:</p>
                                        <ul>
                                            {item.types.map((type, index) => (
                                                <li key={index}>{type}</li>
                                            ))}
                                        </ul>
                                    </>
                                )}

                                {item.abilities && (
                                    <>
                                        <p>Abilities:</p>
                                        <ul>
                                            {item.abilities.map((ability, index) => (
                                                <li key={index}>{ability}</li>
                                            ))}
                                        </ul>
                                    </>
                                )}

                            </Card.Body>
                            <Card.Footer className="mt-auto">
                                <Card.Link
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary"
                                >
                                    Visit source
                                </Card.Link>
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>
            <p className="explanation">
                Web scrapers are tools that extract information from websites by parsing HTML content. They are commonly used for a variety of purposes, such as data mining, data extraction, data harvesting, sentiment analysis, and web content analysis. In this example, we demonstrate the use of a web scraper to collect data from the PokeAPI, a free public API for accessing Pokemon data, and display the results in a visually appealing manner. Please note that I used this API for demonstration purposes only. It can be unethical to scrape websites without explicit permission. Web scraping can be beneficial for businesses, researchers, and individuals seeking to obtain specific data quickly and efficiently from multiple websites.            </p>
        </Container>
    );
};

export default DataList;

