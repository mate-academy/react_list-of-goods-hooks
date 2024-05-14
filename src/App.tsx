import React from 'react';
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
  Alphabet = 'alphabet',
  Length = 'length',
}

type Filter = {
  isLight: SortType | '';
  isReverse: boolean;
};

type Props = {
  good: string;
};

const Good: React.FC<Props> = ({ good }) => <li data-cy="Good">{good}</li>;

function sortGoods(goods: string[], { isLight, isReverse }: Filter) {
  let preparedGoods = [...goods];

  if (isLight) {
    preparedGoods.sort((good1, good2) => {
      switch (isLight) {
        case SortType.Alphabet:
          return good1.localeCompare(good2);
        case SortType.Length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    preparedGoods = preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [isLight, setIsLight] = useState<SortType | ''>('');
  const [isReverse, setIsReverse] = useState<boolean>(false);
  const visibleGoods = sortGoods(goodsFromServer, { isLight, isReverse });

  const reverse = () => {
    setIsReverse(!isReverse);
  };

  const reset = () => {
    setIsLight('');
    setIsReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': isLight !== SortType.Alphabet,
          })}
          onClick={() => setIsLight(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': isLight !== SortType.Length,
          })}
          onClick={() => setIsLight(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': isReverse ? '' : 'is-light',
          })}
          onClick={reverse}
        >
          Reverse
        </button>

        {(isLight || isReverse) && (
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
        {visibleGoods.map(good => (
          <Good good={good} key={good} />
        ))}
      </ul>
    </div>
  );
};
