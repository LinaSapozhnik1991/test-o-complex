'use client'
import React, { useEffect, useState } from 'react'
import ReviewItem from './ReviewItem'
import { fetchReviews } from '../model/reviewApi'
import styles from './Review.module.scss'

const ReviewList: React.FC = () => {
  const [reviews, setReviews] = useState<{ id: number; text: string }[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const data = await fetchReviews()
        setReviews(data)
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    }

    loadReviews()
  }, [])

  if (loading) return <div className={styles.loading}>Загрузка...</div>
  if (error) return <div className={styles.error}>Ошибка: {error}</div>

  return (
    <div className={styles.review_list}>
      {reviews.map(({ id, text }) => (
        <ReviewItem key={id} id={id} content={text} />
      ))}
    </div>
  )
}

export default ReviewList
