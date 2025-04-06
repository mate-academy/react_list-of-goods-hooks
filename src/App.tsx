import React, { useState } from 'react';
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
  const [prepareGoods, setPrepareGoods] = useState([...goodsFromServer]);
  const [isSorted, setIsSorted] = useState(false);
  const [activeButton, setActiveButton] = useState('');

  enum SortType {
    alphabetical = 'alphabetical',
    length = 'length',
    reverse = 'reverse',
  }

  const sortAlphabetically = () => {
    const alphabetical = [...prepareGoods.sort()];

    setPrepareGoods(alphabetical);
    setIsSorted(true);
    setActiveButton(SortType.alphabetical);
  };

  const sortByLength = () => {
    const length = prepareGoods.sort(
      (goods1, goods2) => goods1.length - goods2.length,
    );

    setPrepareGoods([...length]);
    setIsSorted(true);
    setActiveButton(SortType.length);
  };

  const reverseOrder = () => {
    const reverse = prepareGoods.sort().reverse();

    setPrepareGoods([...reverse]);
    setIsSorted(true);
    setActiveButton(SortType.reverse);
  };

  const reset = () => {
    setPrepareGoods([...goodsFromServer]);
    setIsSorted(false);
    setActiveButton('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${activeButton === SortType.alphabetical ? '' : 'is-light'}`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={`button is-info ${activeButton === SortType.length ? '' : 'is-light'}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={`button is-info ${activeButton === SortType.reverse ? '' : 'is-light'}`}
          onClick={reverseOrder}
        >
          Reverse
        </button>
        {isSorted && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {prepareGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
