import { FC, useState } from 'react';
import 'bulma/css/bulma.css';
import classNames from 'classnames';

enum SortType {
  NONE,
  ALPABET,
  LENGTH,
}

type Props = {
  goodsFromServer: string[];
};

export const ListOfGoods: FC<Props> = ({ goodsFromServer }) => {
  const [isReversed, setReverse] = useState<boolean>(false);
  const [sortType, setSortType] = useState<SortType>(SortType.NONE);

  const getReorderedGoods = (goods: string[]) => {
    const visibleGoods = [...goods];

    if (sortType !== SortType.NONE) {
      visibleGoods.sort((good1, good2) => {
        switch (sortType) {
          case SortType.LENGTH:
            return good1.length - good2.length;
          case SortType.ALPABET:
            return good1.localeCompare(good2);
          default:
            return 0;
        }
      });
    }

    if (isReversed) {
      visibleGoods.reverse();
    }

    return visibleGoods;
  };

  const handleReset = () => {
    setSortType(SortType.NONE);
    setReverse(false);
  };

  const handleSortType = (type: SortType) => {
    setSortType(type);
  };

  const handleReverse = () => {
    setReverse(current => (
      !current));
  };

  return (
    <>
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button',
            'is-info',
            { 'is-light': sortType !== SortType.ALPABET },
          )}
          onClick={() => handleSortType(SortType.ALPABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button',
            'is-success',
            { 'is-light': sortType !== SortType.LENGTH },
          )}
          onClick={() => handleSortType(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button',
            'is-warning',
            { 'is-light': isReversed !== true },
          )}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {(sortType || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        {getReorderedGoods(goodsFromServer).map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </>
  );
};
