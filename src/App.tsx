import React, { useEffect, useState } from 'react';
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
  NONE,
  ALPHABET,
  LENGTH,
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);
  const [goods, setGoods] = useState(goodsFromServer);

  const handleClickSortByAlphabetically = () => {
    setSortType(SortType.ALPHABET);
  };

  const handleClickSortByLength = () => {
    setSortType(SortType.LENGTH);
  };

  const handleClickReverse = () => {
    setIsReversed(prev => !prev);
  };

  const handleClickReset = () => {
    setSortType(SortType.NONE);
    setIsReversed(false);
  };

  useEffect(() => {
    const visibleGoods = [...goodsFromServer];

    switch (sortType) {
      case SortType.ALPHABET:
        visibleGoods.sort((a, b) => a.localeCompare(b));
        break;

      case SortType.LENGTH:
        visibleGoods.sort((a, b) => a.length - b.length);
        break;

      case SortType.NONE:
      default:
        break;
    }

    if (isReversed) {
      visibleGoods.reverse();
    }

    setGoods(visibleGoods);
  }, [sortType, isReversed]);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortType !== SortType.ALPHABET,
          })}
          onClick={handleClickSortByAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortType !== SortType.LENGTH,
          })}
          onClick={handleClickSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={handleClickReverse}
        >
          Reverse
        </button>

        {(sortType !== SortType.NONE || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleClickReset}
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        {goods.map((good) => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
