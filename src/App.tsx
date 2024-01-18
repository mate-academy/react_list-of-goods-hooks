import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

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

type PrepareGood = {
  sortField: string;
  reverseField: boolean;
};

const SORT_FIELD_ALPHABETICALY = 'alpha';
const SORT_FIELD_LENGHT = 'lenght';

function getPrepearedGoods(
  goods: string[], { sortField, reverseField }: PrepareGood,
): string[] {
  let finalGoods = [...goods];

  switch (sortField) {
    case SORT_FIELD_ALPHABETICALY:
      finalGoods = finalGoods.sort(
        (good1, good2) => good1.localeCompare(good2),
      );

      break;

    case SORT_FIELD_LENGHT:
      finalGoods = finalGoods.sort(
        (good1, good2) => good1.length - good2.length,
      );

      break;

    default:
      break;
  }

  if (reverseField) {
    finalGoods.reverse();
  }

  return finalGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverseField, setReverseField] = useState(false);
  const visibleGoods = getPrepearedGoods(goodsFromServer, {
    sortField,
    reverseField,
  });

  function reset() {
    setSortField('');
    setReverseField(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SORT_FIELD_ALPHABETICALY)}
          className={classNames('button is-info', {
            'is-light': sortField !== SORT_FIELD_ALPHABETICALY,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField(SORT_FIELD_LENGHT)}
          className={classNames('button is-success', {
            'is-light': sortField !== SORT_FIELD_LENGHT,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setReverseField(!reverseField)}
          className={classNames('button is-warning', {
            'is-light': !reverseField,
          })}
        >
          Reverse
        </button>

        {(sortField || reverseField) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>

    </div>
  );
};
