import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

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
  ALPHA = 'alphabet',
  LENGTH = 'length',
  INITIAL = '',
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.INITIAL);
  const [reversed, setReversed] = useState(false);

  let visibleGoods = [...goodsFromServer];

  visibleGoods.sort((good1, good2) => {
    switch (sortField) {
      case SortType.ALPHA:
        return good1.localeCompare(good2);
      case SortType.LENGTH:
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  visibleGoods = reversed ? visibleGoods.reverse() : visibleGoods;

  const handleReset = () => {
    setSortField(SortType.INITIAL);
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortType.ALPHA)}
          type="button"
          className={classNames('button is-info', {
            'is-light': sortField !== SortType.ALPHA,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortType.LENGTH)}
          type="button"
          className={classNames('button is-success', {
            'is-light': sortField !== SortType.LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReversed(!reversed)}
          type="button"
          className={classNames('button is-warning', {
            'is-light': reversed !== true,
          })}
        >
          Reverse
        </button>

        {sortField !== SortType.INITIAL || reversed ? (
          <button
            onClick={handleReset}
            type="button"
            className="button is-danger"
          >
            Reset
          </button>
        ) : null}
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
