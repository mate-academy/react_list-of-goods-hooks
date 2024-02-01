import 'bulma/css/bulma.css';
import './App.scss';
import React, { useMemo, useState } from 'react';
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

type Goods = string[];

interface SortSettings {
  sortValue?: string,
  isReversed?: boolean,
}

const defaultSortSettings: SortSettings = { sortValue: '', isReversed: false };

enum SortType {
  sortByLength = 'byLength',
  sortByAlphabet = 'ByAlphabet',
}

enum SortKeys {
  sortValueKey = 'sortValue',
  reverseValueKey = 'isReversed',
}

function sortGoods(
  goods: Goods,
  { sortValue, isReversed }: SortSettings,
): Goods {
  const sortedGoods = [...goods];

  if (sortValue) {
    sortedGoods.sort((good1, good2) => {
      switch (sortValue) {
        case SortType.sortByLength:
          return good1.length - good2.length;
        case SortType.sortByAlphabet:
          return good1.localeCompare(good2);
        default:
          return 0;
      }
    });
  }

  return isReversed ? sortedGoods.reverse() : sortedGoods;
}

export const App: React.FC = () => {
  const [sortSettings, setSortSettings] = useState(defaultSortSettings);

  const goods = useMemo(
    () => sortGoods(goodsFromServer, sortSettings),
    [sortSettings],
  );

  const { sortValue, isReversed } = sortSettings;

  const handleSortClick = (key: SortKeys, value: SortType | boolean) => () => {
    setSortSettings({ ...sortSettings, [key]: value });
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={handleSortClick(
            SortKeys.sortValueKey,
            SortType.sortByAlphabet,
          )}
          className={cn('button is-info', {
            'is-light': sortValue !== SortType.sortByAlphabet,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={handleSortClick(
            SortKeys.sortValueKey,
            SortType.sortByLength,
          )}
          className={cn('button is-success', {
            'is-light': sortValue !== SortType.sortByLength,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={handleSortClick(SortKeys.reverseValueKey, !isReversed)}
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {(sortValue || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => setSortSettings(defaultSortSettings)}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (<li data-cy="Good" key={good}>{good}</li>))}
      </ul>
    </div>
  );
};
