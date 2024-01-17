import { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';
import { SortType, getPreparedGoods } from './utils/utils';
import { GoodList } from './GoodList/GoodList';

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

export const App: React.FC = () => {
  const [isSortedBy, setIsSortedBy] = useState<string>(SortType.DEFAULT);
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    isSortedBy,
    isReversed,
  );

  const Alphabet = () => {
    setIsSortedBy(SortType.ALPHABETICAL);
  };

  const Length = () => {
    setIsSortedBy(SortType.LENGTH);
  };

  const Reverse = () => {
    setIsReversed(!isReversed);
  };

  const reset = () => {
    setIsSortedBy(SortType.DEFAULT);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': isSortedBy !== SortType.ALPHABETICAL,
          })}
          onClick={Alphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': isSortedBy !== SortType.LENGTH,
          })}
          onClick={Length}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={Reverse}
        >
          Reverse
        </button>

        {(isSortedBy || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <GoodList visibleGoods={visibleGoods} />
    </div>
  );
};
