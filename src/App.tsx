import { FC, useState } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';

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
  NONE,
  ALPHABET,
  LENGTH,
}

type ReorderOptions = {
  sortType: SortType;
  isReversed: boolean;
};

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  switch (sortType) {
    case SortType.ALPHABET:
      visibleGoods.sort((good1, good2) => good1.localeCompare(good2));
      break;
    case SortType.LENGTH:
      visibleGoods.sort((good1, good2) => good1.length - good2.length);
      break;
    default:
      break;
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

type Props = {
  onClick?: () => void;
};

const ReverseButton: FC<Props> = ({ onClick }) => {
  const [isReversed, setIsReversed] = useState(false);

  const handleClick = () => {
    setIsReversed(!isReversed);

    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      type="button"
      className={classNames('button is-warning', {
        'is-light': !isReversed,
      })}
      onClick={handleClick}
    >
      Reverse
    </button>
  );
};

export const App: FC = () => {
  const [sortType, setSortType] = useState(SortType.NONE);

  const reset = () => {
    setSortType(SortType.NONE);
  };

  const handleReverseClick = () => {
    // здесь можно добавить код, который будет выполняться при клике на кнопку ReverseButton
  };

  const reorderedGoods = getReorderedGoods(goodsFromServer, {
    sortType,
    isReversed: false,
  });

  const isChanged = sortType !== SortType.NONE;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortType !== SortType.ALPHABET,
          })}
          onClick={() => setSortType(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortType !== SortType.LENGTH,
          })}
          onClick={() => setSortType(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <ReverseButton onClick={handleReverseClick} />

        {isChanged && (
          <button
            type="button"
            className={classNames('button is-danger', {
              'is-light': isChanged,
            })}
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {reorderedGoods.map((good) => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
