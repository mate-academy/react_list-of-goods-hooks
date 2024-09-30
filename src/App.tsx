import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import cn from 'classnames';

import './App.scss';
import { SortType } from './types/SortType';
import { goodsFromServer } from './mocks';
import { getPreparedGoods } from './utils/getPreparedGoods';

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType | ''>('');
  const [isReversed, setIsReversed] = useState(false);

  const handleClear = () => {
    setSortField('');
    setIsReversed(false);
  };

  const isChanged = sortField !== '' || isReversed;

  const goods = getPreparedGoods(goodsFromServer, { sortField, isReversed });

  const buttons = [
    {
      name: 'Sort alphabetically',
      className: cn('is-info', { 'is-light': sortField !== SortType.Alphabet }),
      handleClick() {
        setSortField(SortType.Alphabet);
      },
    },
    {
      name: 'Sort by length',
      className: cn('is-success', {
        'is-light': sortField !== SortType.Length,
      }),
      handleClick() {
        setSortField(SortType.Length);
      },
    },
    {
      name: 'Reverse',
      className: cn('is-warning', { 'is-light': !isReversed }),
      handleClick() {
        setIsReversed(prevState => !prevState);
      },
    },
  ];

  return (
    <div className="section content">
      <div className="buttons">
        {buttons.map(button => (
          <button
            type="button"
            className={cn(`button ${button.className}`)}
            onClick={button.handleClick}
            key={button.name}
          >
            {button.name}
          </button>
          // eslint-disable-next-line prettier/prettier
        ))}

        {isChanged && (
          <button
            type="button"
            className={cn('button is-danger is-light')}
            onClick={handleClear}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
