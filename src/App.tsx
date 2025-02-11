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

enum SortType {
  Default = 'Default',
  Alphabetically = 'Sort alphabetically',
  ByLength = 'Sort by length',
}

export const App: React.FC = () => {
  const [sortField, setSortfield] = useState<SortType>(SortType.Default);

  let visibleGoods = [...goodsFromServer].sort((good1, good2) => {

    switch (sortField) {
      case SortType.Alphabetically:
        return good1.localeCompare(good2);
      case SortType.ByLength:
        return good1.length - good2.length;
      default:
        return 0;
    }
  });
  const [reversed, setReversed] = useState<boolean>(false);

  if (reversed) {
    visibleGoods = visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortField !== SortType.Alphabetically,
          })}
          onClick={() => setSortfield(SortType.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortField !== SortType.ByLength,
          })}
          onClick={() => setSortfield(SortType.ByLength)}
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

        {(sortField !== SortType.Default || reversed) && (
          <button
            type="button"
            className={classNames('button', 'is-danger', 'is-light')}
            onClick={() => {
              setSortfield(SortType.Default);
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>
      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
