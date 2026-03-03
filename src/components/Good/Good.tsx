//..

type GoodProps = {
  el: string;
};

export const Good = ({ el }: GoodProps) => {
  return <li data-cy="Good">{el}</li>;
};
