import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState } from 'react';
import classNames from 'classnames';
import { SortType } from './types/SortType';
import { Button } from './components/Button';

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

interface Props {
  sortField: `${SortType}`;
  isReversed: boolean;
}

function getPreparedGoods(goods: string[], { sortField, isReversed }: Props) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.alphabetically:
          return good1.localeCompare(good2);

        case SortType.byLength:
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

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<`${SortType}`>(SortType.none);
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    isReversed,
  });

  const resetGoods = () => {
    setSortField(SortType.none);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <Button
          value={SortType.alphabetically}
          className={classNames('button is-info', {
            'is-light': sortField !== SortType.alphabetically,
          })}
          onClick={setSortField}
        />

        <Button
          value={SortType.byLength}
          className={classNames('button is-info', {
            'is-light': sortField !== SortType.byLength,
          })}
          onClick={setSortField}
        />

        <Button<boolean>
          value={!isReversed}
          className={classNames('button is-info', {
            'is-light': !isReversed,
          })}
          onClick={setIsReversed}
        />

        {(sortField || isReversed) && (
          <Button
            value=""
            className="button is-danger is-light"
            onClick={resetGoods}
          />
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
