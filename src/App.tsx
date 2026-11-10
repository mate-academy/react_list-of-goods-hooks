import React from 'react';
import classNames from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

enum SortType {
  Default = 'default',
  Alphabetically = 'alphabetically',
  Length = 'length',
}

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

export const App: React.FC = () => {
  const [sortType, setSortType] = React.useState(SortType.Default);
  const [isReversed, setIsReversed] = React.useState(false);

  const goods = [...goodsFromServer];

  if (sortType === SortType.Alphabetically) {
    goods.sort((first, second) => first.localeCompare(second));
  } else if (sortType === SortType.Length) {
    goods.sort((first, second) => first.length - second.length);
  }

  if (isReversed) {
    goods.reverse();
  }

  const reset = () => {
    setSortType(SortType.Default);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortType !== SortType.Alphabetically,
          })}
          onClick={() => setSortType(SortType.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortType !== SortType.Length,
          })}
          onClick={() => setSortType(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(current => !current)}
        >
          Reverse
        </button>

        {(sortType !== SortType.Default || isReversed) && (
          <button type="button" className="button is-danger" onClick={reset}>
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
