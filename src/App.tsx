import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { useState } from 'react';

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
  alphabet = 'alphabet',
  length = 'length',
  reverse = 'reverse',
}

interface SomeParams{
  sortText: string;
}

function getReadyGoods(goods: string[], { sortText }: SomeParams) {
  const readyGoods = [...goods];

  if (sortText) {
    readyGoods.sort((good1, good2) => {
      switch (sortText) {
        case SortType.alphabet:
          return good1.localeCompare(good2);

        case SortType.length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  return readyGoods;
}

export const App: React.FC = () => {
  const [sortText, setSortText] = useState('');
  const [reverseText, setReverseText] = useState('');
  let sortedGoods = getReadyGoods(goodsFromServer, { sortText });

  if (sortText !== SortType.reverse && reverseText === SortType.reverse) {
    sortedGoods = sortedGoods.reverse();
  } else if (reverseText === SortType.reverse) {
    sortedGoods = goodsFromServer.reverse();
  } else if (sortText === SortType.alphabet
    && reverseText === SortType.reverse) {
    sortedGoods = getReadyGoods(sortedGoods, { sortText });
  }
  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortText(SortType.alphabet)}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortText !== SortType.alphabet,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortText(SortType.length)}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortText !== SortType.length,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={reverseText ? () => {
            setReverseText('');
          } : () => {
            setReverseText(SortType.reverse);
          }
          }
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': reverseText !== SortType.reverse,
          })}
        >
          Reverse
        </button>

        {(sortText || reverseText) && (
        <button
          onClick={() => {
            setSortText('');
            setReverseText('');
          }}
          type="button"
          className="button is-danger is-light"
        >
          Reset
        </button>
        )}
      </div>

      <ul>
      {sortedGoods.map(good => (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
      ))}
      </ul>
    </div>
  );
};
