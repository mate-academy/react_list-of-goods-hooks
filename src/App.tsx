import { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';
import { getPreparedGood } from './utils/getPreparedGood';
import { Good } from './types/Good';
import { SortField } from './types/SortField';
import { ListOfGoods } from './components/ListOfGoods';

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

const goods: Good[] = goodsFromServer.map((name, id) => ({
  name,
  id,
}));

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortField.NOSORT);
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGood(goods, { sortField, isReversed });

  const isVisibleResetButton = sortField !== SortField.NOSORT || isReversed;
  const handleReset = () => {
    setSortField(SortField.NOSORT);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortField.ALPHABETIC,
          })}
          onClick={() => setSortField(SortField.ALPHABETIC)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortField.BYLENGTH,
          })}
          onClick={() => setSortField(SortField.BYLENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {isVisibleResetButton && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ListOfGoods visibleGoods={visibleGoods} />
    </div>
  );
};
