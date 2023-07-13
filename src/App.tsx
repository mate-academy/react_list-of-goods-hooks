import React, { useState } from 'react';
import classNames from 'classnames';
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
  Alphabet = 'Sort alphabetically',
  Length = 'Sort by length',
}

type Button = {
  name: SortType | 'Reverse',
  color: 'is-info' | 'is-success' | 'is-warning',
};

const buttons: Button[] = [
  {
    name: SortType.Alphabet,
    color: 'is-info',
  },
  {
    name: SortType.Length,
    color: 'is-success',
  },
  {
    name: 'Reverse',
    color: 'is-warning',
  },
];

let goods = [...goodsFromServer];

function operateGoods(stateSort: string | null, stateReverse: string | null) {
  switch (stateSort) {
    case SortType.Alphabet:
      goods.sort((good1, good2) => good1.localeCompare(good2));
      break;
    case SortType.Length:
      goods.sort((good1, good2) => good1.length - good2.length);
      break;
    default:
      break;
  }

  if (stateReverse) {
    goods = goods.reverse();
  }

  return '';
}

export const App: React.FC = () => {
  const [stateSort, setStateSort] = useState<SortType | 'Reverse' | null>(null);
  const [stateReverse, setStateReverse] = useState<'Reverse' | null>(null);

  goods = [...goodsFromServer];

  operateGoods(stateSort, stateReverse);

  function checkButton(buttonName: SortType | 'Reverse') {
    if (buttonName === 'Reverse') {
      if (stateReverse) {
        setStateReverse(null);
      } else {
        setStateReverse(buttonName);
      }
    } else {
      setStateSort(buttonName);
    }
  }

  function resetButton() {
    setStateSort(null);
    setStateReverse(null);
  }

  return (
    <div className="section content">
      <div className="buttons">

        {buttons.map((button) => {
          const isSort = button.name !== stateSort;
          const isReverse = button.name !== stateReverse;

          return (
            <button
              key={button.name}
              type="button"
              className={classNames(
                'button', button.color, { 'is-light': isSort && isReverse },
              )}
              onClick={() => {
                checkButton(button.name);
              }}
            >
              {button.name}
            </button>
          );
        })}

        {
          (stateSort || stateReverse)
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => {
                resetButton();
              }}
            >
              Reset
            </button>
          )
        }
      </div>

      <ul>
        {goods.map(good => (<li data-cy="Good" key={good}>{good}</li>))}
      </ul>
    </div>
  );
};
