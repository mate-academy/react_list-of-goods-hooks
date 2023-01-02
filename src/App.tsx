import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

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
  const goods = [...goodsFromServer];
  const [sortType, setSortType] = useState('none');
  const [isReversed, setReverse] = useState(false);

  const sortGoods = () => {
    switch (sortType) {
      case 'alphabet':
        return goods.sort((g1, g2) => g1.localeCompare(g2));

      case 'length':
        return goods.sort((g1, g2) => g1.length - g2.length);

      default:
        return goods;
    }
  };

  const sortByAlphabet = () => {
    setSortType('alphabet');
  };

  const sortByLength = () => {
    setSortType('length');
  };

  const changeReversState = () => {
    setReverse(!isReversed);
  };

  const reseting = () => {
    setSortType('none');
    setReverse(false);
  };

  const visibleGoods = sortGoods();

  if (isReversed) {
    goods.reverse();
  }

  const alphButtonClassNames = classNames(
    'button is-info',
    { 'is-light': sortType !== 'alphabet' },
  );

  const lengthButtonClassNames = classNames(
    'button is-success',
    { 'is-light': sortType !== 'length' },
  );

  const reverseButtonClassNames = classNames(
    'button is-warning',
    { 'is-light': !isReversed },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={alphButtonClassNames}
          onClick={sortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={lengthButtonClassNames}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={reverseButtonClassNames}
          onClick={changeReversState}
        >
          Reverse
        </button>

        {(sortType !== 'none' || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reseting}
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        <ul>
          {visibleGoods.map(good => (
            <li data-cy="Good" key={good}>{good}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
