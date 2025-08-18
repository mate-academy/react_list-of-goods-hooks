import * as React from 'react';
import { useState } from 'react';
import classNames from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';
import GoodsList from './components/GoodList/GoodList';

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
  Alphabetically = 'Sort alphabetically',
  ByLength = 'Sort by length',
  None = '',
}

interface PrepareOptions {
  sortField: SortType;
  reversed: boolean;
}

const getPreparedGoods = (
  goods: string[],
  { sortField, reversed }: PrepareOptions,
): string[] => {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((a, b) => {
      switch (sortField) {
        case SortType.Alphabetically:
          return a.localeCompare(b);
        case SortType.ByLength:
          return a.length - b.length;
        default:
          return 0;
      }
    });
  }

  if (reversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.None);
  const [reversed, setReversed] = useState<boolean>(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    reversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        {[SortType.Alphabetically, SortType.ByLength].map(field => (
          <button
            key={field}
            className={classNames('button', 'is-info', {
              'is-light': sortField !== field,
            })}
            onClick={() => setSortField(field)}
            type="button"
          >
            {field}
          </button>
        ))}

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !reversed,
          })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {(sortField || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(SortType.None);
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <GoodsList goods={visibleGoods} />
    </div>
  );
};
