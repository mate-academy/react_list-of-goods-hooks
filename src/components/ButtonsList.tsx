import { Button } from "./Button";

type ButtonsListProps = {
  filterHandler: (action: string) => void;
  filter: string;
  isReversed: boolean;
};

export const ButtonsList: React.FC<ButtonsListProps> = ({
  filterHandler,
  filter,
  isReversed,
}) => {
  return (
    <div className="buttons">
      <Button
        name="alphabet"
        content="Sort alphabetically"
        filterHandler={filterHandler}
        filter={filter}
        isReversed={isReversed}
      />

      <Button
        name="length"
        content="Sort by length"
        filterHandler={filterHandler}
        filter={filter}
        isReversed={isReversed}
      />

      <Button
        name="reverse"
        content="Reverse"
        filterHandler={filterHandler}
        filter={filter}
        isReversed={isReversed}
      />

      {(filter || isReversed) && (
        <Button
          name="reset"
          content="Reset"
          filterHandler={filterHandler}
          filter={filter}
          isReversed={isReversed}
        />
      )}
    </div>
  );
};
