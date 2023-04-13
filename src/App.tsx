import React, { useMemo, useState } from 'react';
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
  NONE = 0,
  ALPHABET = 1,
  LENGTH = 2,
}

function getReorderedGoods(
  goods: string[],
  trueOrFalse: boolean,
  sortType: SortType,
):string[] {
  const visible = [...goods];

  visible.sort((goodFirst, goodSecond) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return goodFirst.localeCompare(goodSecond);
      case SortType.LENGTH:
        return goodFirst.length - goodSecond.length;
      case SortType.NONE:
        return 0;
      default:
        return 0;
    }
  });

  if (trueOrFalse === true) {
    visible.reverse();
  }

  return visible;
}

export const App: React.FC = () => {
  const copiedData = [...goodsFromServer];
  const [trueOrFalseReverse, reversing] = useState(false);
  const [sortType, sorting] = useState(SortType.NONE);

  const reverse = () => {
    reversing(current => !current);
  };

  const changedArr: string[]
  = useMemo(() => getReorderedGoods(copiedData, trueOrFalseReverse, sortType),
    [copiedData, trueOrFalseReverse, sortType]);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === SortType.ALPHABET ? '' : 'is-light'}`}
          onClick={() => sorting(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === SortType.LENGTH ? '' : 'is-light'}`}
          onClick={() => sorting(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${trueOrFalseReverse ? '' : 'is-light'}`}
          onClick={() => reverse()}
        >
          Reverse
        </button>

        {trueOrFalseReverse || sortType !== SortType.NONE
          ? (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => {
                reversing(false);
                sorting(SortType.NONE);
              }}
            >
              Reset
            </button>
          )
          : null}
      </div>

      <ul>
        <ul>
          {changedArr.map((good) => {
            return <li data-cy="Good" key={good}>{good}</li>;
          })}
        </ul>
      </ul>
    </div>
  );
};
