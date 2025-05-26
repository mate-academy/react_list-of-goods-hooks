import { useState } from 'react';
import classNames from 'classnames';
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
  NONE = '',
  ALPHABET = 'alphabetically',
  LENGTH = 'length',
}

export const App: React.FC = () => {
  const [sortBy, setSortBy]= useState<SortType>(SortType.NONE);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  let visibleItems = [...goodsFromServer];

  if (sortBy !== SortType.NONE) {
    visibleItems = [...visibleItems].sort((item1, item2) => {
      switch (sortBy) {
        case SortType.ALPHABET:
          return item1.localeCompare(item2);

        case SortType.LENGTH:
          return item1.length - item2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    visibleItems = visibleItems.toReversed();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortBy !== SortType.ALPHABET,
          })}
          onClick={() => setSortBy(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortBy !== SortType.LENGTH,
          })}
          onClick={() => setSortBy(SortType.LENGTH)}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortBy || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortBy(SortType.NONE);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleItems.map(item => (
          <li data-cy="Good" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
