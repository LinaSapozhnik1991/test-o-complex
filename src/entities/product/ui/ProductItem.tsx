import React, { useEffect, useState } from 'react'
import styles from './Product.module.scss'
import Image from 'next/image'
import commonImage from '../../../shared/assets/chimp.png'
import { Product } from '../model/productApi'

interface ProductItemProps {
  product?: Product | null
  initialQuantity?: number
  onAddToCart: (product: Product, quantity: number) => void
}

const ProductItem: React.FC<ProductItemProps> = ({ product, onAddToCart }) => {
  if (!product) {
    return <div>Товар не найден</div>
  }

  const storageKey = `cart_quantity_${product.id}`

  const [quantity, setQuantity] = useState<number>(1)
  const [isInCart, setIsInCart] = useState<boolean>(false)

  useEffect(() => {
    const savedQuantity = localStorage.getItem(storageKey)
    if (savedQuantity) {
      const num = Number(savedQuantity)
      if (num > 0) {
        setQuantity(num)
        setIsInCart(true)
        onAddToCart(product, num)
      }
    }
  }, [product, storageKey, onAddToCart])

  const updateQuantity = (newQuantity: number) => {
    if (newQuantity <= 0) {
      setIsInCart(false)
      setQuantity(1)
      localStorage.removeItem(storageKey)
      onAddToCart(product, 0)
    } else {
      setIsInCart(true)
      setQuantity(newQuantity)
      localStorage.setItem(storageKey, newQuantity.toString())
      onAddToCart(product, newQuantity)
    }
  }

  const handleAddToCart = () => {
    updateQuantity(1)
  }

  const handleIncrease = () => {
    updateQuantity(quantity + 1)
  }

  const handleDecrease = () => {
    updateQuantity(quantity - 1)
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    if (isNaN(value)) {
      updateQuantity(1)
    } else {
      updateQuantity(value)
    }
  }

  return (
    <div className={styles.productItem}>
      <Image
        src={product.image_url || commonImage}
        alt={product.title}
        width={281}
        height={366}
      />
      <h3>{product.title}</h3>
      <p className={styles.description}>{product.description}</p>
      <p className={styles.price}>{product.price} ₽</p>
      {isInCart ? (
        <div className={styles.quantityControl}>
          <button className={styles.controlButton} onClick={handleDecrease}>
            -
          </button>
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            min={1}
            className={styles.quantityInput}
          />
          <button className={styles.controlButton} onClick={handleIncrease}>
            +
          </button>
        </div>
      ) : (
        <button onClick={handleAddToCart} className={styles.buyButton}>
          Купить
        </button>
      )}
    </div>
  )
}

export default ProductItem
