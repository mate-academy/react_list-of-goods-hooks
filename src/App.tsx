import './styles/App.scss';
import { Button } from 'react-bootstrap';
import { FC, useState } from 'react';
import { GoodsList } from './components/GoodsList';

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

export const App: FC = () => {
  const [
    isButtonVisible,
    setButtonVisible,
  ] = useState(true);

  const handleStartClick = () => {
    setButtonVisible(false);
  };

  return (
    <div className="App">
      {isButtonVisible
        ? (
          <Button
            className="App__startButton"
            onClick={handleStartClick}
          >
            Start
          </Button>
        ) : (
          <div className="App__goodsList">
            <GoodsList goods={goodsFromServer} />
          </div>
        )}
    </div>
  );
};
