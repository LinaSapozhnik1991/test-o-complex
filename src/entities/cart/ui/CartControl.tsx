import React, { useState, useEffect } from 'react'
import styles from './Cart.module.scss'
import { Product } from '@/entities/product/model/productApi'
import { OrderRequest, placeOrder } from '../model/orderApi'
import { formatPhoneNumber } from '../model/phoneUtils'
import axios from 'axios'
import OrderSuccessPopup from '@/widgets/popup/ui/OrderSuccessPopup'

interface CartItem {
  product: Product
  quantity: number
}

interface CartControlProps {
  cartItems: CartItem[]
  clearCart: () => void 
}

const CartControl: React.FC<CartControlProps> = ({ cartItems, clearCart }) => {
  const [phone, setPhone] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)
  const [phoneError, setPhoneError] = useState<boolean>(false)

  useEffect(() => {
    const savedPhone = localStorage.getItem('phone')
    if (savedPhone) {
      setPhone(savedPhone)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('phone', phone)
  }, [phone])

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value
    const formatted = formatPhoneNumber(input)
    setPhone(formatted)
    setPhoneError(false)
  }

const handleOrder = async () => {
  const cleanedPhone = phone.replace(/\D/g, '')

  if (cleanedPhone.length !== 11 || !cleanedPhone.startsWith('7')) {
    setError('Номер телефона должен быть в формате 7XXXXXXXXXX')
    setPhoneError(true)
    setSuccess(false)
    return
  }

  const orderData: OrderRequest = {
    phone: cleanedPhone,
    cart: cartItems.map(({ product, quantity }) => ({
      id: product.id,
      quantity
    }))
  }

  try {
    const result = await placeOrder(orderData)
    if (result.success === 1) {
      setSuccess(true)
      setError(null)
      clearCart()
    } else {
      setError(result.error || 'Ошибка оформления заказа')
    }
  } catch (err) {
    console.error('Ошибка при оформлении заказа:', err)
    setError('Ошибка при оформлении заказа')
  }
}
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0
  )

  const closePopup = () => {
    setSuccess(false)
  }

  return (
    <div className={styles.cart}>
      <h2>Добавленные товары</h2>
      <div className={styles.cartItems}>
        {cartItems.length > 0 ? (
          cartItems.map(({ product, quantity }) => (
            <div key={product.id} className={styles.cartItem}>
              <span className={styles.title}>{product.title}</span>
              <span>x{quantity}</span>
              <span>{quantity * product.price} ₽</span>
            </div>
          ))
        ) : (
          <div className={styles.emptyCart}>Корзина пуста</div>
        )}
      </div>

      <div className={styles.orderSection}>
        <input
          type="tel"
          placeholder="+7 (___) ___-__-__"
          value={phone}
          onChange={handlePhoneChange}
          className={`${styles.phoneInput} ${phoneError ? styles.error : ''}`}
          maxLength={18}
        />
        {error && <div className={styles.errorMessage}>{error}</div>}
        <button onClick={handleOrder} className={styles.orderButton}>
          заказать {totalAmount} ₽
        </button>
      </div>

      {success && <OrderSuccessPopup onClose={closePopup} />}
    </div>
  )
}

export default CartControl
