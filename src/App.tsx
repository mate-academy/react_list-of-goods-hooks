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
  NONE,
  ALPABET,
  LENGTH,
}

type ReorderOptions = {
  sortType: SortType,
  isReversed: boolean,
};

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  // eslint-disable-next-line no-console
  console.log(sortType, isReversed);

  visibleGoods.sort((firstGood, secondGood) => {
    switch (sortType) {
      case SortType.ALPABET:
        return firstGood.localeCompare(secondGood);
      case SortType.LENGTH:
        return firstGood.length - secondGood.length;
      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [isReversed, setReverse] = useState(false);

  const [sortType, setSort] = useState(SortType.NONE);

  const visibleGoods = getReorderedGoods(
    goodsFromServer, { isReversed, sortType },
  );

  // reverse = () => {
  //   this.setState(state => ({
  //     isReversed: !state.isReversed,
  //   }));
  // };

  // sortAlphabetically = () => {
  //   this.setState({ sortType: SortType.ALPABET });
  // };

  // sortByLength = () => {
  //   this.setState({ sortType: SortType.LENGTH });
  // };

  // sortByDefault = () => {
  //   this.setState({ sortType: SortType.NONE });
  //   this.setState({ isReversed: false });
  // };

  const isOriginal: boolean = isReversed || sortType !== SortType.NONE;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            classNames('button',
              'is-info',
              { 'is-light': sortType !== SortType.ALPABET })
          }
          onClick={() => setSort(SortType.ALPABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            classNames('button',
              'is-success',
              { 'is-light': sortType !== SortType.LENGTH })
          }
          onClick={() => setSort(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            classNames('button',
              'is-warning',
              { 'is-light': !isReversed })
          }
          onClick={() => setReverse(!isReversed)}
        >
          Reverse
        </button>

        {isOriginal && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setReverse(false);
              setSort(SortType.NONE);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
