type Props = {
  products: string[];
};

function GoodsList(props: Props) {
  const { products } = props;

  return (
    <ul className="products">
      {products.map((product: string) => (
        <li
          key={product}
        >
          {product}
        </li>
      ))}
    </ul>
  );
}

export default GoodsList;
