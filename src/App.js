import { useState } from "react";
import { CartProvider } from "./store/cart-context";
import Header from "./Layout/Header";
import Meals from "./Meals/Meals";
import Cart from "./Cart/Cart";
function App() {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  return (
    <CartProvider>
      {openModal && <Cart onClose={handleCloseModal} />}
      <Header onHandleOpenModal={handleOpenModal} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
