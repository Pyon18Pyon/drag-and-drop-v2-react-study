import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { nanoid } from 'nanoid'
import styles from "./KanbanColumn.module.css";
import EditableElement from './EditableElement';
import { labelsMap } from '../kanbanLists';
import cx from "classnames";

function KanbanColumn({ children, changeTaskStatus, style, status, setTasksStatus, tasks }) {

  // Style
  const btn = cx(styles.addBtn, styles.solid);
  const column = cx(styles.dragColumn, styles[style]);

  // State
  const [showForm, setShowForm] = useState(false);
  const [newText, setNewText] = useState('');

  const [, drop] = useDrop({
    accept: 'card',
    drop: (item) =>
      changeTaskStatus(item.id, status)
  });

  const showInputBox = () => {
    setShowForm(true);
  };

  const handleChange = (event) => {
    console.log(event);
    setNewText(event);
  };

  const addNewItem = () => {
    console.log('newText:', newText);
    const addNewText = tasks.concat({ title: newText, status: status, _id: nanoid() });
    setTasksStatus(addNewText);
    setShowForm(false);
    setNewText('');
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
          <div className={btn} onClick={addNewItem}>
            <span>Save Item</span>
          </div>

          <div className={styles.addContainer}>
            <EditableElement onChange={handleChange}>
              <div className={styles.addItem}></div>
            </EditableElement>
          </div>
        </div>
      )}
    </li>
  );
}

export default KanbanColumn;
