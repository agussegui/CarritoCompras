import {useState, useEffect, useMemo } from "react"
import { db } from "../data/db"


export const useCart = () => {

  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

  const [data] = useState(db)
  const [cart, setCart] = useState(initialCart)

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])
  
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

  //El Hook useMemo sirve mas que nada para el performance
  //State derivado
  const isEmpty = useMemo(() => cart.length === 0, [cart])
  const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0 ), [cart])

  return { 
    data, 
    cart,
    addToCart,
    removeFromCart,
    decreaseQuantity,
    increaseQuantity,
    clearCart, 
    isEmpty,
    cartTotal
  }
}
