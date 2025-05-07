import React from 'react';
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
  NONE,
  ALPHABET,
  LENGTH,
}

type ReorderOptions = {
  sortType: SortType;
  isReversed: boolean;
};

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  try {
    switch (sortType) {
      case SortType.ALPHABET:
        visibleGoods.sort();
        break;
      case SortType.LENGTH:
        visibleGoods.sort((a, b) => {
          return a.length - b.length;
        });
        break;
    }
  } catch (e) {
    throw e;
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [isReversed, setReversed] = React.useState(false);
  const [sortType, setSortType] = React.useState(SortType.NONE);

  const alphabetLight = classNames('button is-info', {
    'is-light': sortType !== SortType.ALPHABET,
  });
  const lengthLight = classNames('button is-info', {
    'is-light': sortType !== SortType.LENGTH,
  });
  const reverseLight = classNames('button is-info', {
    'is-light': !isReversed,
  });

  const vResetButton = isReversed || sortType !== SortType.NONE;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${alphabetLight}`}
          onClick={() => setSortType(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${lengthLight}`}
          onClick={() => setSortType(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reverseLight}`}
          onClick={() => setReversed(p => !p)}
        >
          Reverse
        </button>

        {vResetButton && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortType(SortType.NONE);
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <div>
        <ul>
          {getReorderedGoods(goodsFromServer, { sortType, isReversed }).map(
            (good, index) => (
              <li key={index} data-cy="Good">
                {good}
              </li>
            ),
          )}
        </ul>
      </div>
    </div>
  );
};
