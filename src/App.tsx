import { FC, useState } from 'react';
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
  options: ReorderOptions,
) {
  const visibleGoods = [...goods];
  const { isReversed, sortType } = options;

  visibleGoods.sort((prevGood, currentGood) => {
    const {
      ALPHABET,
      LENGTH,
    } = SortType;

    switch (sortType) {
      case ALPHABET:
        return prevGood.localeCompare(currentGood);
      case LENGTH:
        return prevGood.length - currentGood.length;
      default:
        return 0;
    }
  });

  return isReversed
    ? visibleGoods.reverse()
    : visibleGoods;
}

export const App: FC = () => {
  const {
    LENGTH,
    ALPHABET,
    NONE,
  } = SortType;
  const [sortType, setSortType] = useState(NONE);
  const [isReversed, setReversed] = useState(false);
  const isSorted = isReversed || (sortType !== NONE);
  const reorderedGoodsList = getReorderedGoods(
    goodsFromServer,
    {
      sortType,
      isReversed,
    },
  );
  const setDefaultState = () => {
    setSortType(NONE);
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortType !== ALPHABET,
          })}
          onClick={() => (setSortType(ALPHABET))}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortType !== LENGTH,
          })}
          onClick={() => (setSortType(LENGTH))}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => (
            setReversed((isReversedState) => (
              !isReversedState
            ))
          )}
        >
          Reverse
        </button>

        {isSorted && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={setDefaultState}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {reorderedGoodsList.map((good, index) => (
            <li key={String(good + index)} data-cy="Good">{good}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
