/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import clsx from 'clsx';
import { Good } from './components/Good';

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
enum ListOperation {
  SORT_ALPHABET = 'Sort alphabetically',
  SORT_LENGTH = 'Sort by length',
  REVERSE = 'Reverse',
  RESET = 'Reset',
}

function styleClass(btn: ListOperation) {
  switch (btn) {
    case ListOperation.SORT_ALPHABET:
      return 'is-info';
    case ListOperation.SORT_LENGTH:
      return 'is-success';
    case ListOperation.REVERSE:
      return 'is-warning';
    case ListOperation.RESET:
      return 'is-danger';
    default:
      return '';
  }
}

type Sort = {
  typeField: string;
  isReversed: boolean;
};

function sortGoods(goods: string[], { typeField, isReversed }: Sort) {
  const changedGoods = [...goods];

  switch (typeField) {
    case ListOperation.SORT_ALPHABET:
      changedGoods.sort((a, b) => a.localeCompare(b));
      break;

    case ListOperation.SORT_LENGTH:
      changedGoods.sort((a, b) => a.length - b.length);
      break;

    default:
      break;
  }

  if (isReversed) {
    changedGoods.reverse();
  }

  return changedGoods;
}

export const App: React.FC = () => {
  const [sort, setSort] = useState({ typeField: '', isReversed: false });
  const visibleGoods = sortGoods(goodsFromServer, sort);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() =>
            setSort(prev => ({
              ...prev,
              typeField: ListOperation.SORT_ALPHABET,
            }))
          }
          type="button"
          className={clsx(
            'button',
            styleClass(ListOperation.SORT_ALPHABET),
            sort.typeField !== ListOperation.SORT_ALPHABET && 'is-light',
          )}
        >
          Sort alphabetically
        </button>
        <button
          onClick={() => {
            setSort(prev => ({
              ...prev,
              typeField: ListOperation.SORT_LENGTH,
            }));
          }}
          type="button"
          className={clsx(
            'button',
            styleClass(ListOperation.SORT_LENGTH),
            sort.typeField !== ListOperation.SORT_LENGTH && 'is-light',
          )}
        >
          Sort by length
        </button>
        <button
          onClick={() => {
            setSort(prev => ({
              ...prev,
              isReversed: !prev.isReversed,
            }));
          }}
          type="button"
          className={clsx(
            'button',
            styleClass(ListOperation.REVERSE),
            !sort.isReversed && 'is-light',
          )}
        >
          Reverse
        </button>
        {(sort.typeField || sort.isReversed) && (
          <button
            onClick={() => {
              setSort({ typeField: '', isReversed: false });
            }}
            type="button"
            className={clsx(
              'button',
              styleClass(ListOperation.RESET),
              'is-light',
            )}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <Good key={good} good={good} />
        ))}
      </ul>
    </div>
  );
};
