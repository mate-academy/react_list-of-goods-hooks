import React, { useState } from 'react';
import classNames from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

type PreparedGoods = (a: string[], b: SortType, c: boolean) => string[];
type Props = {
  goods: string[];
};

enum SortType {
  a = 'alphabet',
  l = 'length',
  default = '',
}

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

const prepareGoods: PreparedGoods = (goods, action, reverse) => {
  const preparedGoods = [...goods];

  if (action) {
    switch (action) {
      case SortType.a:
        preparedGoods.sort();
        break;

      case SortType.l:
        preparedGoods.sort((good1, good2) => good1.length - good2.length);
        break;

      default:
        break;
    }
  }

  if (reverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
};

const RenderGoodList: React.FC<Props> = ({ goods }) => {
  return goods.map(good => (
    <li key={good} data-cy="Good">
      {good}
    </li>
  ));
};

export const App = () => {
  const [sortAction, setSortAction] = useState<SortType>(SortType.default);
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const showReset = sortAction || isReversed;
  const handleReset = () => {
    setSortAction(SortType.default);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortAction !== SortType.a,
          })}
          onClick={() => setSortAction(SortType.a)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortAction !== SortType.l,
          })}
          onClick={() => setSortAction(SortType.l)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {showReset && (
          <button
            type="button"
            className={classNames('button', 'is-info')}
            onClick={handleReset}
          >
            Reset
          </button>
        )}

        <ul>
          <RenderGoodList
            goods={prepareGoods(goodsFromServer, sortAction, isReversed)}
          />
        </ul>
      </div>
    </div>
  );
};
