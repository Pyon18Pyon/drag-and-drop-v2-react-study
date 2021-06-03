import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import KanbanColumn from './components/KanbanColumn';
import KanbanItem from './components/KanbanItem';
import { tasksList, channels, labelsMap } from './kanbanLists';
import styles from "./App.module.css";
import cx from "classnames";

function App() {

  const btn = cx(styles.addBtn, styles.solid);

  const [tasks, setTasksStatus] = useState(tasksList);


  return (
    <>
      <h1 className={styles.mainTitle}>Kanban Board</h1>
      <DndProvider backend={HTML5Backend}>
        {/* <Container> */}
        <div className={styles.dragContainer}>
          <ul className={styles.dragList}>
            {channels.map(({ label, style }) => {
              const column = cx(styles.dragColumn, styles[style]);
              return (
                <KanbanColumn
                  key={label}
                  status={label}
                >
                  <li
                    className={column}
                  >
                    <span className={styles.header}>
                      <h1>{labelsMap[label]}</h1>
                    </span>
                    <KanbanItem>
                      <div className={styles.customScroll}>
                        <ul
                          className={styles.dragItemList}
                        >
                          {tasks.filter((item) => item.status === label).map((item) =>
                            <li
                              className={styles.dragItem}
                              draggable
                              key={item._id}
                              id={item._id}
                            >
                              {item.title}
                            </li>
                          )}
                        </ul>
                      </div>
                    </KanbanItem>
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
                </KanbanColumn>
              )
            })}
          </ul>
        </div>
      </DndProvider>
    </>
  );
}

export default App;
