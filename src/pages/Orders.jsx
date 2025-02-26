import React, { useState } from "react";
import { FaTimes, FaSearch, FaInfoCircle } from "react-icons/fa";

const OrdersPage = () => {
  const [orders, setOrders] = useState([
    // {
    //   id: "ORD12345",
    //   customer: "John Doe",
    //   date: "2025-01-06",
    //   status: "Pending",
    //   total: "$150.00",
    //   details: "Order contains 3 items: Shoes, Jacket, and Watch.",
    // },
    // {
    //   id: "ORD67890",
    //   customer: "Jane Smith",
    //   date: "2025-01-05",
    //   status: "Completed",
    //   total: "$75.00",
    //   details: "Order contains 1 item: Handbag.",
    // },
    // {
    //   id: "ORD11223",
    //   customer: "Alice Brown",
    //   date: "2025-01-04",
    //   status: "Canceled",
    //   total: "$200.00",
    //   details: "Order contains 5 items: Electronics and Accessories.",
    // },
    // {
    //   id: "ORD33245",
    //   customer: "Robert Taylor",
    //   date: "2025-01-07",
    //   status: "Pending",
    //   total: "$340.00",
    //   details: "Order contains 2 items: Laptop and Mouse.",
    // },
    // {
    //   id: "ORD66578",
    //   customer: "Emily Davis",
    //   date: "2025-01-08",
    //   status: "Completed",
    //   total: "$120.00",
    //   details: "Order contains 3 items: T-Shirt, Jeans, and Sunglasses.",
    // },
    // {
    //   id: "ORD99876",
    //   customer: "Michael Brown",
    //   date: "2025-01-09",
    //   status: "Pending",
    //   total: "$450.00",
    //   details: "Order contains 1 item: Smartphone.",
    // },
    // {
    //   id: "ORD11145",
    //   customer: "Olivia Wilson",
    //   date: "2025-01-10",
    //   status: "Completed",
    //   total: "$90.00",
    //   details: "Order contains 4 items: Books and Stationery.",
    // },
    // {
    //   id: "ORD22334",
    //   customer: "Sophia Martinez",
    //   date: "2025-01-11",
    //   status: "Pending",
    //   total: "$300.00",
    //   details: "Order contains 1 item: Gaming Console.",
    // },
    // {
    //   id: "ORD44556",
    //   customer: "James Anderson",
    //   date: "2025-01-12",
    //   status: "Canceled",
    //   total: "$180.00",
    //   details: "Order contains 2 items: Headphones and Keyboard.",
    // },
    // {
    //   id: "ORD56789",
    //   customer: "Isabella Thomas",
    //   date: "2025-01-13",
    //   status: "Completed",
    //   total: "$50.00",
    //   details: "Order contains 1 item: Coffee Maker.",
    // },
    // {
    //   id: "ORD76899",
    //   customer: "Liam Moore",
    //   date: "2025-01-14",
    //   status: "Pending",
    //   total: "$800.00",
    //   details: "Order contains 3 items: Camera, Tripod, and Memory Card.",
    // },
    // {
    //   id: "ORD87654",
    //   customer: "Charlotte Jackson",
    //   date: "2025-01-15",
    //   status: "Completed",
    //   total: "$35.00",
    //   details: "Order contains 2 items: Mug and Notebook.",
    // },
    // {
    //   id: "ORD65432",
    //   customer: "Mason Garcia",
    //   date: "2025-01-16",
    //   status: "Pending",
    //   total: "$1,500.00",
    //   details: "Order contains 1 item: High-End Desktop Computer.",
    // },
    // {
    //   id: "ORD23456",
    //   customer: "Ava Rodriguez",
    //   date: "2025-01-17",
    //   status: "Completed",
    //   total: "$65.00",
    //   details: "Order contains 2 items: Wireless Mouse and Keyboard.",
    // },
    // {
    //   id: "ORD78901",
    //   customer: "Ethan Lee",
    //   date: "2025-01-18",
    //   status: "Canceled",
    //   total: "$250.00",
    //   details: "Order contains 1 item: Smartwatch.",
    // },
    // {
    //   id: "ORD89012",
    //   customer: "Harper Gonzalez",
    //   date: "2025-01-19",
    //   status: "Pending",
    //   total: "$400.00",
    //   details: "Order contains 5 items: Clothing and Accessories.",
    // },
    // {
    //   id: "ORD34567",
    //   customer: "Ella Hernandez",
    //   date: "2025-01-20",
    //   status: "Completed",
    //   total: "$125.00",
    //   details: "Order contains 3 items: Blender, Toaster, and Utensils.",
    // },
    // {
    //   id: "ORD45678",
    //   customer: "Aiden Martinez",
    //   date: "2025-01-21",
    //   status: "Pending",
    //   total: "$70.00",
    //   details: "Order contains 2 items: Shoes and Socks.",
    // },
    // {
    //   id: "ORD56789",
    //   customer: "Aria King",
    //   date: "2025-01-22",
    //   status: "Canceled",
    //   total: "$60.00",
    //   details: "Order contains 1 item: Phone Case.",
    // },
    // {
    //   id: "ORD67891",
    //   customer: "Benjamin Adams",
    //   date: "2025-01-23",
    //   status: "Completed",
    //   total: "$500.00",
    //   details: "Order contains 1 item: Drone.",
    // },
    // {
    //   id: "ORD78902",
    //   customer: "Grace Young",
    //   date: "2025-01-24",
    //   status: "Pending",
    //   total: "$30.00",
    //   details: "Order contains 3 items: Books and Journals.",
    // },
    // {
    //   id: "ORD89013",
    //   customer: "Henry Hill",
    //   date: "2025-01-25",
    //   status: "Completed",
    //   total: "$300.00",
    //   details: "Order contains 1 item: Air Purifier.",
    // },
    // {
    //   id: "ORD12346",
    //   customer: "Mila Scott",
    //   date: "2025-01-26",
    //   status: "Pending",
    //   total: "$1,200.00",
    //   details: "Order contains 2 items: Laptop and Monitor.",
    // },
    // {
    //   id: "ORD23457",
    //   customer: "Lucas Lopez",
    //   date: "2025-01-27",
    //   status: "Canceled",
    //   total: "$100.00",
    //   details: "Order contains 3 items: T-Shirts and Shorts.",
    // },
    // {
    //   id: "ORD34568",
    //   customer: "Scarlett Green",
    //   date: "2025-01-28",
    //   status: "Pending",
    //   total: "$500.00",
    //   details: "Order contains 2 items: Refrigerator and Microwave.",
    // },
    // {
    //   id: "ORD45679",
    //   customer: "Jack Baker",
    //   date: "2025-01-29",
    //   status: "Completed",
    //   total: "$800.00",
    //   details: "Order contains 1 item: Smart TV.",
    // },
    // {
    //   id: "ORD56790",
    //   customer: "Luna Carter",
    //   date: "2025-01-30",
    //   status: "Pending",
    //   total: "$1,000.00",
    //   details: "Order contains 3 items: Sofa, Table, and Chair.",
    // },
    // {
    //   id: "ORD67892",
    //   customer: "William Perez",
    //   date: "2025-01-31",
    //   status: "Canceled",
    //   total: "$450.00",
    //   details: "Order contains 1 item: Sound System.",
    // },
    // {
    //   id: "ORD78903",
    //   customer: "Aurora Rivera",
    //   date: "2025-02-01",
    //   status: "Pending",
    //   total: "$600.00",
    //   details: "Order contains 4 items: Fitness Equipment.",
    // },
  ]);

  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = orders.filter(
      (order) =>
        order.customer.toLowerCase().includes(query) ||
        order.id.toLowerCase().includes(query)
    );
    setFilteredOrders(filtered);
  };

  const handleFilter = (status) => {
    if (status === "All") {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter((order) => order.status === status);
      setFilteredOrders(filtered);
    }
  };

  const handleOrderAction = (action, order) => {
    if (action === "Cancel") {
      setOrders((prevOrders) =>
        prevOrders.map((o) =>
          o.id === order.id ? { ...o, status: "Canceled" } : o
        )
      );
      setFilteredOrders((prevOrders) =>
        prevOrders.map((o) =>
          o.id === order.id ? { ...o, status: "Canceled" } : o
        )
      );
    } else if (action === "Details") {
      setSelectedOrder(order);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8 bg-white rounded-xl shadow-lg space-y-8">
      <h1 className="text-4xl font-bold text-gray-800">Orders</h1>

      {/* Search and Filter Section */}
      <div className="flex flex-wrap items-center justify-between space-y-4 sm:space-y-0">
        <div className="relative flex items-center">
          <FaSearch className="absolute left-3 text-gray-500" />
          <input
            type="text"
            placeholder="Search by Order ID or Customer Name"
            value={searchQuery}
            onChange={handleSearch}
            className="pl-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-80"
          />
        </div>

        <div className="flex space-x-4">
          {["All", "Pending", "Completed", "Canceled"].map((status) => (
            <button
              key={status}
              onClick={() => handleFilter(status)}
              className="px-4 py-2 bg-gray-200 rounded-lg text-sm font-medium hover:bg-gray-300 focus:ring-2 focus:ring-blue-500"
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">Order ID</th>
              <th className="px-4 py-2">Customer</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Total</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className="border-t border-gray-300">
                <td className="px-4 py-2">{order.id}</td>
                <td className="px-4 py-2">{order.customer}</td>
                <td className="px-4 py-2">{order.date}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-2">{order.total}</td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => handleOrderAction("Details", order)}
                    className="text-blue-500 hover:underline"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleOrderAction("Cancel", order)}
                    className="text-red-500 hover:underline ml-4"
                  >
                    Cancel Order
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Order Details */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-md w-full space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-2xl font-semibold">
                Order Details: {selectedOrder.id}
              </h4>
              <button onClick={() => setSelectedOrder(null)}>
                <FaTimes className="text-gray-500 hover:text-gray-800" />
              </button>
            </div>
            <p className="text-gray-600">{selectedOrder.details}</p>
            <div className="flex justify-end">
              <button
                onClick={() => setSelectedOrder(null)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
