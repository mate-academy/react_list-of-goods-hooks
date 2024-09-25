import 'bulma/css/bulma.css';
import cn from 'classnames';
import React, { useState } from 'react';
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
  byAlphabet = 'byAlphabet',
  byLength = 'byLength',
}

type SortConfig = {
  type: string | null;
  reversed: boolean;
};

export const App: React.FC = () => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    type: '',
    reversed: false,
  });

  const handleSort = (goods: string[], config: SortConfig) => {
    const newSortedGoods = [...goods];

    switch (config.type) {
      case SortType.byAlphabet:
        newSortedGoods.sort((a, b) => a.localeCompare(b));
        break;
      case SortType.byLength:
        newSortedGoods.sort((a, b) => a.length - b.length);
        break;
      default:
        break;
    }

    if (config.reversed) {
      newSortedGoods.reverse();
    }

    return newSortedGoods;
  };

  const sortedGoods = handleSort(goodsFromServer, sortConfig);

  const handleReverse = () => {
    setSortConfig(prevConfig => ({
      ...prevConfig,
      reversed: !prevConfig.reversed,
    }));
  };

  const handleReset = () => {
    setSortConfig({ type: '', reversed: false });
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortConfig.type !== 'byAlphabet',
          })}
          onClick={() =>
            setSortConfig({ ...sortConfig, type: SortType.byAlphabet })
          }
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortConfig.type !== 'byLength',
          })}
          onClick={() =>
            setSortConfig({ ...sortConfig, type: SortType.byLength })
          }
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !sortConfig.reversed,
          })}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {(sortConfig.type || sortConfig.reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(item => (
          <li data-cy="Good" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
