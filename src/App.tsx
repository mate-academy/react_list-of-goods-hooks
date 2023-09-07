import React, { useState } from 'react';
import classNames from 'classnames';
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

type ReorderOptions = {
  sortType: SortType,
  isReversed: boolean,
};

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  switch (sortType) {
    case SortType.ALPHABET:
      visibleGoods.sort((a, b) => a.localeCompare(b));
      break;
    case SortType.LENGTH:
      visibleGoods.sort((a, b) => a.length - b.length);
      break;
    default:
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [isReversed, setReverse] = useState<boolean>(false);
  const [sortType, setSortType] = useState<SortType>(SortType.NONE);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button',
            'is-info', { 'is-light': sortType !== SortType.ALPHABET })}
          onClick={() => setSortType(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button',
            'is-info', { 'is-light': sortType !== SortType.LENGTH })}
          onClick={() => setSortType(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button',
            'is-info', { 'is-light': isReversed === false })}
          onClick={() => setReverse(!isReversed)}
        >
          Reverse
        </button>

        {(sortType !== 0 || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setReverse(false);
              setSortType(0);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {getReorderedGoods(goodsFromServer,
            { sortType, isReversed }).map(good => (
            // eslint-disable-next-line @typescript-eslint/indent
              <li key={good} data-cy="Good">{good}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
