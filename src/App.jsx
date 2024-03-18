import {useState } from "react"

import Guitar from "./components/Guitar"
import Header from "./components/Header"
import { db } from "./data/db"

function App() {

  const [data, setData] = useState(db)
  const [cart, setCart] = useState([])
  
  function addToCart(item) {

    //esto itera sobre nuestro carrito de compras
    const itemExists = cart.findIndex(guitar => guitar.id === item.id)
    if(itemExists >= 0){
      const updateCart = [...cart]
      updateCart[itemExists].quantity++
      setCart(updateCart)
    } else {
      item.quantity = 1
      setCart([...cart, item])
    }
  }

  function removeFromCart(id) {
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
  }

  //Crementar el carrito
  function increaseQuantity(id){
    const updatedCart = cart.map(item => {
      if(item.id === id && item.quantity < 5) {
        return {
          ...item, 
          quantity: item.quantity + 1 
        }
      }
      return item
    })
    setCart(updatedCart)
  }
  //Decrementar el carrito
  function decreaseQuantity(id){
    const updatedCart =cart.map(item => {
      if(item.id === id && item.quantity < 1){
        return{
          ...item,
          quantity: item.quantity - 1
        }
      }
      return item
    })
    setCart(updatedCart)
  }

  function clearCart() {
    setCart([])
  }

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
      />
      <main className="container-xl mt-5">
          <h2 className="text-center">Nuestra Colección</h2>

          <div className="row mt-5">
            {data.map((guitar) => (
              
              <Guitar
                key={guitar.id}
                guitar={guitar}
                cart={cart}
                setCart={setCart}
                addToCart={addToCart}
              />    
              
            ))}
                      
          </div>
      </main>


      <footer className="bg-dark mt-5 py-5">
          <div className="container-xl">
              <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
          </div>
      </footer>
    </>
  )
}

export default App
