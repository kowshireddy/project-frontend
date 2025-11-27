// src/pages/Checkout.jsx
import { useLocation, useNavigate } from "react-router-dom";

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems = [], totalCost = 0 } = location.state || {};

  if (!cartItems.length) {
    return (
      <div className="text-center py-20 text-lg text-gray-600">
        No items to checkout.
      </div>
    );
  }

  const handleConfirm = () => {
    alert("Order placed successfully! (demo)");
    navigate("/"); // go back to home
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 font-poppins">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">
        Checkout
      </h2>

      <div className="space-y-4 mb-8">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-white border rounded-lg p-4 shadow"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-16 object-cover rounded"
              />
              <div>
                <p className="font-semibold text-gray-800">{item.title}</p>
                <p className="text-sm text-gray-600">
                  {typeof item.cost === "number" ? `₹${item.cost}` : item.cost}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center border-t pt-6">
        <p className="text-2xl font-bold text-gray-800 mb-4">
          Total: ₹{totalCost.toLocaleString()}
        </p>
        <button
          className="bg-green-600 text-white text-lg font-medium px-8 py-3 rounded-lg hover:bg-green-700 transition"
          onClick={handleConfirm}
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
}
