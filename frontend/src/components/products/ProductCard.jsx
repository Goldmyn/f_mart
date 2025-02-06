import { Link } from "react-router";
import PropTypes from "prop-types";
import { formatCurrency } from "../../utils/helper";

const ProductCard = ({
  product_name,
  product_image,
  product_price,
  product_id,
}) => {
  return (
    <div className="p-2 border rounded-lg grid">
      <img
        className="rounded-md w-[500px] h-[300px] object-cover"
        src={product_image}
      />
      <h3 className="text-base lg:text-lg my-3 text-green-800 font-semibold">
        {product_name}
      </h3>
      <p className="text-gray-500 mb-2">{formatCurrency(product_price)}</p>
      <Link to={`/marketplace/${product_id}`}>
        <button className="bg-green-500 text-white font-medium rounded-md p-2 w-full">
          view
        </button>
      </Link>
    </div>
  );
};

export default ProductCard;

ProductCard.propTypes = {
  product_name: PropTypes.string,
  product_image: PropTypes.string,
  product_price: PropTypes.number,
  product_id: PropTypes.string,
};
