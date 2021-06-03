import React, { useRef } from "react";
import styles from "./KanbanColumn.module.css";
import { labelsMap } from '../kanbanLists';
import cx from "classnames";

function Kanban({ children, changeTaskStatus, style, status }) {

  const btn = cx(styles.addBtn, styles.solid);
  const column = cx(styles.dragColumn, styles[style]);

  return (
    <li
      className={column}
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

export default Kanban;
