import { useState } from "react";
import api from "../../utils/api";

const AddInventoryItem = ({ refresh }) => {
  const [form, setForm] = useState({
    name: "",
    sku: "",
    unit: "",
    stock: ""
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    await api.post("/inventory", {
      ...form,
      stock: Number(form.stock)
    });
    setForm({ name: "", sku: "", unit: "", stock: "" });
    refresh();
  };

  return (
    <form onSubmit={submitHandler}>
      <h3>Add Inventory Item</h3>

      <input
        placeholder="Item Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="SKU"
        value={form.sku}
        onChange={(e) => setForm({ ...form, sku: e.target.value })}
      />

      <input
        placeholder="Unit (kg, pcs)"
        value={form.unit}
        onChange={(e) => setForm({ ...form, unit: e.target.value })}
      />

      <input
        type="number"
        placeholder="Initial Stock"
        value={form.stock}
        onChange={(e) => setForm({ ...form, stock: e.target.value })}
      />

      <button type="submit">Add Item</button>
    </form>
  );
};

export default AddInventoryItem;
