import React, { useRef } from 'react';
import { useDrag } from "react-dnd";
import styles from './KanbanItem.module.css';


function KanbanItem({ children, id }) {

  const ref = useRef(null);
  const [{ isDragging }, drag] = useDrag({
    type: 'card',
    item: { id },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });
  const opacity = isDragging ? 0 : 1;
  drag(ref);

  return (
    <>
      <div
        className={styles.customScroll}
        ref={ref}
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