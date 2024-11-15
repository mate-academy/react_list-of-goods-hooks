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
  Default = 'DEFAULT',
  Alphabetically = 'ALPHABETICALLY',
  Length = 'LENGTH',
  Reverse = 'REVERSE',
}

export const App: React.FC = () => {
  const [visibleGoods, setVisibleGoods] = useState(goodsFromServer);
  const [sortField, setSortField] = useState(SortType.Default);

  const [isReversed, setIsReversed] = useState(false);

  const reset = () => {
    setVisibleGoods([...goodsFromServer]);
    setSortField(SortType.Default);
    setIsReversed(false);
  };

  const prepareGoods = (type?: SortType, reversedState?: boolean) => {
    const sortTypeToUse = type || sortField;
    const shouldReverse =
      reversedState !== undefined ? reversedState : isReversed;

    const newGoods = [...goodsFromServer];

    switch (sortTypeToUse) {
      case SortType.Alphabetically:
        newGoods.sort((good1, good2) => good1.localeCompare(good2));
        break;
      case SortType.Length:
        newGoods.sort((good1, good2) => good1.length - good2.length);
        break;
      case SortType.Default:
      default:
        break;
    }

    if (shouldReverse) {
      newGoods.reverse();
    }

    if (type) {
      setSortField(sortTypeToUse);
    }

    setVisibleGoods(newGoods);
  };

  const toggleReverse = () => {
    setIsReversed(prevIsReversed => {
      const newIsReversed = !prevIsReversed;

      prepareGoods(undefined, newIsReversed);

      return newIsReversed;
    });
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortField !== SortType.Alphabetically,
          })}
          onClick={() => prepareGoods(SortType.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortField !== SortType.Length,
          })}
          onClick={() => prepareGoods(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={toggleReverse}
        >
          Reverse
        </button>

        {isReversed || sortField !== SortType.Default ? (
          <button
            type="button"
            onClick={reset}
            className={classNames('button is-danger is-light')}
          >
            Reset
          </button>
        ) : (
          false
        )}
      </div>

      <ul>
        <ul>
          {visibleGoods.map(good => (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
