import React from "react";
import {
  FaFilter,
  FaEllipsisV,
  FaStore,
  FaShoppingCart,
  FaUsers,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import SalesChart from "../components/Chart";

// Sample product data
const productData = [
  {
    name: "Product A",
    price: "$120",
    sold: 150,
    status: "In Stock",
    statusColor: "green",
  },
  {
    name: "Product B",
    price: "$45",
    sold: 80,
    status: "Out of Stock",
    statusColor: "red",
  },
  {
    name: "Product C",
    price: "$230",
    sold: 200,
    status: "In Stock",
    statusColor: "green",
  },
  {
    name: "Product D",
    price: "$85",
    sold: 90,
    status: "Out of Stock",
    statusColor: "red",
  },
];

const data = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 4000 },
  { name: "May", sales: 6000 },
  { name: "Jun", sales: 7000 },
];

const Dashboard = () => {
  return (
    <div className="bg-blue-50 p-4 min-h-screen space-y-5 w-full">
      {/* Cards and Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart */}
        <div className="lg:col-span-2">
          <SalesChart data={data} />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 ">
          {[
            {
              title: "Total Sales",
              value: "$108,560.93",
              change: "+13.02%",
              color: "green",
              icon: <FaStore className="h-6 w-6 text-blue-600" />,
            },
            {
              title: "Avg. Order Value",
              value: "$564.34",
              change: "+3.02%",
              color: "green",
              icon: <FaShoppingCart className="h-6 w-6 text-purple-600" />,
            },
            {
              title: "Online Sessions",
              value: "130,234",
              change: "+6.02%",
              color: "green",
              icon: <FaUsers className="h-6 w-6 text-teal-600" />,
            },
            {
              title: "Conversion Rate",
              value: "86.34%",
              change: "-0.32%",
              color: "red",
              icon: <FaArrowDown className="h-6 w-6 text-red-600" />,
            },
          ].map((card, idx) => (
            <div
              key={idx}
              className="bg-white p-4 flex flex-col gap-2 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              {/* Card Header with Icon and Options Icon */}
              <div className="flex items-center justify-between mb-2">
                {card.icon}
                <FaEllipsisV className="text-gray-600 cursor-pointer hover:text-gray-800" />
              </div>

              {/* Card Title */}
              <h4 className="text-gray-600 font-medium text-sm">
                {card.title}
              </h4>

              {/* Card Value */}
              <p className="text-lg font-bold mt-1">{card.value}</p>

              {/* Card Change Percentage */}
              <p
                className={`mt-1 font-medium ${
                  card.color === "green" ? "text-green-500" : "text-red-500"
                }`}
              >
                {card.change}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-blue-50 p-4 rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-semibold text-gray-700">
            Selling Products
          </h3>
          <button className="flex items-center gap-2 px-5 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-all duration-300">
            <FaFilter className="h-5 w-5 text-gray-600" />
            <span className="text-sm text-gray-600">Filter</span>
          </button>
        </div>
        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gradient-to-r from-blue-100 to-blue-200 text-gray-600 font-semibold">
              <th className="py-3 px-6 text-left">Product Name</th>
              <th className="py-3 px-6 text-right">Price</th>
              <th className="py-3 px-6 text-right">Sold</th>
              <th className="py-3 px-6 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {productData.map((product, idx) => (
              <tr
                key={idx}
                className="border-b border-gray-200 hover:bg-blue-50 transition-all duration-300"
              >
                <td className="py-4 px-6 text-gray-700">{product.name}</td>
                <td className="py-4 px-6 text-right text-gray-700">
                  {product.price}
                </td>
                <td className="py-4 px-6 text-right text-gray-700">
                  {product.sold}
                </td>
                <td
                  className={`py-4 px-6 font-semibold text-${
                    product.statusColor === "green" ? "green-500" : "red-500"
                  }`}
                >
                  {product.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
