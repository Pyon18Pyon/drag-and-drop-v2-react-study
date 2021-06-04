import React, { useRef } from "react";
import { useDrop } from "react-dnd";
import styles from "./KanbanColumn.module.css";
import { labelsMap } from '../kanbanLists';
import cx from "classnames";

function KanbanColumn({ children, changeTaskStatus, style, status }) {

  const btn = cx(styles.addBtn, styles.solid);
  const column = cx(styles.dragColumn, styles[style]);

  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: 'card',
    drop(item) {
      changeTaskStatus(item.id, status);
    }
  });
  drop(ref);


  return (
    <li
      className={column}
      ref={ref}
    >
      <span className={styles.header}>
        <h1>{labelsMap[status]}</h1>
      </span>
      {children}
      {/* Add Button Group */}
      <div className={styles.addBtnGroup}>
        <div className={styles.addBtn}>
          <span className={styles.plusSign}>+</span>
          <span>Add Item</span>
        </div>
        <div className={btn}>
          <span>Save Item</span>
        </div>
      </div>
      <div className={styles.addContainer}>
        <div className={styles.addItem}></div>
      </div>
    </li>
  );
}

export default KanbanColumn;
