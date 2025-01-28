import PropType from "prop-types";
import { formatCurrency } from "../../utils/helper";
import moment from "moment";
import { Link } from "react-router";

const OrderList = ({ orders }) => {
  return (
    <section className="max-w-[1000px] mx-auto py-12">
      <table className="w-full">
        <thead>
          <tr className="text-left text-green-800">
            <th>Time</th>
            <th>Status</th>
            <th>Name</th>
            <th>Email</th>
            <th>Amount</th>
            <th>Quantity</th>
            <th>Details</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((item) => {
            return (
              <tr key={item.id} className="text-gray-500 font-light border-b">
                <td className="py-2">
                  {moment(item.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                </td>
                <td>{item.order_status}</td>
                <td>{item.customer_delivery_info.name}</td>
                <td>{item.customer_delivery_info.email}</td>
                <td>
                  {formatCurrency(item.user_cart_summary.totalCartItemsCost)}
                </td>
                <td>{item.user_cart_summary.totalCartItemsQty}</td>
                <td>
                  <Link
                    to={`/admin/${item._id}`}
                    className="border shadow-md shadow-green-50 border-green-800 px-2 rounded-md cursor-pointer font-semibold text-black hover:bg-green-800 hover:text-white transition-all duration-500"
                  >
                    View
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default OrderList;

OrderList.propTypes = {
  orders: PropType.array,
};
