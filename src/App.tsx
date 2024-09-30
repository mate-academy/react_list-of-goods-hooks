import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { TypeSort } from './types/TypeSort';
import { FilterTypes } from './types/FilterTypes';

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

const getPreparedGoods = (goods: string[], sortOptions: TypeSort) => {
  const preparedGoods = [...goods];

  if (sortOptions.filterType) {
    preparedGoods.sort((good1, good2) => {
      switch (sortOptions.filterType) {
        case FilterTypes.byAlphabet:
          return good1.localeCompare(good2);
        case FilterTypes.byLength:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (sortOptions.isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App: React.FC = () => {
  const [filterInstruction, setFilterInstruction] = React.useState({
    filterType: FilterTypes.default,
    isReversed: false,
  });

  const isAnyFilterApplied =
    filterInstruction.filterType || filterInstruction.isReversed;

  const visibleGoods = getPreparedGoods(goodsFromServer, filterInstruction);

  const handleSetFilterType = (filterTypeName: FilterTypes) => {
    setFilterInstruction(prevState => {
      return {
        ...prevState,
        filterType: filterTypeName,
      };
    });
  };

  const handleReverse = () => {
    setFilterInstruction(prevState => {
      return {
        ...prevState,
        isReversed: !prevState.isReversed,
      };
    });
  };

  const handleClearFilter = () => {
    setFilterInstruction(prevState => {
      return {
        ...prevState,
        filterType: FilterTypes.default,
        isReversed: false,
      };
    });
  };

  const isLightOn = (filterType: FilterTypes) => {
    return filterInstruction.filterType !== filterType;
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => handleSetFilterType(FilterTypes.byAlphabet)}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': isLightOn(FilterTypes.byAlphabet),
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => handleSetFilterType(FilterTypes.byLength)}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': isLightOn(FilterTypes.byLength),
          })}
        >
          Sort by length
        </button>

        <button
          onClick={handleReverse}
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !filterInstruction.isReversed,
          })}
        >
          Reverse
        </button>

        {isAnyFilterApplied && (
          <button
            onClick={() => handleClearFilter()}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
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
