import React, { useState, useCallback } from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from 'immutability-helper';
import KanbanColumn from './components/KanbanColumn';
import KanbanItem from './components/KanbanItem';
import { tasksList, channels } from './kanbanLists';
import styles from "./App.module.css";

function App() {

  const [tasks, setTasksStatus] = useState(tasksList);

  const changeTaskStatus = useCallback(
    (id, status) => {
      let task = tasks.find((task) => task._id === id);
      const taskIndex = tasks.indexOf(task);
      task = { ...task, status };
      let newTasks = update(tasks, {
        [taskIndex]: { $set: task }
      });
      setTasksStatus(newTasks);
    },
    [tasks]
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
                  {tasks.filter((item) => item.status === label).map((item) =>
                    <KanbanItem
                      tasks={tasks}
                      label={label}
                      key={item._id}
                      id={item._id}
                    >
                      <li
                        className={styles.dragItem} 
                      >
                        {item.title}
                      </li>
                    </KanbanItem>
                  )}
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
