import { FC, useState } from 'react';
import './App.css';
import cn from 'classnames';

const goodsFromServer: string[] = [
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

interface Good {
  goodName: string,
  id: number,
}

enum SortType {
  NONE,
  ALPABET,
  LENGTH,
}

const getGoodsWithId = (initialGoods: string[]) => (
  initialGoods.map((good, index) => {
    return {
      goodName: good,
      id: index,
    };
  })
);

function getReorderedGoods(
  goods: Good[],
  sortType: SortType,
  isReversed: boolean,
) {
  const visibleGoods = [...goods];

  switch (sortType) {
    case SortType.ALPABET:
      visibleGoods.sort((a, b) => (
        a.goodName.localeCompare(b.goodName)
      ));
      break;

    case SortType.LENGTH:
      visibleGoods.sort((a, b) => (
        a.goodName.length - b.goodName.length
      ));
      break;

    case SortType.NONE:
    default:
      break;
  }

  return isReversed
    ? visibleGoods.reverse()
    : visibleGoods;
}

export const App: FC = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);
  const [goods] = useState<Good[]>(getGoodsWithId(goodsFromServer));

  const preparedGoods = getReorderedGoods(
    goods,
    sortType,
    isReversed,
  );

  return (
    <div className="App">
      <div className="box">
        {!isStarted
          ? (
            <button
              type="button"
              className="
                    button
                    is-primary
                    is-large
                    is-light
                  "
              onClick={() => (setIsStarted(true))}
            >
              Start
            </button>
          )
          : (
            <>
              <div className="buttons">
                <button
                  type="button"
                  className={
                    cn(
                      'button',
                      { 'is-active is-primary': sortType === SortType.ALPABET },
                    )
                  }
                  onClick={() => (setSortType(SortType.ALPABET))}
                >
                  Sort alphabetically
                </button>

                <button
                  type="button"
                  className={
                    cn(
                      'button',
                      { 'is-active is-primary': sortType === SortType.LENGTH },
                    )
                  }
                  onClick={() => (setSortType(SortType.LENGTH))}
                >
                  Sort by length
                </button>

                <button
                  type="button"
                  className={
                    cn(
                      'button',
                      { 'is-active is-primary': isReversed },
                    )
                  }
                  onClick={() => setIsReversed(prevState => (
                    !prevState
                  ))}
                >
                  Reverse
                </button>

                <button
                  type="button"
                  className={
                    cn(
                      'button is-light',
                      {
                        'is-active is-danger': ((isReversed === false)
                        && (sortType === SortType.NONE)),
                      },
                    )
                  }
                  onClick={() => {
                    setIsReversed(false);
                    setSortType(SortType.NONE);
                  }}
                >
                  Reset
                </button>
              </div>

              <ul className={
                cn('Goods list', {
                  'list-open': isStarted,
                })
              }
              >
                {preparedGoods.map(good => (
                  <li
                    key={good.id}
                    className="Goods__item"
                  >
                    {good.goodName}
                  </li>
                ))}
              </ul>
            </>
          )}
      </div>
    </div>
  );
};
