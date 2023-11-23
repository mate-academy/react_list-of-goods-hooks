import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
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
  withoutSort = '',
  Alphabetically = 'alphabet',
  Length = 'length',
}

const getPrepearedGoods = (
  goods: string[],
  sortedField: SortType,
  reverse: boolean,
) => {
  const result = [...goods];

  result.sort((a: string, b: string) => {
    switch (sortedField) {
      case SortType.Alphabetically:
        return a.localeCompare(b);
      case SortType.Length:
        return a.length - b.length;
      default:
        return 0;
    }
  });

  if (reverse) {
    result.reverse();
  }

  return result;
};

export const App: React.FC = () => {
  const [sortedField, setSortedField] = React.useState(SortType.withoutSort);
  const [reverse, setReverse] = React.useState(false);
  const goods = [...goodsFromServer];

  const vizibleGoods = getPrepearedGoods(goods, sortedField, reverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            cn('button', 'is-info', {
              'is-light': sortedField !== SortType.Alphabetically,
            })
          }
          onClick={() => setSortedField(SortType.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            cn('button', 'is-success', {
              'is-light': sortedField !== SortType.Length,
            })
          }
          onClick={() => setSortedField(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !reverse,
          })}
          onClick={() => setReverse(!reverse)}
        >
          Reverse
        </button>

        {
          sortedField || reverse ? (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => {
                setSortedField(SortType.withoutSort);
                setReverse(false);
              }}
            >
              Reset
            </button>
          ) : null
        }
      </div>

      <ul>
        {vizibleGoods.map((good) => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
