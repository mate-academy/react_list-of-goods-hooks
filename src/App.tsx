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
  ReverseOrder = 'reversed',
  DefaultOption = '',
}

const {
  SortByName,
  SortByLength,
  ReverseOrder,
  DefaultOption,
} = SortType;

let isNameSelected = false;
let isLengthSelected = false;
let isReverseSelected = false;

function getPreparedGoods(
  goods: string[],
  sortField: SortType,
  reverseSelection: boolean,
) {
  const preparedGoods = [...goods];

  preparedGoods.sort((good1, good2) => {
    switch (sortField) {
      case SortByName:
        isNameSelected = true;
        isLengthSelected = false;

        return good1.localeCompare(good2);
      case SortByLength:
        isLengthSelected = true;
        isNameSelected = false;

        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  if (reverseSelection) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState(DefaultOption);
  const [reverseField, setReverseField] = useState(DefaultOption);
  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    sortField,
    isReverseSelected,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortByName)}
          type="button"
          className={cn(
            'button', 'is-info', {
              'is-light': !isNameSelected,
            },
          )}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortByLength)}
          type="button"
          className={cn(
            'button', 'is-success', {
              'is-light': !isLengthSelected,
            },
          )}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            isReverseSelected = !isReverseSelected;
            setReverseField(isReverseSelected
              ? ReverseOrder
              : DefaultOption);
          }}
          type="button"
          className={cn(
            'button', 'is-warning', {
              'is-light': !isReverseSelected,
            },
          )}
        >
          Reverse
        </button>

        {(sortField || reverseField)
          && (
            <button
              onClick={() => {
                setSortField(DefaultOption);
                setReverseField(DefaultOption);
                isNameSelected = false;
                isLengthSelected = false;
                isReverseSelected = false;
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
