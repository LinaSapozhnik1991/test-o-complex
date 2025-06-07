
import React from 'react';
import styles from './OrderSuccessPopup.module.scss'; 

const OrderSuccessPopup: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContent}>
        <h3>Заказ успешно оформлен!</h3>
        <p>Спасибо за ваш заказ. Мы свяжемся с вами в ближайшее время.</p>
        <button onClick={onClose} className={styles.closeButton}>
          Закрыть
        </button>
      </div>
    </div>
  );
}

export default OrderSuccessPopup;
