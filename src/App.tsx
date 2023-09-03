import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import GoodList from './components/goodList';

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

enum SortField {
  ALPHABETICALLY = 'name',
  LENGTH = 'length',
}

function getPreparedGoods(
  goods:string[],
  sortField:string,
  isReversed:boolean,
) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortField.ALPHABETICALLY:
          return good1.localeCompare(good2);

        case SortField.LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, sortField, isReversed);
  const isResetButtonVisible = sortField || isReversed;
  const onReset = () => {
    setSortField('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            cn('button', 'is-info',
              { 'is-light': sortField !== SortField.ALPHABETICALLY })
          }
          onClick={() => setSortField(SortField.ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            cn('button', 'is-success',
              { 'is-light': sortField !== SortField.LENGTH })
          }
          onClick={() => setSortField(SortField.LENGTH)}

        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            cn('button', 'is-warning', { 'is-light': !isReversed })
          }
          onClick={() => setIsReversed(!isReversed)}

        >
          Reverse
        </button>

        {isResetButtonVisible && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={onReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <GoodList
          goods={visibleGoods}
        />
      </ul>
    </div>
  );
};
