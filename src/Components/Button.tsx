import React from 'react';

interface Props {
  title: string,
  classOfTitle: string,
  sortFunction: () => void,
}

export const Button: React.FC<Props> = ({
  title, classOfTitle, sortFunction,
}) => {
  return (
    <>
      <button
        type="button"
        className={classOfTitle}
        onClick={sortFunction}
      >
        {title}
      </button>
    </>
  );
};
