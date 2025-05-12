import ProductCard from "./ProductCard";

type WishlistProduct = {
  id: string;
  product_name: string;
  price: number;
  image_url?: string;
  product_id?: string;
  added_by?: string;
};

const WishlistGrid = ({
  products,
  listid,
}: {
  products: WishlistProduct[];
  listid: string;
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:px-10 px-2 p-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          name={product.product_name}
          price={`$${product.price}/-`}
          image_url={product.image_url}
          product_id={product.product_id}
          added_by={product.added_by}
          listid={listid}
        />
      ))}
    </div>
  );
};

export default WishlistGrid;
