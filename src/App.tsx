import React from 'react';
import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

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

const buttonsFromServer = [
  'Sort alphabetically',
  'Sort by length',
  'Reverse',
  'Reset',
];

enum SortField {
  Name = 'name',
  Length = 'length',
}

// const SORT_FIELD_NAME = 'name';
// const SORT_FIELD_LENGTH = 'length';

interface ButtonProps {
  button: string;
  sortField: string;
  setSortField: React.Dispatch<React.SetStateAction<string>>;
  reverse: boolean;
  setReverse: React.Dispatch<React.SetStateAction<boolean>>;
}

function getPreparedButtons(
  buttons: string[],
  { sortField, reverse }: { sortField: string; reverse: boolean },
) {
  const preparedButtons = [...buttons];

  if (!sortField && !reverse) {
    preparedButtons.pop();
  }

  return preparedButtons;
}

function getPreparedGoods(
  goods: string[],
  { sortField, reverse }: { sortField: string; reverse: boolean },
) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      if (sortField === SortField.Name) {
        return good1.localeCompare(good2);
      }

      if (sortField === SortField.Length) {
        return good1.length - good2.length;
      }

      return 0;
    });
  }

  if (reverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

const Button: React.FC<ButtonProps> = ({
  button,
  sortField,
  reverse,
  setSortField,
  setReverse,
}) => {
  return (
    <button
      type="button"
      className={cn(
        'button',
        { 'is-info': button === 'Sort alphabetically' },
        { 'is-success': button === 'Sort by length' },
        { 'is-warning': button === 'Reverse' },
        { 'is-danger': button === 'Reset' },
        {
          'is-light': button === 'Sort alphabetically' && sortField !== 'name',
        },
        { 'is-light': button === 'Sort by length' && sortField !== 'length' },
        { 'is-light': button === 'Reverse' && !reverse },
        { 'is-light': button === 'Reset' },
      )}
      onClick={() => {
        const value = button;

        switch (value) {
          case 'Sort alphabetically':
            setSortField(SortField.Name);

            break;
          case 'Sort by length':
            setSortField(SortField.Length);
            break;
          case 'Reverse':
            if (reverse) {
              setReverse(false);
            } else {
              setReverse(true);
            }

            break;
          case 'Reset':
            setSortField('');
            setReverse(false);
            break;

          default:
            break;
        }
      }}
    >
      {button}
    </button>
  );
};

export const App: React.FC = () => {
  const [sortField, setSortField] = useState('');
  const [reverse, setReverse] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    reverse,
  });
  const visibleButtons = getPreparedButtons(buttonsFromServer, {
    sortField,
    reverse,
  });

  return (
    <div className="section content">
      <div className="buttons">
        {visibleButtons.map(button => (
          <Button
            key={button}
            button={button}
            sortField={sortField}
            reverse={reverse}
            setReverse={setReverse}
            setSortField={setSortField}
          />
        ))}
      </div>

      <ul>
        {visibleGoods.map((good, index) => (
          <li data-cy="Good" key={index}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
