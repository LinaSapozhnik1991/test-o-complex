'use client'
import React, { useEffect, useState } from 'react'
import styles from '../styles/page.module.scss'
import ReviewList from '@/entities/review/ui/ReviewList'
import CartControl from '@/entities/cart/ui/CartControl'
import ProductList, { CartItem } from '@/entities/product/ui/ProductList'

export default function Home() {

const [cartItems, setCartItems] = useState<CartItem[]>([])
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart')
      if (savedCart) {
        setCartItems(JSON.parse(savedCart))
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cartItems))
    }
  }, [cartItems])

  const handleCartChange = (items: CartItem[]) => {
    setCartItems(items)
  }

  const clearCart = () => {
    setCartItems([])
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cart')
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
      <div className={styles.title}>
        <h1>тестовое задание</h1>
      </div>
      <ReviewList />
      <CartControl cartItems={cartItems} clearCart={clearCart} />
      <ProductList onCartChange={handleCartChange} />
      </div>
    </div>
  )
}
