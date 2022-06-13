import React, { useState } from 'react';
import './App.css';

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

      {goodsFromServer.length}

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
          <ul>
            {goodsCopy.map(goodItem => <li key={goodItem}>{goodItem}</li>)}
          </ul>
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
