import React from 'react';
import { useDrag } from "react-dnd";
import styles from './KanbanItem.module.css';


function KanbanItem({ children, id }) {

  const [{ isDragging }, drag] = useDrag({
    type: 'card',
    item: { id },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });
  const opacity = isDragging ? 0.5 : 1;

  return (
    <>
      <div
        className={styles.customScroll}
        ref={drag}
        style={{ opacity }}
      >
        <ul
          className={styles.dragItemList}
        >
          {children}
        </ul>
      </div>
    </>
  )
}

export default KanbanItem;