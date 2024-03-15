import { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

type Good = string;

const enum SortModes {
  Default,
  Length,
  Alpabetically,
}

type SortGoodsOptions = {
  sortMode: SortModes;
  isReversed: boolean;
};

export const goodsFromServer: Good[] = [
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

function sortGoods(goods: Good[], { sortMode, isReversed }: SortGoodsOptions) {
  const copiedGoods = [...goods];

  if (sortMode) {
    copiedGoods.sort((a, b) => {
      switch (sortMode) {
        case SortModes.Alpabetically:
          return a.localeCompare(b);
        case SortModes.Length:
          return a.length - b.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    copiedGoods.reverse();
  }

  return copiedGoods;
}

export const App = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortMode, setSortMode] = useState(SortModes.Default);

  const preparedGoods = sortGoods(goodsFromServer, {
    isReversed,
    sortMode,
  });

  const resetSorting = () => {
    setSortMode(SortModes.Default);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortMode !== SortModes.Alpabetically,
          })}
          onClick={() => setSortMode(SortModes.Alpabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortMode !== SortModes.Length,
          })}
          onClick={() => setSortMode(SortModes.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(prevAreReversed => !prevAreReversed)}
        >
          Reverse
        </button>

        {Boolean(isReversed || sortMode) && (
          <button
            onClick={resetSorting}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {preparedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
