import { FC, useState } from 'react';
import './SortableList.scss';
import { ListOfGoods } from '../ListOfGoods';

type Props = {
  goods: string[],
};

enum SortBy {
  none,
  alphabet,
  length,
}

export const SortableList: FC<Props> = ({ goods }) => {
  const [isHidden, unsetHidden] = useState(true);
  const [minLength, setMinLength] = useState(1);
  const [sortProp, setSortBy] = useState(SortBy.none);
  const [isReversed, setReversed] = useState(false);

  if (isHidden) {
    return (
      <button
        type="button"
        onClick={() => unsetHidden(false)}
      >
        Start
      </button>
    );
  }

  const filteredByLengthGoods = [...goods]
    .filter(good => good.length >= minLength);

  switch (sortProp) {
    case SortBy.alphabet:
      filteredByLengthGoods.sort((prev, next) => (
        prev.localeCompare(next)
      ));
      break;

    case SortBy.length:
      filteredByLengthGoods.sort((prev, next) => (
        prev.length - next.length
      ));
      break;

    case SortBy.none:
    default:
      break;
  }

  const resetList = () => {
    setMinLength(1);
    setSortBy(SortBy.none);
    setReversed(false);
  };

  const toggleReverse = () => {
    if (isReversed) {
      setReversed(false);
    } else {
      setReversed(true);
    }
  };

  if (isReversed) {
    filteredByLengthGoods.reverse();
  }

  const amountOfOptions = new Array(goods.length);

  return (
    <div className="sortable-list">
      <div className="sortable-list__buttons">
        <button
          type="button"
          className="sortable-list__btn"
          onClick={() => setSortBy(SortBy.alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className="sortable-list__btn"
          onClick={() => setSortBy(SortBy.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className="sortable-list__btn"
          onClick={() => toggleReverse()}
        >
          Reverse
        </button>

        <button
          type="button"
          className="sortable-list__btn"
          onClick={() => resetList()}
        >
          Reset
        </button>

        <select
          className="sortable-list__select"
          value={minLength}
          onChange={({ target }) => {
            setMinLength(Number(target.value));
          }}
        >
          {
            amountOfOptions.fill('option').map((_option, index) => (
              <option
                key={String(index + 1)}
                value={index + 1}
              >
                {`Length > ${index + 1}`}
              </option>
            ))
          }
        </select>
      </div>

      <ListOfGoods goods={filteredByLengthGoods} />
    </div>
  );
};
