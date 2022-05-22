import React, { ChangeEvent, useState } from 'react';
import { Button, Form } from 'react-bootstrap';

type Props = {
  goodsFromServer: string[];
};

const GoodsList: React.FC<Props> = ({ goodsFromServer }) => {
  const [shouldReverse, setShouldRevers] = useState(false);
  const [sortBy, setSortBy] = useState('default');
  const [lengthValue, setLengthValue] = useState('1');

  const workCopy = [...goodsFromServer];

  const lengthChange = (event:ChangeEvent<HTMLSelectElement>):void => {
    setLengthValue(event.target.value);
  };

  const resetAll = () => {
    setShouldRevers(false);
    setSortBy('default');
    setLengthValue('1');
  };

  workCopy.sort((name1, name2) => {
    switch (sortBy) {
      case 'name':
        return name1.localeCompare(name2);
      case 'length':
        return name1.length - name2.length;
      default:
        return 0;
    }
  });

  if (shouldReverse) {
    workCopy.reverse();
  }

  return (
    <>
      <ul>
        {workCopy.map(good => {
          if (good.length >= +lengthValue) {
            return (
              <li key={good}>
                {good}
              </li>
            );
          }

          return null;
        })}
      </ul>

      <Button
        type="button"
        variant="outline-primary"
        className="m-1"
        onClick={() => setShouldRevers(!shouldReverse)}
      >
        Revert
      </Button>

      <Button
        type="button"
        variant="outline-primary"
        className="m-1"
        onClick={() => setSortBy('name')}
      >
        Sort alphabetically
      </Button>

      <Button
        type="button"
        variant="outline-primary"
        className="m-1"
        onClick={() => setSortBy('length')}
      >
        Sort by length
      </Button>

      <Button
        type="button"
        variant="outline-primary"
        className="m-1"
        onClick={resetAll}
      >
        Reset all
      </Button>

      <Form.Select
        value={lengthValue}
        onChange={lengthChange}
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </Form.Select>

    </>
  );
};

export default GoodsList;
