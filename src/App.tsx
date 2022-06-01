import React, { useState } from 'react';
import './App.css';
import List from './components/List';

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
  const [showList, setShowList] = useState(false);
  const [list, setList] = useState(goodsFromServer);
  const [minLength, setMinLength] = useState(1);

  function changeMinLength(e: { target: { value: string; }; }) {
    setMinLength(+e.target.value);
  }

  function reverseList() {
    setList([...list.reverse()]);
  }

  function sortList(sortBy: string) {
    switch (sortBy) {
      case 'A-Z':
        setList([...list].sort((i1, i2) => i1.localeCompare(i2)));

        return list;
      case 'length':
        setList([...list].sort((i1, i2) => i1.length - i2.length));

        return list;
      default:
        return list;
    }
  }

  function resetList() {
    setList(goodsFromServer);
    setMinLength(1);
  }

  if (!showList) {
    return (
      <div className="main">
        <button
          type="button"
          className="btn btn-success"
          onClick={() => setShowList(true)}
        >
          Start
        </button>
      </div>
    );
  }

  return (
    <div className="container main">
      <h1 className="text-cente">List of goods</h1>
      <div className="btn-group">
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={reverseList}
        >
          Reverse
        </button>
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() => sortList('A-Z')}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={resetList}
        >
          Reset
        </button>
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() => sortList('length')}
        >
          Sort by length
        </button>
      </div>
      <select
        className="form-select select"
        name="length"
        value={minLength}
        onChange={changeMinLength}
      >
        {
          Array.from({ length: 10 }, (_, i) => i + 1).map(option => (
            <option key={option} value={option}>
              {`Min word length = ${option}`}
            </option>
          ))
        }
      </select>
      <List goods={list.filter(item => item.length >= minLength)} />
    </div>
  );
};

export default App;
