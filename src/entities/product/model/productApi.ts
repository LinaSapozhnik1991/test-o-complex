import api from '@/shared/lib/api';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image_url: string;
  quantity?: number | null
}

export interface ProductResponse {
  page: number;
  amount: number;
  total: number;
  items: Product[];
}

export const fetchProducts = async (
  page: number = 1,
  pageSize: number = 20
): Promise<ProductResponse> => {
  try {
    const response = await api.get(
      `/products?page=${page}&page_size=${pageSize}`
    );
    return response.data;
  } catch (error) {
    console.error('Ошибка при загрузке продуктов:', error);
    throw error;
  }
};
