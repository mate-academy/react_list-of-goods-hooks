import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { Button } from './Components/Button';

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

const SORT_BY_ALPHABETICALLY = 'alphabet';
const SORT_BY_LENGTH = 'length';
const SORT_BY_REVERSE = 'isReversed';

function getPreparedGood(
  goods: string[],
  sortField: string,
  isReversed: boolean,
): string[] {
  let visibleGoods = [...goods];

  if (sortField) {
    switch (sortField) {
      case SORT_BY_ALPHABETICALLY:
        visibleGoods.sort((good1, good2) => good1.localeCompare(good2));

        break;
      case SORT_BY_LENGTH:
        visibleGoods = [...goodsFromServer].sort((good1, good2) => (
          good1.length - good2.length));

        break;
      default:
        break;
    }
  }

  if (sortField === SORT_BY_REVERSE || isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState('');
  const [visibleGoods, setVisibleGoods] = useState(goodsFromServer);
  const [isReversed, setIsReversed] = useState(false);

  const sortByAlphabeticaly = () => {
    setSortField(SORT_BY_ALPHABETICALLY);
    setVisibleGoods(
      getPreparedGood(visibleGoods, SORT_BY_ALPHABETICALLY, isReversed),
    );
  };

  const sortByLength = () => {
    setSortField(SORT_BY_LENGTH);
    setVisibleGoods(
      getPreparedGood(visibleGoods, SORT_BY_LENGTH, isReversed),
    );
  };

  const sortByReverse = () => {
    setIsReversed(!isReversed);
    setVisibleGoods(
      getPreparedGood(visibleGoods, SORT_BY_REVERSE, isReversed),
    );
  };

  const resetGoods = () => {
    setSortField('');
    setVisibleGoods(goodsFromServer);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <Button
          title="Sort alphabetically"
          classOfTitle={cn('button is-info', {
            'is-light': sortField !== SORT_BY_ALPHABETICALLY,
          })}
          sortFunction={sortByAlphabeticaly}
        />
        <Button
          title="Sort by length"
          classOfTitle={cn('button is-success', {
            'is-light': sortField !== SORT_BY_LENGTH,
          })}
          sortFunction={sortByLength}
        />
        <Button
          title="Reverse"
          classOfTitle={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          sortFunction={sortByReverse}
        />
        {JSON.stringify(visibleGoods)
          !== JSON.stringify(goodsFromServer) && (
          <Button
            title="Reset"
            classOfTitle={cn('button is-danger', {
              'is-light': sortField !== '',
            })}
            sortFunction={resetGoods}
          />
        )}
      </div>

      <ul>
        {
          visibleGoods.map(good => (
            <li
              data-cy="Good"
              key={good}
            >
              {good}
            </li>
          ))
        }
      </ul>
    </div>
  );
};
