import React from 'react';
import 'bulma/css/bulma.css';
import cn from 'classnames';
import './App.scss';
import { GoodList } from './components/GoodList/GoodList';
import { Sortfield } from './types/Sortfield';

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

function getPreparedGoods(
  goods: string[], { sortField, isReveresed },
): string[] {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case Sortfield.name:
          return good1.localeCompare(good2);

        case Sortfield.length:
          return good1[sortField] - good2[sortField];

        default:
          return 0;
      }
    });
  }

  if (isReveresed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState('');
  const [isReveresed, setIsReversed] = useState(false);

  const visibleGoods = getPreparedGoods(
    goodsFromServer, { sortField, isReveresed },
  );

  const reverse = () => setIsReversed((prevState: string) => !prevState);

  const reset = () => {
    setSortField('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">

        <button
          onClick={() => setSortField(Sortfield.name)}
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortField !== Sortfield.name },
          )}

        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(Sortfield.length)}
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortField !== Sortfield.length },
          )}
        >
          Sort by length
        </button>

        <button
          onClick={reverse}
          type="button"
          className={cn(
            'button',
            'is-warning',
            { 'is-light': !isReveresed },
          )}
        >
          Reverse
        </button>

        {(sortField || isReveresed) && (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}

      </div>

      <GoodList goods={visibleGoods} />
    </div>
  );
};
