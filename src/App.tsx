import React from 'react';
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
  Alphabetical = 'Alphabetical',
  Length = 'Length',
  Reset = 'Reset',
  default = 'Default',
}

export const App: React.FC = () => {
  const [sortType, setSortType] = React.useState<SortType>(SortType.default);
  const [isReversed, setIsReversed] = React.useState<boolean>(false);

  const sortGoods = (goods: string[], currentType: SortType): string[] => {
    const sortedGoods = [...goods];

    sortedGoods.sort((a, b) => {
      switch (currentType) {
        case SortType.Alphabetical:
          return a.localeCompare(b);
        case SortType.Length:
          return a.length - b.length;

        default:
          return 0;
      }
    });

    if (isReversed) {
      sortedGoods.reverse();
    }

    return sortedGoods;
  };

  const resetSettings = () => {
    setSortType(SortType.default);
    setIsReversed(false);
  };

  const displayedGoods = sortGoods(goodsFromServer, sortType);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortType !== SortType.Alphabetical,
          })}
          onClick={() => setSortType(SortType.Alphabetical)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortType !== SortType.Length,
          })}
          onClick={() => setSortType(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !isReversed })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortType !== SortType.default || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetSettings}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {displayedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
