import 'bulma/css/bulma.css';
import cn from 'classnames';
import { useState } from 'react';
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
  none = '',
  alphabetically = 'alphabetically',
  length = 'length',
}

interface SortingOptions {
  sortMethod: SortType;
  isReversed: boolean;
}

export const App: React.FC = () => {
  const getGoodsToView = (
    goods: string[],
    { sortMethod, isReversed }: SortingOptions,
  ): string[] => {
    let sortedGoods = [...goods];

    switch (sortMethod) {
      case SortType.alphabetically:
        sortedGoods = sortedGoods.sort((a, b) => a.localeCompare(b));
        break;

      case SortType.length:
        sortedGoods = sortedGoods.sort((a, b) => a.length - b.length);
        break;

      default:
        break;
    }

    if (isReversed) {
      sortedGoods = sortedGoods.reverse();
    }

    return sortedGoods;
  };

  const [sortMethod, setSortMethod] = useState(SortType.none);
  const [isReversed, setIsReversed] = useState(false);
  const goodsToView: string[] = getGoodsToView(
    goodsFromServer,
    { sortMethod, isReversed },
  );

  const handleResetSorting = () => {
    setSortMethod(SortType.none);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortMethod(SortType.alphabetically)}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortMethod !== SortType.alphabetically,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortMethod(SortType.length)}
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortMethod !== SortType.length },
          )}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(!isReversed)}
          type="button"
          className={cn('button', 'is-warning', { 'is-light': !isReversed })}
        >
          Reverse
        </button>
        {(sortMethod || isReversed) && (
          <button
            onClick={handleResetSorting}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {goodsToView.map(good => (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
