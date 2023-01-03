import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';
import { SortType } from './types/SortTypes';

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
  const [visibleGoods, setVisibleGoods] = useState<string[]>([]);
  const [sortType, setSortType] = useState<SortType>(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);

  useEffect(() => {
    const goodsForShow = [...goodsFromServer];

    switch (sortType) {
      case SortType.ALPHABET:
        goodsForShow.sort((a, b) => a.localeCompare(b));
        break;

      case SortType.LENGTH:
        goodsForShow.sort((a, b) => a.length - b.length);
        break;

      default:
    }

    if (isReversed) {
      goodsForShow.reverse();
    }

    setVisibleGoods(goodsForShow);
  }, [sortType, isReversed]);

  const handleParamsReset = () => {
    setSortType(SortType.NONE);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button',
            'is-info',
            { 'is-light': sortType !== SortType.ALPHABET },
          )}
          onClick={() => setSortType(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button',
            'is-success',
            { 'is-light': sortType !== SortType.LENGTH },
          )}
          onClick={() => setSortType(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button',
            'is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {sortType !== SortType.NONE || isReversed
          ? (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={handleParamsReset}
            >
              Reset
            </button>
          )
          : null}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
