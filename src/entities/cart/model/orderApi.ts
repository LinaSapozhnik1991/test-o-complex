import api from '@/shared/lib/api'

export interface OrderItem {
  id: number
  quantity: number
}

export interface OrderRequest {
  phone: string
  cart: OrderItem[]
}

export interface OrderResponseSuccess {
  success: 1
}

export interface OrderResponseError {
  success: 0
  error: string
}

export type OrderResponse = OrderResponseSuccess | OrderResponseError

export const placeOrder = async (
  orderData: OrderRequest
): Promise<OrderResponse> => {
  try {
    const response = await api.post<OrderResponse>('/order', orderData)
    return response.data
  } catch (error) {
    throw error
  }
}
