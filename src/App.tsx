import classNames from 'classnames';
import React, { useState } from 'react';

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
  SORT_FIELD_ALPHABET = 'alphabet',
  SORT_FIELD_LENGTH = 'length',
  SORT_FIELD_REVERSE = 'reverse',
  NONE = '',
}

function getSortedElements(
  goods: string[],
  sortField: SortType,
  sortReverse: SortType,
) {
  let preparedGoods = [...goods];

  if (sortField) {
    switch (sortField) {
      case SortType.SORT_FIELD_ALPHABET:
        preparedGoods = preparedGoods
          .sort((good1, good2) => good1.localeCompare(good2));
        break;

      case SortType.SORT_FIELD_LENGTH:
        preparedGoods = preparedGoods
          .sort((good1, good2) => good1.length - good2.length);
        break;
      default:
        return preparedGoods;
    }
  }

  if (sortReverse) {
    preparedGoods = preparedGoods.reverse();
  }

  return preparedGoods;
}

function getButtonColor(sortField: SortType, thisSortField: SortType) {
  return sortField !== thisSortField;
}

function ifReversed(reverseField: SortType) {
  return !reverseField
    ? SortType.SORT_FIELD_REVERSE
    : SortType.NONE;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.NONE);
  const [reverseField, setReverseField] = useState<SortType>(SortType.NONE);
  const visibleGoods = getSortedElements(goodsFromServer,
    sortField, reverseField);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortType.SORT_FIELD_ALPHABET)}
          type="button"
          className={classNames(
            'button', 'is-info',
            {
              'is-light': getButtonColor(
                sortField,
                SortType.SORT_FIELD_ALPHABET,
              ),
            },
          )}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortType.SORT_FIELD_LENGTH)}
          type="button"
          className={classNames(
            'button', 'is-success',
            {
              'is-light': getButtonColor(sortField, SortType.SORT_FIELD_LENGTH),
            },
          )}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReverseField(ifReversed(reverseField))}
          type="button"
          className={classNames(
            'button', 'is-warning',
            {
              'is-light': getButtonColor(
                reverseField,
                SortType.SORT_FIELD_REVERSE,
              ),
            },
          )}
        >
          Reverse
        </button>
        {/*
        Button reset shouldnt be visible if sorting and reversing aren't used.
        So we should check, if fields have default value '' (empty string).
        If its true, Reset button is useless, so it should be invisible.
        In the other way, when at least one field have new value, we should render "Reset"
        */}
        {(sortField || reverseField) && (
          <button
            onClick={() => {
              setSortField(SortType.NONE);
              setReverseField(SortType.NONE);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map((good: string) => (
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
