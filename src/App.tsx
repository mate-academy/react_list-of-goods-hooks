import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
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

type Goods = string;
type Reverse = boolean;

enum Sortfield {
  ALPHABET = 'alphabet',
  LENGTH = 'length',
  DEFAULT = '',
}

type Props = {
  goods: Goods[];
};

const GoodsList: React.FC<Props> = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <li data-cy="Good" key={good}>
        {good}
      </li>
    ))}
  </ul>
);

function getPrepareGoods(
  goods: Goods[],
  sortGood: Sortfield | undefined,
  reverse: Reverse,
): Goods[] {
  const prepareGoods: Goods[] = [...goods];

  if (prepareGoods) {
    prepareGoods.sort((good1, good2) => {
      switch (sortGood) {
        case Sortfield.ALPHABET:
          return good1.localeCompare(good2);

        case Sortfield.LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverse) {
    prepareGoods.reverse();
  }

  return prepareGoods;
}

export const App: React.FC = () => {
  const [sortGood, setSortGood] = useState<Sortfield>(Sortfield.DEFAULT);
  const [reverse, setReverse] = useState<Reverse>(false);
  const visibleGoods = getPrepareGoods(goodsFromServer, sortGood, reverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortGood(Sortfield.ALPHABET)}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortGood !== Sortfield.ALPHABET,
          })}
        >
          Sort alphabetically
        </button>
        <button
          onClick={() => setSortGood(Sortfield.LENGTH)}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortGood !== Sortfield.LENGTH,
          })}
        >
          Sort by length
        </button>
        <button
          onClick={() => setReverse(!reverse)}
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': reverse !== true,
          })}
        >
          Reverse
        </button>
        {(sortGood || reverse) && (
          <button
            onClick={() => {
              setSortGood(Sortfield.DEFAULT);
              setReverse(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <GoodsList goods={visibleGoods} />
    </div>
  );
};
