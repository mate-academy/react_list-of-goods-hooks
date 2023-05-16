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
  ALPHABET,
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

  visibleGoods.sort((g1, g2): number => {
    switch (sortType) {
      case SortType.ALPHABET:
        return g1.localeCompare(g2);
      case SortType.LENGTH:
        return g1.length - g2.length;
      default:
        return SortType.NONE;
    }
  });
  if (isReversed) {
    visibleGoods.reverse();
  }

  // eslint-disable-next-line no-console
  console.log(sortType, isReversed);

  return visibleGoods;
}

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const getSortAlphabet = () => {
    setSortType(SortType.ALPHABET);
  };

  const getSortLength = () => {
    setSortType(SortType.LENGTH);
  };

  const getSortNone = () => {
    setSortType(SortType.NONE);
    setIsReversed(false);
  };

  const getRevers = () => {
    setIsReversed((prevReverse) => !prevReverse);
  };

  // const { isReversed, sortType } = this.state;
  const goods = getReorderedGoods(goodsFromServer, { sortType, isReversed });
  const buttonPushRevers = isReversed || sortType !== SortType.NONE;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortType !== SortType.ALPHABET,
          })}
          onClick={getSortAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortType !== SortType.LENGTH,
          })}
          onClick={getSortLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': !isReversed,
          })}
          onClick={getRevers}
        >
          Reverse
        </button>
        {buttonPushRevers && (
          <button
            type="button"
            className="button is-info is-light"
            onClick={getSortNone}
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        <ul>
          {goods.map(good => <li data-cy="Good" key={good}>{good}</li>)}
        </ul>
      </ul>
    </div>
  );
};
