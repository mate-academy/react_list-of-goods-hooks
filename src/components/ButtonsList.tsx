import { Button } from './Button';

type ButtonsListProps = {
  handlesortCriteria: (action: string) => void;
  sortCriteria: string;
  isReversed: boolean;
};

export const ButtonsList: React.FC<ButtonsListProps> = ({
  handlesortCriteria,
  sortCriteria,
  isReversed,
}) => {
  return (
    <div className="buttons">
      <Button
        name="alphabet"
        handlesortCriteria={handlesortCriteria}
        sortCriteria={sortCriteria}
        isReversed={isReversed}
      />

      <Button
        name="length"
        handlesortCriteria={handlesortCriteria}
        sortCriteria={sortCriteria}
        isReversed={isReversed}
      />

      <Button
        name="reverse"
        handlesortCriteria={handlesortCriteria}
        sortCriteria={sortCriteria}
        isReversed={isReversed}
      />

      {(sortCriteria || isReversed) && (
        <Button
          name="reset"
          handlesortCriteria={handlesortCriteria}
          sortCriteria={sortCriteria}
          isReversed={isReversed}
        />
      )}
    </div>
  );
};
