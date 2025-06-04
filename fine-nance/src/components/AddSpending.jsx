import { useState } from "react";

export default function AddSpending({ onAdd }) {
  // Initialize form state with empty values for all fields
  const [form, setForm] = useState({
    date: "",
    name: "",
    cost: "",
    category: "",
  });

  // Update the form state when any input field changes
  const handleChange = (e) => {
    // use field's name as key to update its value
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    // prevent page from reloading on form submit
    e.preventDefault();

    // validate all fields
    if (!form.date || !form.name || !form.cost || !form.category) return;

    // send data to the parent, converting cost to a number
    onAdd({ ...form, cost: parseFloat(form.cost) });

    // reset the form after submission
    setForm({ date: "", name: "", cost: "", category: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
      />
      <input
        type="text"
        name="name"
        placeholder="Item"
        value={form.name}
        onChange={handleChange}
      />
      <input
        type="number"
        name="cost"
        placeholder="Cost"
        value={form.cost}
        onChange={handleChange}
      />
      <select name="category" value={form.category} onChange={handleChange}>
        <option value="">Choose category</option>
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Shopping">Shopping</option>
        <option value="Grocery">Grocery</option>
        <option value="Other">Other</option>
      </select>
      <button type="submit">Add</button>
    </form>
  );
}
