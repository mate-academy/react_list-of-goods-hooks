/* eslint-disable @typescript-eslint/indent */
import React, { useState, Dispatch, SetStateAction } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

enum SortType {
  'Sort alphabetically' = 'Sort alphabetically',
  'Sort by length' = 'Sort by length',
  'Reverse' = 'Reverse',
  'Reset' = 'Reset',
}

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

export const namesOfButtons: (keyof typeof SortType)[] =
  Object.values(SortType);

export const typesOfButtons = [
  'is-info',
  'is-success',
  'is-warning',
  'is-danger',
];

type GoodListProps = {
  visibleGoods: string[];
};

export const GoodList: React.FC<GoodListProps> = ({ visibleGoods }) => {
  return (
    <ul>
      {visibleGoods.map(good => (
        <li data-cy="Good" key={good}>
          {good}
        </li>
      ))}
    </ul>
  );
};

function getPreparedGoods(
  goods: string[],
  sortField: keyof typeof SortType | '',
) {
  const updatedList: string[] = [...goods];

  if (sortField) {
    switch (sortField) {
      case 'Sort alphabetically':
        return updatedList.sort((a, b) => a.localeCompare(b));
      case 'Sort by length':
        return updatedList.sort((a, b) => a.length - b.length);
      case 'Reverse':
        return updatedList.reverse();
      case 'Reset':
        return [...goodsFromServer];
      default:
        return [];
    }
  }

  return updatedList;
}

type ButtonsProps = {
  sortField: keyof typeof SortType | '';
  setSortField: Dispatch<SetStateAction<keyof typeof SortType | ''>>;
  setVisibleGood: Dispatch<SetStateAction<string[]>>;
};

export const Buttons: React.FC<ButtonsProps> = ({
  sortField,
  setSortField,
  setVisibleGood,
}) => {
  return (
    <div className="buttons">
      {namesOfButtons.map((nameOfButton, index) => (
        <button
          type="button"
          key={nameOfButton}
          onClick={() => {
            const newSortField = sortField === nameOfButton ? '' : nameOfButton;

            setSortField(newSortField);
            setVisibleGood(getPreparedGoods(goodsFromServer, newSortField));
          }}
          className={classNames('button', `${typesOfButtons[index]}`, {
            'is-light': sortField !== nameOfButton,
          })}
        >
          {nameOfButton}
        </button>
      ))}
    </div>
  );
};

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<keyof typeof SortType | ''>('');
  const [visibleGoods, setVisibleGoods] = useState([...goodsFromServer]);

  return (
    <div className="section content">
      <Buttons
        sortField={sortField}
        setSortField={setSortField}
        setVisibleGood={setVisibleGoods}
      />

      <GoodList visibleGoods={visibleGoods} />
    </div>
  );
};
