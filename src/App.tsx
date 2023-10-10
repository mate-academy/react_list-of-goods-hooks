import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classnames from 'classnames';

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

enum SortType {
  Default = 0,
  Alphabetically = 1,
  Length,
}

enum ReverseType {
  Default = 0,
  IsReversed,
}

function getGoodsRepresentation(
  selectedSort: SortType,
  isReverse: ReverseType,
): string[] {
  let goods = [...goodsFromServer];

  switch (selectedSort) {
    case SortType.Alphabetically:
      goods = goods.sort();
      break;

    case SortType.Length:
      goods = goods.sort(
        (good1, good2) => good1.length - good2.length,
      );
      break;

    default:
      break;
  }

  return isReverse === ReverseType.IsReversed ? goods.reverse() : goods;
}

export const App: React.FC = () => {
  const [selectedSortOption, setSelectedSortOption]
    = useState<SortType>(SortType.Default);
  const [selectedReverseOption, setSelectedReverseOption]
    = useState<ReverseType>(ReverseType.Default);
  const goodsRepresentation
    = getGoodsRepresentation(selectedSortOption, selectedReverseOption);

  function handleReverseClick() {
    return selectedReverseOption === ReverseType.IsReversed
      ? setSelectedReverseOption(ReverseType.Default)
      : setSelectedReverseOption(ReverseType.IsReversed);
  }

  function handResetClick() {
    setSelectedSortOption(SortType.Default);
    setSelectedReverseOption(ReverseType.Default);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classnames('button', 'is-info',
            selectedSortOption !== SortType.Alphabetically ? 'is-light' : '')}
          onClick={() => setSelectedSortOption(SortType.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classnames('button', 'is-success',
            selectedSortOption !== SortType.Length ? 'is-light' : '')}
          onClick={() => setSelectedSortOption(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classnames('button', 'is-warning',
            selectedReverseOption !== ReverseType.IsReversed ? 'is-light' : '')}
          onClick={handleReverseClick}
        >
          Reverse
        </button>

        {
          (selectedReverseOption !== ReverseType.Default
            || selectedSortOption !== SortType.Default)
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={handResetClick}
            >
              Reset
            </button>
          )
        }
      </div>

      <ul>
        {goodsRepresentation.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
