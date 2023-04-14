import React, { useMemo, useState } from 'react';
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
  NONE = 0,
  ALPHABET = 1,
  LENGTH = 2,
}

function getReorderedGoods(
  goods: string[],
  isReversed: boolean,
  sortType: SortType,
):string[] {
  const visibleGoods = [...goods];

  visibleGoods.sort((goodFirst, goodSecond) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return goodFirst.localeCompare(goodSecond);
      case SortType.LENGTH:
        return goodFirst.length - goodSecond.length;
      case SortType.NONE:
      default:
        return 0;
    }
  });

  return isReversed ? visibleGoods.reverse() : visibleGoods;

  return visibleGoods;
}

export const App: React.FC = () => {
  const copiedData = [...goodsFromServer];
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const reverse = () => {
    setIsReversed(prevState => !prevState);
  };

  const onReset = () => {
    setIsReversed(false);

    setSortType(SortType.NONE);
  };

  const changedArr: string[] = useMemo(
    () => getReorderedGoods(copiedData, isReversed, sortType),
    [copiedData, isReversed, sortType],
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === SortType.ALPHABET ? '' : 'is-light'}`}
          onClick={() => setSortType(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === SortType.LENGTH ? '' : 'is-light'}`}
          onClick={() => setSortType(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={reverse}
        >
          Reverse
        </button>

        {(isReversed || sortType !== SortType.NONE) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={onReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {changedArr.map((good) => (
            <li data-cy="Good" key={good}>{good}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
