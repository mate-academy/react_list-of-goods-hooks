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

enum SortType {
  None = '',
  Alphabetically = 'alphabetically',
  Length = 'length',
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.None);
  const [reversed, setReversed] = useState(false);
  const [isLight, setIsLight] = useState('');

  let visibleGoods = [...goodsFromServer];

  const handleSortAlphabetically = () => {
    setSortField(SortType.Alphabetically);
    setIsLight(SortType.Alphabetically);
  };

  const handleSortByLength = () => {
    setSortField(SortType.Length);
    setIsLight(SortType.Length);
  };

  const toggleReverse = () => {
    setReversed(!reversed);
  };

  const resetList = () => {
    setSortField(SortType.None);
    setReversed(false);
    setIsLight('');
  };

  if (sortField) {
    visibleGoods = visibleGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.Alphabetically:
          return good1.localeCompare(good2);

        case SortType.Length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reversed) {
    visibleGoods = visibleGoods.reverse();
  }

  const goodsIsEqual = Object.keys(visibleGoods).every(
    key => visibleGoods[key] === goodsFromServer[key],
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={handleSortAlphabetically}
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': isLight !== SortType.Alphabetically,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={handleSortByLength}
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': isLight !== SortType.Alphabetically,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={toggleReverse}
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !reversed,
          })}
        >
          Reverse
        </button>

        {!goodsIsEqual && (
          <button
            onClick={resetList}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
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
