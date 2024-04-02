import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

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

enum SortType {
  Name = 'name',
  Length = 'length',
  Default = '',
}

interface SortSpecs {
  sortBy: SortType | null;
  reversed: boolean;
}

export const App = () => {
  const getVisibleGoods = (
    goods: string[],
    { sortBy, reversed }: SortSpecs,
  ): string[] => {
    const modified = [...goods];

    if (sortBy === SortType.Name) {
      modified.sort((g1, g2) => {
        return g1.localeCompare(g2);
      });
    }

    if (sortBy === SortType.Length) {
      modified.sort((g1, g2) => {
        return g1.length - g2.length;
      });
    }

    if (reversed) {
      modified.reverse();
    }

    return modified;
  };

  const [sortBy, setSortBy] = useState<SortType | null>(SortType.Default);
  const [reversed, setReversed] = useState<boolean>(false);
  const prepareGoods = getVisibleGoods(goodsFromServer, { sortBy, reversed });

  const onPageChange = () => {
    setSortBy(SortType.Default);
    setReversed(false);
  }

  const toggleReversed = () => setReversed(!reversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortBy !== SortType.Name,
          })}
          onClick={() =>
            setSortBy(sortBy === SortType.Name ? null : SortType.Name)
          }
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortBy !== SortType.Length,
          })}
          onClick={() =>
            setSortBy(sortBy === SortType.Length ? null : SortType.Length)
          }
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !reversed,
          })}
          onClick={toggleReversed}
        >
          Reverse
        </button>

        {(sortBy || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={onPageChange}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {prepareGoods.map(good => {
          return (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
