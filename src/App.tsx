import React, { useState } from 'react';
import cn from 'classnames';
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
  const [Field, setField] = useState('onlystarted');
  const [Reversed, setreversed] = useState(false);

  const sortalphabetically = 'alphabet';
  const sortbylength = 'length';

  interface SortingParams {
    goods: string[];
    field: string;
    reversed: boolean;
  }

  function sorting({ goods, field, reversed }: SortingParams) {
    const prepared = [...goods];

    if (field === sortalphabetically) {
      prepared.sort((good1, good2) => good1.localeCompare(good2));
    }

    if (field === sortbylength) {
      prepared.sort((good1, good2) => good1.length - good2.length);
    }

    if (reversed) {
      prepared.reverse();
    }

    return prepared;
  }

  function reset() {
    setField('onlystarted');
    setreversed(false);
  }

  const thing = sorting({
    goods: goodsFromServer,
    field: Field,
    reversed: Reversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': Field !== sortalphabetically,
          })}
          onClick={() => setField(sortalphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-info', {
            'is-light': Field !== sortbylength,
          })}
          onClick={() => setField(sortbylength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-info', {
            'is-light': Reversed !== true,
          })}
          onClick={() => setreversed(prev => !prev)}
        >
          Reverse
        </button>

        {(Field !== 'onlystarted' || Reversed) && (
          <button type="button" className="button is-danger" onClick={reset}>
            Reset
          </button>
        )}
      </div>

      <ul>
        {thing.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
