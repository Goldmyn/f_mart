import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { updateUser } from "../../features/user/userSlice";
import { Card, Avatar, Table, Button, Typography } from "antd";
import { LogOut, ShoppingCart } from "lucide-react";
import moment from "moment";

const { Title, Text } = Typography;

const ProfilePage = () => {
  const { loginUser } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(updateUser(null));
    navigate("/login");
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "product_image",
      key: "product_image",
      render: (image) => <Avatar shape="square" size={64} src={image} />,
    },
    {
      title: "Product",
      dataIndex: "product_name",
      key: "product_name",
    },
    {
      title: "Price",
      dataIndex: "product_price",
      key: "product_price",
      render: (price) => `₦${price.toLocaleString()}`,
    },
    {
      title: "Quantity",
      dataIndex: "product_quantity",
      key: "product_quantity",
    },
  ];

  return (
    <div className="max-w-4xl z-0 mx-auto mt-10 p-6">
      {/* Profile Card */}
      <Card bordered>
        <div className="flex items-center gap-4">
          <Avatar
            src={
              "https://img.freepik.com/free-psd/contact-icon-illustration-isolated_23-2151903337.jpg?t=st=1738886789~exp=1738890389~hmac=59355ec386501970937ae4466838c120771ce387a77272170bd30a0963df76bd&w=740"
            }
            size={80}
            style={{ marginBottom: "15px", border: "5px solid #1890ff" }}
          >
            {loginUser?.name[0]}
          </Avatar>
          <div>
            <Title level={3}>{loginUser?.name}</Title>
            <Text type="secondary">{loginUser?.email}</Text>
            <br />
            <Text>Joined: {moment(loginUser?.createdAt).format("LL")}</Text>
          </div>
        </div>
      </Card>

      {/* Cart Section */}
      <Card
        title={
          <>
            <ShoppingCart className="inline-block mr-2" /> Your Cart
          </>
        }
        className="mt-6 shadow-md"
      >
        {cartItems.length === 0 ? (
          <Text type="secondary">Your cart is empty.</Text>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <Table
              dataSource={cartItems}
              columns={columns}
              pagination={false}
              rowKey="product_id"
            />
          </div>
        )}
      </Card>

      {/* Logout Button */}
      <Button
        type="primary"
        danger
        className="mt-6 w-full flex items-center justify-center gap-2"
        onClick={handleLogout}
      >
        <LogOut size={16} /> Log Out
      </Button>
    </div>
  );
};

export default ProfilePage;
