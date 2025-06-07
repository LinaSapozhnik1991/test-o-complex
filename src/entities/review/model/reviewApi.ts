import api from '@/shared/lib/api'

export const fetchReviews = async () => {
  const response = await api.get('/reviews')
  return response.data
}
