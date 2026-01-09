import React from 'react';
import { Button } from '../button/Button';
import { ClassNameButton } from '../../types/ClassNameButton';
import { SortType } from '../../types/SortType';

type Props = {
  buttonClassesFields: [ClassNameButton, SortType][];
  sortField: SortType | '';
  handleClick: (nameField: SortType) => void;
  isReversed: boolean;
};

export const Buttons: React.FC<Props> = ({
  buttonClassesFields,
  sortField,
  handleClick,
  isReversed,
}) => (
  <div className="buttons">
    {buttonClassesFields.map(([className, nameField]) => {
      if (!sortField && !isReversed && nameField === SortType.Reset) {
        return null;
      }

      return (
        <Button
          sortField={sortField}
          isReversed={isReversed}
          className={className}
          nameField={nameField}
          handleClick={handleClick}
          key={nameField}
        />
      );
    })}
  </div>
);
