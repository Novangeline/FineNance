import { useState } from "react";
import AddSpending from "./components/AddSpending";

function App() {
  const [spending, setSpending] = useState([]);

  const handleAddSpending = (newSpending) => {
    setSpending([...spending, newSpending]);
    console.log("Spending added:", newSpending);
  };

  return (
    <div>
      <h1>Expenses Tracker 💸</h1>
      <AddSpending onAdd={handleAddSpending} />
    </div>
  );
}

export default App;
