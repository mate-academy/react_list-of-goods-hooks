import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { GoodList } from './Components/GoodList';

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

const SORT_FIELD_ALPH = 'alph';
const SORT_FIELD_LENGTH = 'length';

enum SortType {
  alph = SORT_FIELD_ALPH,
  length = SORT_FIELD_LENGTH,
}

function setSortGoods(goods: string[], sortField: SortType | '') {
  const sortGoods = [...goods];

  if (sortField) {
    sortGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.alph:
          return good1.localeCompare(good2);
        case SortType.length:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  return sortGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType | ''>('');
  const [reversed, setReversed] = useState(false);
  let visibleGoods = setSortGoods(goodsFromServer, sortField);

  if (reversed) {
    visibleGoods = [...visibleGoods].reverse();
  }

  const isInitialOrder = visibleGoods.join(',') === goodsFromServer.join(',');

  const handleReset = () => {
    setSortField('');
    setReversed(false);
  };

  const shouldShowResetButton = !isInitialOrder || reversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SORT_FIELD_ALPH,
          })}
          onClick={() => setSortField(SortType.alph)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
          onClick={() => setSortField(SortType.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !reversed,
          })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {shouldShowResetButton && (
          <button
            type="button"
            className={cn('button', 'is-warning', 'is-light')}
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <GoodList goods={visibleGoods} />
    </div>
  );
};
