import { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
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
  SortByName = 'alphabet',
  SortByLength = 'length',
  DefaultOption = '',
}

const {
  SortByName,
  SortByLength,
  DefaultOption,
} = SortType;

function getVisibleGoods(
  goods: string[],
  sortType: SortType,
  reverseSelected: boolean,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((good1, good2) => {
    switch (sortType) {
      case SortByName:
        return good1.localeCompare(good2);
      case SortByLength:
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  if (reverseSelected) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App = () => {
  const [sortType, setSortType] = useState(DefaultOption);
  const [reverseStatus, setReverseStatus] = useState(false);
  const visibleGoods = getVisibleGoods(
    goodsFromServer,
    sortType,
    reverseStatus,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortType(SortByName)}
          type="button"
          className={cn(
            'button', 'is-info', {
              'is-light': sortType !== SortByName,
            },
          )}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortType(SortByLength)}
          type="button"
          className={cn(
            'button', 'is-success', {
              'is-light': sortType !== SortByLength,
            },
          )}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            setReverseStatus(!reverseStatus);
          }}
          type="button"
          className={cn(
            'button', 'is-warning', {
              'is-light': !reverseStatus,
            },
          )}
        >
          Reverse
        </button>

        {(sortType || reverseStatus)
          && (
            <button
              onClick={() => {
                setSortType(DefaultOption);
                setReverseStatus(false);
              }}
              type="button"
              className="button is-danger is-light"
            >
              Reset
            </button>
          )}
      </div>

      <ul>
        {visibleGoods.map(good => (
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
