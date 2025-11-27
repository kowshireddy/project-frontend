// src/pages/Cart.jsx
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom"; 

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  // Fetch Cart Items
  const fetchCart = async () => {
    const user = auth.currentUser;
    if (!user) {
      setCartItems([]);
      setLoading(false);
      return;
    }

    try {
      const cartRef = collection(db, "users", user.uid, "cart");
      const cartSnap = await getDocs(cartRef);
      const items = cartSnap.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
      setCartItems(items);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Delete Item from Cart
  const handleDelete = async (itemId) => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      await deleteDoc(doc(db, "users", user.uid, "cart", String(itemId)));
      setCartItems((prev) =>
        prev.filter((item) => String(item.id) !== String(itemId))
      );
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // Calculate Total Cost safely (handles number or string or missing)
  const totalCost = cartItems.reduce((total, item) => {
    let costNumber = 0;

    if (typeof item.cost === "number") {
      costNumber = item.cost;
    } else if (typeof item.cost === "string") {
      const parsed = parseInt(item.cost.replace(/[^0-9]/g, ""), 10);
      costNumber = isNaN(parsed) ? 0 : parsed;
    } else {
      costNumber = 0;
    }

    return total + costNumber;
  }, 0);

  if (loading) {
    return (
      <div className="text-center py-20 text-lg text-gray-600">
        Loading your cart...
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20 text-lg text-gray-500">
        Your cart is empty.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 font-poppins">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">
        🛒 My Cart
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="bg-white border rounded-xl shadow-lg overflow-hidden relative group transition-all hover:shadow-2xl"
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-semibold text-gray-800">
                {item.title}
              </h3>
              <p className="text-blue-600 font-medium">
                {typeof item.cost === "number" ? `₹${item.cost}` : item.cost}
              </p>
            </div>

            <button
              onClick={() => handleDelete(item.id)}
              className="absolute top-3 right-3 text-2xl text-gray-700 hover:text-red-600 transition"
              title="Remove"
            >
              <RxCross2 />
            </button>
          </div>
        ))}
      </div>

      {/* Total + Checkout */}
      <div className="mt-12 border-t pt-6 text-center">
        <p className="text-2xl font-bold text-gray-800 mb-4">
          Total: ₹{totalCost.toLocaleString()}
        </p>
        <button
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-lg font-medium px-8 py-3 rounded-lg hover:shadow-lg transition"
  onClick={() => navigate("/checkout", { state: { cartItems, totalCost } })}
>
  Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
