import React, { useState } from 'react';
import './App.css';
import {
  Button, Col, Container, Row,
} from 'react-bootstrap';
import GoodsList from './GoodsList/GoodsList';

const goodsFromServer: string[] = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

const App: React.FC = () => {
  const [isGoodsToShow, setIsGoodsToShow] = useState(false);

  return (
    <div className="App">
      <Container>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <h1>Goods</h1>

            {isGoodsToShow && <GoodsList goodsFromServer={goodsFromServer} />}

            {!isGoodsToShow && (
              <Button
                type="button"
                variant="outline-primary"
                onClick={() => setIsGoodsToShow(true)}
              >
                Start
              </Button>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
