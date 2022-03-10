import { useState } from 'react';
import './App.css';
import { ListOfGoods } from './ListOfGoods';

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
  const [confirmBtn, setState] = useState(true);
  const [selectedOption, setSelect] = useState(1);
  const [serverGoodsList, setServerLIst] = useState([...goodsFromServer]);

  const sortByAlphabet = () => {
    setServerLIst([...serverGoodsList].sort((a, b) => a.localeCompare(b)));
  };

  const sortByLength = () => {
    setServerLIst([...serverGoodsList].sort((a, b) => a.length - b.length));
  };

  const handleSelector = (e: string) => {
    setSelect(+e);
  };

  const reversed = () => {
    setServerLIst([...serverGoodsList].reverse());
  };

  const resetList = () => {
    setServerLIst([...goodsFromServer]);
    setSelect(1);
  };

  return (
    <div className="App">
      <h1>
        Goods length:
        {selectedOption}
      </h1>
      <div className="button-section">
        {confirmBtn
          && (
            <button
              className="button"
              type="button"
              onClick={() => setState(false)}
            >
              Start
            </button>
          )}
        {!confirmBtn
          && (
            <>
              <button
                className="button"
                type="button"
                onClick={reversed}
              >
                Reverse
              </button>

              <button
                className="button"
                type="button"
                onClick={sortByAlphabet}
              >
                Sort A-Z
              </button>
              <button
                className="button"
                type="button"
                onClick={resetList}
              >
                Reset
              </button>
              <button
                className="button"
                type="button"
                onClick={sortByLength}
              >
                Sort Length
              </button>
              <select
                className="button"
                value={selectedOption}
                onChange={(e) => handleSelector(e.target.value)}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </>
          )}
      </div>
      {!confirmBtn && <ListOfGoods goods={serverGoodsList} select={selectedOption} />}
    </div>
  );
};

export default App;
