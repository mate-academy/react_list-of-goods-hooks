import React, {useState} from 'react';
import 'bulma/css/bulma.css';
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

  const [visibleGoods, setVisibleGoods] = useState<string[]>([...goodsFromServer]);

  const sortByAlphabetically = () => {
    setVisibleGoods(prevGoods =>
      [...prevGoods].sort((good1: string, good2: string) =>
        good1.localeCompare(good2))
    );
  };

  const sortByLength = () => {
    setVisibleGoods(prevGoods =>
      [...prevGoods].sort((good1: string, good2: string) =>
        good1.length - good2.length)
    )
  }

  const reverse = () => {
    setVisibleGoods(prevGoods =>
      [...prevGoods].toReversed()
    );
  };

  const reset = () => {
    setVisibleGoods([...goodsFromServer]);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className="button is-info is-light"
          onClick={sortByAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className="button is-success is-light"
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className="button is-warning is-light"
          onClick={reverse}
        >
          Reverse
        </button>

        <button
          type="button"
          className="button is-danger is-light"
          onClick={reset}
        >
          Reset
        </button>
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
