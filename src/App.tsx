import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import classNames from 'classnames';

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

enum SortOptionsEnum {
  ALPHABETICALLY = 'alphabetically',
  BY_LENGTH = 'length',
}

type SortOptions = {
  sortBy: SortOptionsEnum | '';
  reversed: boolean;
};

function prepareGoods(goods: string[], { sortBy, reversed }: SortOptions) {
  let preparedGoods: string[] = [...goods];

  if (sortBy) {
    switch (sortBy) {
      case SortOptionsEnum.ALPHABETICALLY:
        preparedGoods = preparedGoods.sort((a: string, b: string) => {
          return a.localeCompare(b);
        });
        break;
      case SortOptionsEnum.BY_LENGTH:
        preparedGoods = preparedGoods.sort((a: string, b: string) => {
          return a.length - b.length;
        });
        break;
      default:
        break;
    }
  }

  if (reversed) {
    preparedGoods = preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortBy, setSortBy] = useState<SortOptionsEnum | ''>('');
  const [reversed, setReversed] = useState(false);
  const goods: string[] = prepareGoods(goodsFromServer, { sortBy, reversed });
  const resetSorting = () => {
    setSortBy('');
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortBy !== SortOptionsEnum.ALPHABETICALLY,
          })}
          onClick={() => setSortBy(SortOptionsEnum.ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortBy !== SortOptionsEnum.BY_LENGTH,
          })}
          onClick={() => setSortBy(SortOptionsEnum.BY_LENGTH)}
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

        {(sortBy || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetSorting}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map((good: string) => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
