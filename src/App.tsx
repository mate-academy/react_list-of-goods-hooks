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

type TypeGood = {
  id: number,
  name: string,
};

enum SortType {
  ALPHABETICALLY = 'Sort alphabetically',
  BY_LENGTH = 'Sort by length',
  Default = '',
}

export const App: React.FC = () => {
  const [value, setValue] = useState<SortType>(SortType.Default);
  const [reversed, setReversed] = useState(false);
  const goodsWithID: TypeGood[] = goodsFromServer
    .map((good, index) => ({ id: index, name: good }));
  const sortedGoods = [...goodsWithID];

  switch (value) {
    case SortType.ALPHABETICALLY: sortedGoods
      .sort((a, b) => a.name.localeCompare(b.name));
      break;
    case SortType.BY_LENGTH: sortedGoods
      .sort((a, b) => a.name.length - b.name.length);
      break;
    case SortType.Default:
    default:
      break;
  }

  if (reversed) {
    sortedGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn({ 'is-light': value !== SortType.ALPHABETICALLY },
            'button', 'is-info')}
          onClick={() => setValue(SortType.ALPHABETICALLY)}
        >
          {SortType.ALPHABETICALLY}
        </button>

        <button
          type="button"
          className={cn({ 'is-light': value !== SortType.BY_LENGTH },
            'button', 'is-success')}
          onClick={() => setValue(SortType.BY_LENGTH)}
        >
          {SortType.BY_LENGTH}
        </button>

        <button
          type="button"
          className={cn({ 'is-light': !reversed },
            'button', 'is-warning')}
          onClick={reversed
            ? () => setReversed(false)
            : () => setReversed(true)}
        >
          Reverse
        </button>

        {(value || reversed) && (
          <button
            type="button"
            className="button is-danger"
            onClick={() => {
              setValue(SortType.Default);
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li key={good.id} data-cy="Good">{good.name}</li>
        ))}
      </ul>
    </div>
  );
};
