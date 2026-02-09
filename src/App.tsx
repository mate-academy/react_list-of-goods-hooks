import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { RenderGoodsList } from './components/GoodsList';
import cn from 'classnames';
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

function prepareGoods(goods: string[], sortKey: SortType, reverse?: boolean) {
  const goodsList = [...goods];

  if (sortKey) {
    goodsList.sort((good1, good2) => {
      switch (sortKey) {
        case SortType.alphabetically:
          return good1.localeCompare(good2);

        case SortType.length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverse) {
    goodsList.reverse();
  }

  return goodsList;
}

export const App: React.FC = () => {
  const [reversed, setReverse] = useState(false);
  const [sortField, setSortField] = useState<SortType>(SortType.default);
  const goods = prepareGoods(goodsFromServer, sortField, reversed);

  return (
    <div className="section content">
      <div className="buttons">
        <Button
          classList={cn('button', 'is-info', {
            'is-light': sortField !== SortType.alphabetically,
          })}
          onChange={() => setSortField(SortType.alphabetically)}
          name={'Sort alphabetically'}
        />

        <Button
          classList={cn('button', 'is-success', {
            'is-light': sortField !== SortType.length,
          })}
          onChange={() => setSortField(SortType.length)}
          name={'Sort by length'}
        />

        <Button
          classList={cn('button', 'is-warning', {
            'is-light': !reversed,
          })}
          onChange={() => setReverse(!reversed)}
          name={'Reverse'}
        />

        {(sortField !== SortType.default || reversed) && (
          <Button
            classList={'button is-danger is-light'}
            onChange={() => {
              setReverse(false);
              setSortField(SortType.default);
            }}
            name={'Reset'}
          />
        )}
      </div>
      <RenderGoodsList goods={goods} />
    </div>
  );
};
