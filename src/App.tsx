import React, { useState } from 'react';
import classnames from 'classnames';
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

enum SortType {
  NONE,
  ALPHABET,
  LENGTH,
}

export function getReorderedGoods(
  goods: string[],
  sortType: SortType,
  reversed: boolean,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((first, next) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return first.localeCompare(next);

      case SortType.LENGTH:
        return first.length - next.length;

      case SortType.NONE:
        return 0;

      default:
        throw new Error('Wrong sort type');
        break;
    }
  });

  if (reversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [reversed, setReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const sortAlphabetically = () => {
    setSortType(SortType.ALPHABET);
  };

  const sortByLength = () => {
    setSortType(SortType.LENGTH);
  };

  const reverseList = () => {
    setReversed(current => !current);
  };

  const resetList = () => {
    setSortType(SortType.NONE);
    setReversed(false);
  };

  const isResetBtnClicked = Boolean(sortType !== SortType.NONE || reversed);
  const reorderedGoods = getReorderedGoods(goodsFromServer, sortType, reversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classnames(
            'button is-info',
            { 'is-light': sortType !== SortType.ALPHABET },
          )}
          onClick={sortAlphabetically}

        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classnames(
            'button is-success',
            { 'is-light': sortType !== SortType.LENGTH },
          )}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classnames(
            'button is-warning',
            { 'is-light': !reversed },
          )}
          onClick={reverseList}
        >
          Reverse
        </button>

        { isResetBtnClicked && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetList}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {reorderedGoods.map(good => (
            <li
              data-cy="Good"
              key={good}
            >
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
