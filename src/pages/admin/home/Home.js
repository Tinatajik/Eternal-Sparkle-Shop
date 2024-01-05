import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import Header from "../../../component/admin/header/Header";

const AdminHome = () => {
  const [orderChartData, setOrderChartData] = useState([]);
  const [productChartData, setProductChartData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/orders/")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched order data:", data);

        if (data.status === "success" && Array.isArray(data.data.orders)) {
          const orderStatusCounts = {
            delivery: 0,
            pending: 0,
          };

          data.data.orders.forEach((order) => {
            if (order.deliveryStatus) {
              orderStatusCounts.delivery += 1;
            } else {
              orderStatusCounts.pending += 1;
            }
          });

          setOrderChartData([
            {
              name: "Delivery",
              count: orderStatusCounts.delivery,
              color: "green",
            },
            { name: "Pending", count: orderStatusCounts.pending, color: "red" },
          ]);
        } else {
          console.error("Invalid data format. Expected an array of orders.");
        }
      })
      .catch((error) => console.error("Error fetching order data:", error));

    fetch("http://localhost:8000/api/products/")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched product data:", data);

        if (data.status === "success" && Array.isArray(data.data.products)) {
          const productCounts = data.data.products.map((product) => ({
            name: product.name,
            count: product.quantity || 0,
            color: "purple",
          }));

          setProductChartData(productCounts);
        } else {
          console.error("Invalid data format. Expected an array of products.");
        }
      })
      .catch((error) => console.error("Error fetching product data:", error));
  }, []);

  const renderChart = (data, title, yAxisLabel, color) => (
    <div style={{ width: "80%", margin: "20px auto" }}>
      <h2>{title}</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="name" />
          <YAxis
            label={{ value: yAxisLabel, angle: -90, position: "insideLeft" }}
          />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill={color} barSize={15}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <>
      <Header />
      <div className="absolute top-20 left-[20rem] w-3/4 ">
        <h1>WELCOME TO HOME</h1>
        <div className="flex justify-evenly">
          {renderChart(orderChartData, "Order Status", "Count", "#8884d8")}
          {renderChart(
            productChartData,
            "Product Counts",
            "Quantity",
            "purple"
          )}
        </div>
      </div>
    </>
  );
};

export default AdminHome;
