import { useState } from 'react';
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
  NONE = 'none',
  ALPHABET = 'alphabet',
  LENGTH = 'length',
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

  visibleGoods.sort((a, b) => {
    switch (sortType) {
      case 'none':
        return 0;
      case 'alphabet':
        return a.localeCompare(b);
      case 'length':
        return a.length - b.length;
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
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);
  const currentReverse = () => {
    setIsReversed(value => !value);
  };

  const data = getReorderedGoods(
    goodsFromServer, { sortType, isReversed },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            classNames(
              'button is-info',
              { 'is-light': sortType !== 'alphabet' },
            )
          }
          onClick={() => {
            setSortType(SortType.ALPHABET);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            classNames(
              'button is-success',
              { 'is-light': sortType !== 'length' },
            )
          }
          onClick={() => {
            setSortType(SortType.LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            classNames(
              'button is-warning',
              { 'is-light': !isReversed },
            )
          }
          onClick={() => {
            currentReverse();
          }}
        >
          Reverse
        </button>

        {
          (sortType !== 'none' || isReversed)
            && (
              <button
                type="button"
                className="button is-danger is-light"
                onClick={() => {
                  setSortType(SortType.NONE);
                  setIsReversed(false);
                }}
              >
                Reset
              </button>
            )
        }
      </div>

      <ul>
        {data.map((item) => (
          <li
            data-cy="Good"
            key={item}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
