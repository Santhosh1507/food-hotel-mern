import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Orders.css';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (error) {
      toast.error("Network error");
      console.error(error);  // Log the error for debugging purposes
    }
  };

  const statusHandler = async (event, orderId) => {
    const newStatus = event.target.value;
    
    // Optimistic UI update
    setOrders((prevOrders) => (
      prevOrders.map((order) =>
        order._id === orderId ? { ...order, status: newStatus } : order
      )
    ));
    
    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: newStatus
      });
      if (response.data.success) {
        toast.success("Order status updated successfully");
        // Refresh orders to ensure the UI matches the server state
        await fetchAllOrders();
      } else {
        toast.error("Failed to update order status");
        // Revert optimistic UI update on failure
        fetchAllOrders();
      }
    } catch (error) {
      toast.error("Network error");
      console.error(error);  // Log the error for debugging purposes
      // Revert optimistic UI update on failure
      fetchAllOrders();
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [url]);

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order) => (
          <OrderItem 
            key={order._id} 
            order={order} 
            statusHandler={statusHandler} 
          />
        ))}
      </div>
    </div>
  );
};

const OrderItem = ({ order, statusHandler }) => (
  <div className="order-item">
    <img src={assets.parcel_icon} alt="Parcel icon" />
    <div>
      <p className="order-item-food">
        {order.items.map((item, itemIndex) => (
          <span key={itemIndex}>
            {item.name} x {item.quantity}
            {itemIndex < order.items.length - 1 ? ", " : ""}
          </span>
        ))}
      </p>
      <p className='order-item-name'>
        {order.address.firstName} {order.address.lastName}
      </p>
      <div className='order-item-address'>
        <p>{order.address.street},</p>
        <p>{order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipCode}</p>
      </div>
      <p className='order-item-phone'>{order.address.phone}</p>
    </div>
    <p>Items: {order.items.length}</p>
    <p>${order.amount}</p>
    <select
      value={order.status}
      onChange={(event) => statusHandler(event, order._id)}
    >
      <option value="Food Processing">Food Processing</option>
      <option value="Out for Delivery">Out for Delivery</option>
      <option value="Delivered">Delivered</option>
    </select>
  </div>
);

Orders.propTypes = {
  url: PropTypes.string.isRequired,
};

OrderItem.propTypes = {
  order: PropTypes.object.isRequired,
  statusHandler: PropTypes.func.isRequired,
};

export default Orders;
