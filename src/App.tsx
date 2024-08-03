import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState } from 'react';
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

type Good = string;

enum SortType {
  Alphabetically = 'alphabetically',
  ByLength = 'by length',
  None = '',
}

type SortParams = {
  sortType: SortType;
  reversed: boolean;
};

function getGoodsToDisplay(goods: Good[], params: SortParams) {
  const result = [...goods];

  switch (params.sortType) {
    case SortType.Alphabetically:
      result.sort((a, b) => a.localeCompare(b));
      break;
    case SortType.ByLength:
      result.sort(({ length: a }, { length: b }) => a - b);
      break;
    case SortType.None:
      break;
  }

  if (params.reversed) {
    result.reverse();
  }

  return result;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const isDefaultOrder = sortType === SortType.None && !isReversed;

  const goodsToDisplay = getGoodsToDisplay(goodsFromServer, {
    sortType: sortType,
    reversed: isReversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortType(SortType.Alphabetically)}
          type="button"
          className={classNames('button is-info', {
            'is-light': sortType !== SortType.Alphabetically,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortType(SortType.ByLength)}
          type="button"
          className={classNames('button is-success', {
            'is-light': sortType !== SortType.ByLength,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(!isReversed)}
          type="button"
          className={classNames('button is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {!isDefaultOrder && (
          <button
            onClick={() => {
              setSortType(SortType.None);
              setIsReversed(false);
            }}
            type="button"
            className="button is-danger"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {goodsToDisplay.map(good => (
            <li key={good} data-cy="Good">
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
