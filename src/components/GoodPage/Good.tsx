import React from "react";

type Props = {
  good: string;
};

const GoodPage: React.FC<Props> = ({ good }) => {
  return <li data-cy="Good">{good}</li>;
};

export default GoodPage;
