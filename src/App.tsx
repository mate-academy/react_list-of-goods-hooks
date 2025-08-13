import React from 'react';
import cn from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';

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
  Default,
  Alphabet,
  Length,
}

type ModifyParams = {
  sortMethod: SortType;
  reversed: boolean;
};

function prepareGoods(
  goods: string[],
  { sortMethod, reversed }: ModifyParams,
): string[] {
  const visibleGoods = [...goods];

  if (sortMethod !== SortType.Default) {
    visibleGoods.sort((a: string, b: string) => {
      switch (sortMethod) {
        case SortType.Alphabet:
          return a.localeCompare(b);
        case SortType.Length:
          return a.length - b.length;
        default:
          return 0;
      }
    });
  }

  if (reversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortMethod, setSortMethod] = React.useState<SortType>(
    SortType.Default,
  );
  const [reversed, setReversed] = React.useState(false);

  const visibleGoods = prepareGoods(goodsFromServer, { sortMethod, reversed });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortMethod !== SortType.Alphabet,
          })}
          onClick={() => setSortMethod(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortMethod !== SortType.Length,
          })}
          onClick={() => setSortMethod(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-info', {
            'is-light': !reversed,
          })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {(sortMethod !== SortType.Default || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setReversed(false);
              setSortMethod(SortType.Default);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {visibleGoods.map(good => (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
