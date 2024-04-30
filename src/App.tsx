import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState } from 'react';

export enum Goods {
  Dumplings = 'Dumplings',
  Carrot = 'Carrot',
  Eggs = 'Eggs',
  IceCream = 'Ice cream',
  Apple = 'Apple',
  Bread = 'Bread',
  Fish = 'Fish',
  Honey = 'Honey',
  Jam = 'Jam',
  Garlic = 'Garlic',
}

export const App: React.FC = () => {
  const [selected, setSelected] = useState(true);
  const [selectGood, setSelectGood] = useState('Jam');

  function handleSelection(product: Goods) {
    let select = true;

    if (!product) {
      select = false;
    }

    setSelectGood(product);
    setSelected(select);
  }

  const handleResetClick = () => {
    setSelected(false);
    setSelectGood('');
  };

  return (
    <main className="section container">
      {selected ? (
        <h1 className="title is-flex is-align-items-center">
          {selectGood} is selected
          <button
            data-cy="ClearButton"
            type="button"
            className="delete ml-3"
            onClick={handleResetClick}
          />
        </h1>
      ) : (
        <h1 className="title is-flex is-align-items-center">
          No goods selected
        </h1>
      )}

      <table className="table">
        <tbody>
          {Object.values(Goods).map(good => {
            const isSelect = selectGood === good;

            return (
              <tr
                key={good}
                data-cy="Good"
                className={
                  isSelect ? 'has-background-success-light' : undefined
                }
              >
                <td>
                  <button
                    data-cy={isSelect ? 'RemoveButton' : 'AddButton'}
                    type="button"
                    className={`button ${isSelect ? 'is-info' : ''}`}
                    onClick={() => handleSelection(isSelect ? Goods.Jam : good)}
                  >
                    {isSelect ? '-' : '+'}
                  </button>
                </td>

                <td data-cy="GoodTitle" className="is-vcentered">
                  {good}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
};
