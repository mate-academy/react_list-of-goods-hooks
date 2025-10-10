import 'bulma/css/bulma.css';
import React, { useCallback, useState } from 'react';
import './App.scss';

export const goodsFromServer = [
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

export const App: React.FC = () => { 
  const [goods, setGoods] = useState(goodsFromServer);
  
  const sortAlphabetically = useCallback(() => {
    setGoods(
      [...goods].sort((a, b) => a.localeCompare(b)),
    );
  }, [goods]);

  const sortByLength = useCallback(() => {
    setGoods(
      [...goods].sort((a, b) => a.length - b.length),
    );
  }, [goods]);

  const reverseGoods = useCallback(() => {
    setGoods(
      [...goods].reverse(),
    );
  }, [goods]);

  const resetGoods = useCallback(() => {
    setGoods(goodsFromServer);
  }, []);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className="button is-info is-light"
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button type="button" className="button is-success is-light" onClick={sortByLength}>
          Sort by length
        </button>

        <button type="button" className="button is-warning is-light" onClick={reverseGoods}>
          Reverse
        </button>

        <button type="button" className="button is-danger is-light" onClick={resetGoods}>
          Reset
        </button>
      </div>
      
      <ul>
        {goods.map((good: string) => (
          <li key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
