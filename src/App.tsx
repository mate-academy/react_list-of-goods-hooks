import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

import clsx from 'clsx';

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
  NAME = 'Sort alphabetically',
  LENGTH = 'Sort by length',
  RESET = '',
}

type SortParams = {
  sortField: SortType;
  reversed: boolean;
};

function getPreparedGoods(
  goods: string[],
  { sortField, reversed }: SortParams,
) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.NAME:
          return good1.localeCompare(good2);

        case SortType.LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const GoodList: React.FC<{ goods: string[] }> = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <li key={good} id={good} data-cy="Good">
        {good}
      </li>
    ))}
  </ul>
);

export type SortButtonProps = {
  nameField: SortType;
  isActive: boolean;
  onClick: (field: SortType) => void;
};

export const SortButton: React.FC<SortButtonProps> = ({
  nameField,
  isActive,
  onClick,
}) => (
  <button
    type="button"
    onClick={() => onClick(nameField)}
    className={clsx('button is-info', { 'is-light': !isActive })}
  >
    {nameField}
  </button>
);

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.RESET);
  const [reversed, setReversed] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    reversed,
  });

  const onSort = (field: SortType) => setSortField(field);

  const onReset = () => {
    setSortField(SortType.RESET);
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        {[SortType.NAME, SortType.LENGTH].map(field => (
          <SortButton
            key={field}
            nameField={field}
            onClick={onSort}
            isActive={field === sortField}
          />
        ))}

        <button
          type="button"
          className={clsx('button is-warning', {
            'is-light': !reversed,
          })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {(sortField || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={onReset}
          >
            Reset
          </button>
        )}
      </div>

      <GoodList goods={visibleGoods} />
    </div>
  );
};
