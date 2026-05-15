// const React = require("react");
// const api = require("../../utils/api").default;

// const InventoryTable = ({ items, refresh }) => {
//   const updateStock = async (id, type) => {
//     const quantity = Number(prompt("Enter quantity"));
//     if (!quantity) return;

//     await api.post(`/inventory/${id}/${type}`, {
//       quantity,
//       reason: "Manual update"
//     });

//     refresh();
//   };

//   return (
//     <table border="1" cellPadding="10" style={{ marginTop: 20 }}>
//       <thead>
//         <tr>
//           <th>Name</th>
//           <th>Stock</th>
//           <th>Unit</th>
//           <th>Action</th>
//         </tr>
//       </thead>

//       <tbody>
//         {items.map((item) => (
//           <tr key={item._id}>
//             <td>{item.name}</td>
//             <td>{item.stock}</td>
//             <td>{item.unit}</td>
//             <td>
//               <button onClick={() => updateStock(item._id, "in")}>+</button>
//               <button onClick={() => updateStock(item._id, "out")}>-</button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// module.exports = InventoryTable;
import api from "../../utils/api";

const InventoryTable = ({ items, refresh }) => {
  const updateStock = async (id, type) => {
    const quantity = Number(prompt("Enter quantity"));
    if (!quantity) return;

    await api.post(`/inventory/${id}/${type}`, {
      quantity,
      reason: "Manual update"
    });

    refresh();
  };

  return (
    <table border="1" cellPadding="10" style={{ marginTop: 20 }}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Stock</th>
          <th>Unit</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {items.map((item) => (
          <tr key={item._id}>
            <td>{item.name}</td>
            <td>{item.stock}</td>
            <td>{item.unit}</td>
            <td>
              <button onClick={() => updateStock(item._id, "in")}>+</button>
              <button onClick={() => updateStock(item._id, "out")}>-</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InventoryTable;
