import { useState } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';

enum SortType {
  None = '',
  SortByLength = 'SORT_BY_LENGTH',
  SortByAlphabet = 'SORT_BY_ALPHABET',
}

export const goodsFromServer: string[] = [
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

function getPreparedGoods(goods: string[], sortType: SortType): string[] {
  const preparedGoods = [...goods];

  if (sortType) {
    switch (sortType) {
      case SortType.SortByAlphabet:
        return preparedGoods.sort((good1, good2) => good1.localeCompare(good2));
      case SortType.SortByLength:
        return preparedGoods.sort(
          (good1, good2) => good1.length - good2.length,
        );
      default:
        return preparedGoods;
    }
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.None);
  const [reversed, setReversed] = useState<boolean>(false);
  let visibleGoods = getPreparedGoods(goodsFromServer, sortType);

  if (reversed) {
    visibleGoods = [...visibleGoods].reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          // className="button is-info is-light"
          className={classNames('button', 'is-warning', {
            'is-light': sortType !== SortType.SortByAlphabet,
            'is-warning': sortType === SortType.SortByAlphabet,
          })}
          onClick={() => setSortType(SortType.SortByAlphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          // className="button is-success is-light"
          className={classNames('button', {
            'is-success': sortType === SortType.SortByLength,
            'is-light': sortType !== SortType.SortByLength,
          })}
          onClick={() => setSortType(SortType.SortByLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !reversed,
          })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {(sortType !== SortType.None || reversed) && (
          <button
            type="button"
            className={classNames('button', {
              'is-light': sortType === SortType.None && !reversed,
              'is-warning': sortType !== SortType.None || reversed,
            })}
            onClick={() => {
              setSortType(SortType.None);
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
