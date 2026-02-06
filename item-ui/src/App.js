import { useState } from "react";

function App() {
  // ADD ITEM STATES
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [addMessage, setAddMessage] = useState("");

  // GET ITEM STATES
  const [itemId, setItemId] = useState("");
  const [item, setItem] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ADD ITEM (POST)
  const addItem = () => {
    if (!name || !price || !description) {
      setAddMessage("Please fill all fields");
      return;
    }

    fetch("https://itemapi-7.onrender.com/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        price,
        description
      })
    })
      .then(res => res.json())
      .then(data => {
        setAddMessage(`Item added successfully ✅ (ID: ${data.id})`);
        setName("");
        setPrice("");
        setDescription("");
      })
      .catch(() => {
        setAddMessage("Error adding item ❌");
      });
  };

  // GET ITEM (GET)
  const getItem = () => {
    if (!itemId) {
      setError("Enter Item ID");
      return;
    }

    setLoading(true);
    setError("");
    setItem(null);

    fetch(`https://itemapi-7.onrender.com/items/${itemId}`)
      .then(res => {
        if (!res.ok) throw new Error("Item not found");
        return res.json();
      })
      .then(data => {
        setItem(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px" }}>
      <h2>Add Item</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      /><br /><br />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={e => setPrice(e.target.value)}
      /><br /><br />

      <input
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      /><br /><br />

      <button onClick={addItem}>Add Item</button>

      {addMessage && <p>{addMessage}</p>}

      <hr />

      <h2>Get Item by ID</h2>

      <input
        type="number"
        placeholder="Enter Item ID"
        value={itemId}
        onChange={e => setItemId(e.target.value)}
      />
      <button onClick={getItem} style={{ marginLeft: "10px" }}>
        Get Item
      </button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {item && (
        <div>
          <p><b>ID:</b> {item.id}</p>
          <p><b>Name:</b> {item.name}</p>
          <p><b>Price:</b> {item.price}</p>
          <p><b>Description:</b> {item.description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
