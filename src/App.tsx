import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

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
  None = '',
  Alphabetically = 'alphabetically',
  Length = 'length',
}

interface SortingOptions {
  sortMethod: SortType;
  isReversed: boolean;
}

export const App: React.FC = () => {
  const getGoodsToView = (
    goods: string[],
    { sortMethod, isReversed }: SortingOptions,
  ) => {
    let newGoods = [...goods];

    switch (sortMethod) {
      case SortType.Alphabetically:
        newGoods = newGoods.sort((a, b) => a.localeCompare(b));
        break;

      case SortType.Length:
        newGoods = newGoods.sort((a, b) => a.length - b.length);
        break;

      default:
        break;
    }

    if (isReversed) {
      newGoods = newGoods.reverse();
    }

    return newGoods;
  };

  const [sortMethod, setSortMethod] = useState(SortType.None);
  const [isReversed, setIsReversed] = useState(false);
  const GoodsToView: string[] = getGoodsToView(
    goodsFromServer,
    { sortMethod, isReversed },
  );

  const resetSorting = () => {
    setSortMethod(SortType.None);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortMethod(SortType.Alphabetically)}
          type="button"
          className={
            cn('button is-info', {
              'is-light': sortMethod !== SortType.Alphabetically,
            })
          }
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortMethod(SortType.Length)}
          type="button"
          className={
            cn('button is-success', {
              'is-light': sortMethod !== SortType.Length,
            })
          }
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(!isReversed)}
          type="button"
          className={cn('button is-warning', { 'is-light': !isReversed })}

        >
          Reverse
        </button>

        {(sortMethod || isReversed) && (
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
        <ul>
          {GoodsToView.map(good => (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
