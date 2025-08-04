import React, {useEffect, useState} from "react";
import api from "../services/api"; 

const Orders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async() => {
            const res = await api.get("/api/orders/my");
            setOrders(res.data);
        };
        fetchOrders();
    }, []);

    return(
        <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
            {orders.length === 0 ? (
                <p>No orders yet.</p>
            ) : (
                orders.map((order) => (
                    <div key={order._id} className="border p-4 mb-4 rounded shadow">
                        <h3 className="font-semibold">Order ID: {order._id}</h3>
                        <p>Shipping: {order.shipping.name}, {order.shipping.address}</p>
                        <ul className="mt-2">
                            {orders.items.map((item) => (
                                <li key={item._id}>{item.name} X {item.quantity}</li>
                            ))}
                        </ul>
                        <p className="mt-2 font-bold">Total: {order.total}</p>
                        </div>
                ))
            )}
        </div>
    );
};

export default Orders;