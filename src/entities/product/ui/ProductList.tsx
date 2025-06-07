'use client'
import React, { useEffect, useState, useCallback } from 'react'
import ProductItem from './ProductItem'
import { fetchProducts, Product } from '../model/productApi'
import styles from './Product.module.scss'

interface ProductListProps {
  onCartChange: (cartItems: CartItem[]) => void
}

export interface CartItem {
  product: Product
  quantity: number
}

const ProductList: React.FC<ProductListProps> = ({ onCartChange }) => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState<number>(1)
  const pageSize = 20
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const loadProducts = useCallback(async (pageToLoad: number) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetchProducts(pageToLoad, pageSize)
      if (pageToLoad === 1) {
        setProducts(response.items)
      } else {
        setProducts(prev => [...prev, ...response.items])
      }
      setHasMore(response.items.length === pageSize)
    } catch (err) {
      setError('Ошибка при загрузке продуктов')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadProducts(1)
  }, [loadProducts])

  useEffect(() => {
    if (!hasMore || loading) return

    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY
      const threshold = document.body.offsetHeight - 100

      if (scrollPosition >= threshold) {
        setPage(prev => prev + 1)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [hasMore, loading])

  useEffect(() => {
    if (page === 1) return
    loadProducts(page)
  }, [page, loadProducts])

const handleAddToCart = useCallback((product: Product, quantity: number) => {
  setCartItems(prev => {
    const existing = prev.find(item => item.product.id === product.id)
    if (existing) {
      if (quantity <= 0) {
        return prev.filter(item => item.product.id !== product.id)
      } else {
        return prev.map(item =>
          item.product.id === product.id ? { ...item, quantity } : item
        )
      }
    } else {
      if (quantity > 0) {
        return [...prev, { product, quantity }]
      }
      return prev
    }
  })
}, [])

  useEffect(() => {
    onCartChange(cartItems)
  }, [cartItems, onCartChange])

  return (
    <>
      <div className={styles.productList}>
        {products.map(product => (
          <ProductItem
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
            initialQuantity={
              cartItems.find(item => item.product.id === product.id)?.quantity || 0
            }
          />
        ))}
      </div>

      {loading && <div className={styles.loading}>Загрузка...</div>}
      {error && <div className={styles.error}>{error}</div>}
      {!hasMore && <div className={styles.hasMore}>Больше товаров нет</div>}
    </>
  )
}

export default ProductList
