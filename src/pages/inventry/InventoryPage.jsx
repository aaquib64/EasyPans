// const React = require("react");
// const { useEffect, useState } = React;
// const api = require("../../utils/api").default;

// const AddInventoryItem = require("./AddInventoryItem");
// const InventoryTable = require("./InventoryTable");

// const InventoryPage = () => {
//   const [items, setItems] = useState([]);

//   const fetchInventory = async () => {
//     const response = await api.get("/inventory");
//     setItems(response.data);
//   };

//   useEffect(() => {
//     fetchInventory();
//   }, []);

//   const user = JSON.parse(localStorage.getItem("userInfo"));

//   if (!user || user.role !== "admin") {
//     return <h2>Access Denied</h2>;
//   }

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Inventory Management</h2>

//       <AddInventoryItem refresh={fetchInventory} />
//       <InventoryTable items={items} refresh={fetchInventory} />
//     </div>
//   );
// };

// module.exports = InventoryPage;


import { useEffect, useState } from "react";
import api from "../../utils/api";
import AddInventoryItem from "./AddInventoryItem";
import InventoryTable from "./InventoryTable";

const InventoryPage = () => {
  const [items, setItems] = useState([]);

  const fetchInventory = async () => {
    const { data } = await api.get("/inventory");
    setItems(data);
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Inventory Management</h2>

      <AddInventoryItem refresh={fetchInventory} />
      <InventoryTable items={items} refresh={fetchInventory} />
    </div>
  );
};

export default InventoryPage;
