import React, { useState } from "react";

import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

import GoodsList from "./GoodsList/GoodsList";


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

enum SortType {
  Alphabet = 'alphabet',
  Length = 'length',
  Default = '',
}

type SortBy = {
  sortField: SortType;
  isReverse: boolean;
};

function getPreparedGoods(goods:string[], { sortField, isReverse }:SortBy) {
  let preparedGoods:string[] = [...goods];

  switch (sortField) {
    case SortType.Alphabet:
      preparedGoods.sort();
      break;

    case SortType.Length:
      preparedGoods.sort((good1, good2) => good1.length - good2.length);
      break;

    default:
      break
  }

  if(isReverse){
    preparedGoods = preparedGoods.reverse()
  }

  return preparedGoods

}

export const App:React.FC = () => {
  const [sortField, setSortField] = useState(SortType.Default);
  const [isReverse, setIsReverse] = useState<boolean>(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, { sortField, isReverse });


  return(
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortType.Alphabet,
          })}
          onClick={() => setSortField(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortType.Length,
          })}
          onClick={() => setSortField(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReverse,
          })}
          onClick={() => setIsReverse(!isReverse)}
        >
          Reverse
        </button>

        {(sortField !== '' || isReverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(SortType.Default);
              setIsReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <GoodsList goods={visibleGoods}/>
    </div>
  )

};
