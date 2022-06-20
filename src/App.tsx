import React, { useState } from 'react';
import './App.css';
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

const App: React.FC = () => {
  const [isListAvailable, showList] = useState(false);
  const [isReversed, reverseList] = useState(false);
  const [sortBy, sortList] = useState('');

  const goodsCopy = [...goodsFromServer];

  switch (sortBy) {
    case 'alphabetically':
      goodsCopy.sort();
      break;
    case 'byLength':
      goodsCopy.sort((goodItemA, goodItemB) => {
        return goodItemA.length - goodItemB.length;
      });
      break;
    default:
      break;
  }

  if (isReversed) {
    goodsCopy.reverse();
  }

  return (
    <div className="App">
      <h1>Goods</h1>

      <div>
        <button
          type="button"
          onClick={() => reverseList(!isReversed)}
        >
          Reverse
        </button>

        <button
          type="button"
          onClick={() => sortList('alphabetically')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => sortList('byLength')}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => {
            sortList('');
            reverseList(false);
          }}
        >
          Reset
        </button>
      </div>

      {isListAvailable
        ? (
          <GoodsList goods={goodsCopy} />
        )
        : (
          <button
            type="button"
            onClick={() => showList(true)}
          >
            Start
          </button>
        )}
    </div>
  );
};

export default App;
