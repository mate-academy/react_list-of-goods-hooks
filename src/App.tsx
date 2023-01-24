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
  const [isReversed, setReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);
  const [renderedGoods, setRenderedGoods] = useState<string[]>([]);
  const isRessetable = isReversed || sortType !== SortType.NONE;

  const getReorderedGoods = (
    goods: string[],
    isGoodReversed: boolean,
    goodSortType: SortType,
  ) => {
    const visibleGoods = [...goods];

    visibleGoods.sort((firstGood, SecondGood) => {
      switch (goodSortType) {
        case SortType.ALPHABET:
          return firstGood.localeCompare(SecondGood);
        case SortType.LENGTH:
          return firstGood.length - SecondGood.length;

        default:
          return 0;
      }
    });

    if (isGoodReversed) {
      visibleGoods.reverse();
    }

    return visibleGoods;
  };

  useEffect(() => {
    setRenderedGoods(getReorderedGoods(goodsFromServer, isReversed, sortType));
  }, [isReversed, sortType]);

  const reverse = () => {
    setReversed(prevValue => !prevValue);
  };

  const setSorting = (sortingType: SortType) => {
    setSortType(sortingType);
  };

  const reset = () => {
    setReversed(false);
    setSorting(SortType.NONE);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button',
            'isInfo',
            { 'is-light': sortType !== SortType.ALPHABET },
          )}
          onClick={() => setSorting(SortType.ALPHABET)}
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
          onClick={() => setSorting(SortType.LENGTH)}
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
          onClick={reverse}
        >
          Reverse
        </button>

        {isRessetable && (
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
        <ul>
          {renderedGoods.map(good => (
            <li key={good} data-cy="Good">{good}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
