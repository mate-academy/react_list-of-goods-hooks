import { Button } from './Button';
import { createRandomId } from '../utils/createRandomId';

type ButtonsListProps = {
  handleFilter: (action: string) => void;
  filter: string;
  isReversed: boolean;
};

export const ButtonsList: React.FC<ButtonsListProps> = ({
  handleFilter,
  filter,
  isReversed,
}) => {
  return (
    <div className="buttons">
      <Button
        key={createRandomId()}
        name="alphabet"
        content="Sort alphabetically"
        handleFilter={handleFilter}
        filter={filter}
        isReversed={isReversed}
      />

      <Button
        key={createRandomId()}
        name="length"
        content="Sort by length"
        handleFilter={handleFilter}
        filter={filter}
        isReversed={isReversed}
      />

      <Button
        key={createRandomId()}
        name="reverse"
        content="Reverse"
        handleFilter={handleFilter}
        filter={filter}
        isReversed={isReversed}
      />

      {(filter || isReversed) && (
        <Button
          key={createRandomId()}
          name="reset"
          content="Reset"
          handleFilter={handleFilter}
          filter={filter}
          isReversed={isReversed}
        />
      )}
    </div>
  );
};
