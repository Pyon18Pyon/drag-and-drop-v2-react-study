import React, { useState, useCallback } from 'react';
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import KanbanColumn from './components/KanbanColumn';
import KanbanItem from './components/KanbanItem';
import { tasksList, channels } from './kanbanLists';
import styles from "./App.module.css";

function App() {

  

  const [tasks, setTasksStatus] = useState(tasksList);

  const changeTaskStatus = useCallback(

  );

  return (
    <>
      <h1 className={styles.mainTitle}>Kanban Board</h1>
      <DndProvider backend={HTML5Backend}>
        {/* <Container> */}
        <div className={styles.dragContainer}>
          <ul className={styles.dragList}>
            {channels.map(({ label, style }) => {
              
              return (
                <KanbanColumn
                  key={label}
                  status={label}
                  changeTaskStatus={changeTaskStatus}
                  style={style}
                >  
                    <KanbanItem> 
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
                    </KanbanItem>                    
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
