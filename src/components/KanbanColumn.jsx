import React, { useState } from "react";
import { useDrop } from "react-dnd";
import styles from "./KanbanColumn.module.css";
import EditableElement from './EditableElement';
import { labelsMap } from '../kanbanLists';
import cx from "classnames";

function KanbanColumn({ children, changeTaskStatus, style, status }) {

  const btn = cx(styles.addBtn, styles.solid);

  const column = cx(styles.dragColumn, styles[style]);

  const [showForm, setShowForm] = useState(false);

  const [, drop] = useDrop({
    accept: 'card',
    drop: (item) =>
      changeTaskStatus(item.id, status)
  });

  const showInputBox = () => {
    setShowForm(true);
  };

  return (
    <li
      className={column}
      ref={drop}
    >
      <span className={styles.header}>
        <h1>{labelsMap[status]}</h1>
      </span>
      {children}
      {/* Add Button Group */}
      {!showForm ? (
        <div className={styles.addBtnWrapper}>
          <div className={styles.addBtn} onClick={showInputBox}>
            <span className={styles.plusSign}>+</span>
            <span>Add Item</span>
          </div>
        </div>
      ) : (

        <div >
          <div className={btn}>
            <span>Save Item</span>
          </div>

          <div className={styles.addContainer}>
            <EditableElement>
              <div className={styles.addItem}></div>
            </EditableElement>
          </div>
        </div>
      )}
    </li>
  );
}

export default KanbanColumn;
