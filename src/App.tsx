import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import cn from 'classnames';
import './App.scss';

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
  Alphabetically = 'Alphabetically',
  Length = 'Length',
  Dflt = '',
}

function getPreparingGoods(
  goods: string[],
  sortButtonName: SortType,
  isReversed: boolean,
): string[] {
  let prepareGoods = [...goods];

  switch (sortButtonName) {
    case SortType.Alphabetically: prepareGoods = prepareGoods
      .sort((good1, good2) => (
        good1.localeCompare(good2)
      ));
      break;

    case SortType.Length: prepareGoods = prepareGoods
      .sort((good1, good2) => (
        good1.length - good2.length
      ));
      break;

    default: prepareGoods = [...goodsFromServer];
  }

  if (isReversed) {
    prepareGoods = prepareGoods.reverse();
  }

  return prepareGoods;
}

export const App: React.FC = () => {
  const [sortButtonName, setSortButtonName] = useState<SortType>(SortType.Dflt);
  const [isReversed, setIsReversed] = useState(false);
  const sortField = getPreparingGoods(
    goodsFromServer,
    sortButtonName,
    isReversed,
  );
  const reset = () => {
    setSortButtonName(SortType.Dflt);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            cn(
              'button',
              'is-info',
              { 'is-light': sortButtonName !== SortType.Alphabetically },
            )
          }
          onClick={() => setSortButtonName(SortType.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            cn(
              'button',
              'is-success',
              { 'is-light': sortButtonName !== SortType.Length },
            )
          }
          onClick={() => setSortButtonName(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            cn(
              'button',
              'is-warning',
              { 'is-light': !isReversed },
            )
          }
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(isReversed || sortButtonName) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortField.map(good => (
          <li
            key={good}
            data-cy="Good"
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
