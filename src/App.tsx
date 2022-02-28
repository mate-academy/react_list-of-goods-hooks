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
  const [isreversed, setReverse] = useState(false);
  const [sort, setSort] = useState('');
  const serverGoodsList = [...goodsFromServer].filter(item => item.length >= selectedOption);

  serverGoodsList.sort((a, b) => {
    switch (sort) {
      case 'a-z':
        return a.localeCompare(b);
      case 'length':
        return a.length - b.length;
      default:
        return 0;
    }
  });

  const handleSelector = (e: string) => {
    setSelect(+e);
  };

  if (isreversed) {
    serverGoodsList.reverse();
  }

  const resetList = () => {
    setSelect(1);
    setSort('');
    setReverse(false);
  };

  return (
    <div className="App">
      <h1>
        Goods length:
        {selectedOption}
      </h1>
      <div className="button-section">
        <input
          type="range"
          className="ranger-button"
          value={selectedOption}
          min={1}
          max={10}
          onChange={(e) => handleSelector(e.target.value)}
        />
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
            <button
              className="button"
              type="button"
              onClick={() => setReverse(prev => !prev)}
            >
              Reverse
            </button>
          )}
        <button
          className="button"
          type="button"
          onClick={() => setSort('a-z')}
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
          onClick={() => setSort('length')}
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
      </div>
      {!confirmBtn && <ListOfGoods goods={serverGoodsList} />}
    </div>
  );
};

export default App;
