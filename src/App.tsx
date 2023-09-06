import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import React, { useEffect, useState } from 'react';

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

const SORT_FIELDS = {
  alphabet: 'alphabet',
  length: 'length',
};

function getSortedGoods(sortField: string, isReversed = false) {
  const preparedGoods = [...goodsFromServer];

  if (sortField) {
    preparedGoods.sort((goodA: string, goodB: string) => {
      switch (sortField) {
        case SORT_FIELDS.alphabet:
          return goodA.localeCompare(goodB);

        case SORT_FIELDS.length:
          return goodA.length - goodB.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const [visibleGoods, setVisibleGoods] = useState<string[]>([]);
  const isShowResetButton = sortField || isReversed;

  useEffect(() => {
    setVisibleGoods(getSortedGoods(sortField, isReversed));
  }, [sortField, isReversed]);

  const handleButtonReset = () => {
    setSortField('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SORT_FIELDS.alphabet)}
          className={cn(
            'button',
            'is-info',
            {
              'is-light': sortField !== SORT_FIELDS.alphabet,
            },
          )}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField(SORT_FIELDS.length)}
          className={cn(
            'button',
            'is-success',
            {
              'is-light': sortField !== SORT_FIELDS.length,
            },
          )}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setIsReversed(!isReversed)}
          className={cn(
            'button',
            'is-warning',
            {
              'is-light': !isReversed,
            },
          )}
        >
          Reverse
        </button>

        {
          isShowResetButton && (
            <button
              type="button"
              onClick={handleButtonReset}
              className="button is-danger is-light"
            >
              Reset
            </button>
          )
        }
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
