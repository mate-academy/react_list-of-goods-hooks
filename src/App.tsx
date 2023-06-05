import React, { useState } from 'react';
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

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortedBy, setSortedBy] = useState('none');
  const [isVisible, setIsVisible] = useState(false);

  const changeArray = (array: string[]) => {
    const visibleGoods = [...array];

    switch (sortedBy) {
      case 'none':
        break;

      case 'alphabet':
        visibleGoods.sort((good1, good2) => {
          return good1.localeCompare(good2);
        });
        break;

      case 'length':
        visibleGoods.sort((good1, good2) => {
          return good1.length - good2.length;
        });
        break;

      default:
        break;
    }

    if (isReversed) {
      visibleGoods.reverse();
    }

    return visibleGoods;
  };

  const newGoods = changeArray(goodsFromServer);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className="button is-info is-light"
          onClick={(e) => {
            setSortedBy('alphabet');
            setIsVisible(true);
            e.currentTarget.classList.remove('is-light');

            return document
              .querySelector('.is-success')?.classList.add('is-light');
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className="button is-success is-light"
          onClick={(e) => {
            setSortedBy('length');
            setIsVisible(true);
            e.currentTarget.classList.remove('is-light');

            return document
              .querySelector('.is-info')?.classList.add('is-light');
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className="button is-warning is-light"
          onClick={(e) => {
            setIsReversed(!isReversed);

            if (isReversed && Array.from(
              document.querySelectorAll('is-light'),
            ).length < 1) {
              setIsVisible(false);
            } else {
              setIsVisible(true);
            }

            return isReversed
              ? e.currentTarget.classList.add('is-light')
              : e.currentTarget.classList.remove('is-light');
          }}
        >
          Reverse
        </button>

        {isVisible && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setIsVisible(false);
              setSortedBy('none');
              setIsReversed(false);

              Array.from(document.querySelectorAll('button'))
                .forEach(buttom => buttom.classList.add('is-light'));
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {newGoods.map(good => (
            <li data-cy="Good" key={good}>{good}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
