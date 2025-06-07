import React from 'react'
import DOMPurify from 'dompurify'
import styles from './Review.module.scss'

interface ReviewItemProps {
  id: number
  content: string
}

const ReviewItem: React.FC<ReviewItemProps> = ({ id, content }) => {
  const cleanHTML = DOMPurify.sanitize(content)

  return (
    <div className={styles.review_item} key={id}>
      <div
        className={styles.review_content}
        dangerouslySetInnerHTML={{ __html: cleanHTML }}
      />
    </div>
  )
}

export default ReviewItem
