import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { GoodsList } from './components/GoodList/GoodList';
import { goodsFromServer } from './api/data';

interface SortTypes {
  ALPHA: string;
  LENGTH: string;
  NONE: string;
}

const sortFields: SortTypes = {
  ALPHA: 'alphabet',
  LENGTH: 'length',
  NONE: 'string',
};

function getPreparedGoods(
  goods: string[],
  sortField: string,
  isReversedField: boolean,
) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((a, b) => {
      switch (sortField) {
        case sortFields.ALPHA:
          return a.localeCompare(b);

        case sortFields.LENGTH:
          return a.length - b.length;

        default:
          return 0;
      }
    });
  }

  if (isReversedField) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState('');
  const [isReversedField, setIsReversedField] = useState(false);
  const list = getPreparedGoods(goodsFromServer, sortField, isReversedField);

  function resetStates() {
    setIsReversedField(false);
    setSortField('');
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(sortFields.ALPHA)}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== sortFields.ALPHA,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(sortFields.LENGTH)}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== sortFields.LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversedField(prev => !prev)}
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversedField,
          })}
        >
          Reverse
        </button>

        {(isReversedField || sortField) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetStates}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <GoodsList goods={list} />
      </ul>
    </div>
  );
};
