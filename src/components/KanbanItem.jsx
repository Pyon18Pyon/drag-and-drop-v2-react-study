import React from 'react';
import styles from './KanbanItem.module.css';


function KanbanItem({ children }) {
  return (
    <>
      <div className={styles.customScroll}>
        {children}
      </div>
    </>
  )
}

export default KanbanItem;