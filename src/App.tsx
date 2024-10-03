import cn from 'classnames';
import { useState } from 'react';
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
  ALPHABET = 'alphabet',
  LENGTH = 'length',
  DEFAULT = 'default',
}

const handleSort = (
  type: SortType,
  setGoods: React.Dispatch<React.SetStateAction<string[]>>,
  isReversed: boolean,
) => {
  let sortedGoods = [...goodsFromServer];

  switch (type) {
    case SortType.ALPHABET:
      sortedGoods.sort();
      break;
    case SortType.LENGTH:
      sortedGoods.sort((a, b) => a.length - b.length);
      break;
    default:
      sortedGoods = [...goodsFromServer];
  }

  if (isReversed) {
    sortedGoods.reverse();
  }

  setGoods(sortedGoods);
};

const handleReverse = (
  setGoods: React.Dispatch<React.SetStateAction<string[]>>,
  setIsReversed: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  setGoods(prevGoods => [...prevGoods].reverse());
  setIsReversed(prevIsReversed => !prevIsReversed);
};

export const App: React.FC = () => {
  const [goods, setGoods] = useState<string[]>(goodsFromServer);
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const [sortType, setSortType] = useState<SortType>(SortType.DEFAULT);

  const shouldShowResetButton =
    (sortType !== SortType.DEFAULT || isReversed) &&
    JSON.stringify(goods) !== JSON.stringify(goodsFromServer);

  const handleReset = () => {
    setGoods(goodsFromServer);
    setSortType(SortType.DEFAULT);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortType !== SortType.ALPHABET,
          })}
          onClick={() => {
            handleSort(SortType.ALPHABET, setGoods, isReversed);
            setSortType(SortType.ALPHABET);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortType !== SortType.LENGTH,
          })}
          onClick={() => {
            handleSort(SortType.LENGTH, setGoods, isReversed);
            setSortType(SortType.LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => handleReverse(setGoods, setIsReversed)}
        >
          Reverse
        </button>

        {shouldShowResetButton && (
          <button
            type="button"
            className="button is-danger"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
