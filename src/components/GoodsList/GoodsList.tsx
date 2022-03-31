import { range } from 'lodash';
import { Button } from 'react-bootstrap';
import { FC, useState } from 'react';
import { SortType } from '../../enums/SortType';
import { Selector } from '../Selector';

interface Props {
  goods: string[];
}

export const GoodsList: FC<Props> = ({ goods }) => {
  const [minLength] = useState(1);
  const [maxLength] = useState(10);
  const [selectedLength, setLength] = useState(minLength);
  const [sortBy, setSortType] = useState(SortType.Default);
  const [isReversed, setReversed] = useState(false);

  const handleReverseClick = () => {
    setReversed(true);
  };

  const handleSortByLengthClick = () => {
    setSortType(SortType.ByLength);
  };

  const handleSortAlphabeticallyClick = () => {
    setSortType(SortType.Alphabetical);
  };

  const handleResetClick = () => {
    setReversed(false);
    setSortType(SortType.Default);
    setLength(minLength);
  };

  const handleSelectorChange = (value: string) => {
    setLength(Number(value));
  };

  const getVisibleGoodsList = () => {
    const visibleGoodsList = goods.filter(
      item => item.length >= selectedLength,
    );

    visibleGoodsList.sort(
      (itemA, itemB) => {
        switch (sortBy) {
          case SortType.ByLength:
            return itemA.length - itemB.length;

          case SortType.Alphabetical:
            return itemA.localeCompare(itemB);

          case SortType.Default:
            return 0;

          default:
            throw new Error(`Error: SortType ${sortBy} is undefined`);
        }
      },
    );

    if (isReversed) {
      visibleGoodsList.reverse();
    }

    return visibleGoodsList;
  };

  const availableOptions = range(minLength, maxLength + 1);

  const ifNothingToReset = (
    selectedLength === minLength
    && sortBy === SortType.Default && !isReversed
  );

  return (
    <div className="GoodsList">
      <div className="GoodsList__controllers">
        <Button
          className="GoodsList__button"
          onClick={handleSortByLengthClick}
          disabled={sortBy === SortType.ByLength}
        >
          Sort by length
        </Button>

        <Button
          className="GoodsList__button"
          onClick={handleSortAlphabeticallyClick}
          disabled={sortBy === SortType.Alphabetical}
        >
          Sort alphabetically
        </Button>

        <Button
          className="GoodsList__button"
          onClick={handleResetClick}
          disabled={ifNothingToReset}
        >
          Reset
        </Button>

        <Button
          className="GoodsList__button"
          onClick={handleReverseClick}
          disabled={isReversed}
        >
          Reverse
        </Button>

        <Selector
          options={availableOptions}
          selectedLength={selectedLength}
          onChangeFunc={handleSelectorChange}
        />
      </div>

      <ul className="GoodsList__list">
        {getVisibleGoodsList().map(item => (
          <li
            className="GoodsList__list-item"
            key={item}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
