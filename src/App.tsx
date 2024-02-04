import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

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
  alphabetically = 'alphabetically',
  length = 'length',
  default = '',
}

const SORT_FIELD_ALPHABETICALLY = SortType.alphabetically;
const SORT_FIELD_LENGTH = SortType.length;

function goodsPrepared(
  goods: string[],
  isSorted: SortType,
  isReversed: boolean,
) {
  let preparedGoods = [...goods];

  switch (isSorted) {
    case SortType.alphabetically:
      preparedGoods.sort((elem1, elem2) => elem1.localeCompare(elem2));
      break;

    case SortType.length:
      preparedGoods.sort((elem1, elem2) => elem1.length - elem2.length);
      break;

    default:
      preparedGoods = [...goods];
      break;
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [isSorted, setSorted] = useState(SortType.default);
  const [isReversed, setReversed] = useState(false);

  const preparedGoods = goodsPrepared(goodsFromServer, isSorted, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            cn(
              'button',
              'is-info',
              { 'is-light': SORT_FIELD_ALPHABETICALLY !== isSorted },
            )
          }
          onClick={() => setSorted(SORT_FIELD_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            cn(
              'button',
              'is-success',
              { 'is-light': SORT_FIELD_LENGTH !== isSorted },
            )
          }
          onClick={() => setSorted(SORT_FIELD_LENGTH)}
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
          onClick={() => setReversed(prev => !prev)}
        >
          Reverse
        </button>

        {(isReversed || isSorted !== '') && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setReversed(false);
              setSorted(SortType.default);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {preparedGoods.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
