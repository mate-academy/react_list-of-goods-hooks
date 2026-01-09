import React from 'react';
import { SortType } from '../../types/SortType';
import { ClassNameButton } from '../../types/ClassNameButton';

type Props = {
  className: ClassNameButton;
  isReversed: boolean;
  nameField: SortType;
  sortField: SortType | '';
  handleClick: (nameField: SortType) => void;
};

export const Button: React.FC<Props> = ({
  className,
  isReversed,
  nameField,
  sortField,
  handleClick,
}) => {
  let classNameButton: ClassNameButton;

  function toLightVariant(nameClass: ClassNameButton): ClassNameButton {
    switch (nameClass) {
      case ClassNameButton.Info:
        return ClassNameButton.InfoLight;
      case ClassNameButton.Success:
        return ClassNameButton.SuccessLight;
      case ClassNameButton.Warning:
        return ClassNameButton.WarningLight;
      case ClassNameButton.Danger:
        return ClassNameButton.DangerLight;
      default:
        return nameClass;
    }
  }

  if (isReversed && nameField === SortType.Reverse) {
    classNameButton = className;
  } else {
    classNameButton =
      sortField === nameField ? className : toLightVariant(className);
  }

  return (
    <button
      type="button"
      className={classNameButton}
      onClick={() => handleClick(nameField)}
    >
      {nameField}
    </button>
  );
};
