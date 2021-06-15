import React, { useState, useCallback, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";
// import ContentEditable from 'react-contenteditable'
import KanbanColumn from "./components/KanbanColumn";
import KanbanItem from "./components/KanbanItem";
import EditableElement from "./components/EditableElement";
import { tasksList, channels } from "./kanbanLists";
import styles from "./App.module.css";


function App() {
  // State
  const [tasks, setTasksStatus] = useState(tasksList);
  const [updateText, setUpdateText] = useState({
    id: 0,
    text: "",
    status: ""
  });

  const changeTaskStatus = useCallback(
    (id, status) => {
      let task = tasks.find((task) => task._id === id);
      const taskIndex = tasks.indexOf(task);
      task = { ...task, status };
      let newTasks = update(tasks, {
        [taskIndex]: { $set: task },
      });
      setTasksStatus(newTasks);
    },
    [tasks]
  );

  const debounce = (func, wait) => {
    let timeout;

    return function executedFunction(...args) {
      const later = () => {
        timeout = null;
        func(...args);
      };

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  const processChange = debounce(function handleChange(event, id, status) {
      setUpdateText({ id, text: event, status });
    }, 250); 


  const handleFocusOut = () => {

    setTasksStatus((prevState) => {
      if (updateText.text === "") {
        return prevState.filter(({ _id }) => _id !== updateText.id);
      }

      const findItem = prevState.find(({ _id }) => _id === updateText.id);

      findItem.title = updateText.text;

      return prevState;
    });
  };
  
  useEffect(() => {
    if (localStorage.getItem('kanbanBoard')) {
      setTasksStatus(JSON.parse(localStorage.kanbanBoard));
    } else {
      localStorage.setItem('kanbanBoard', JSON.stringify(tasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('kanbanBoard', JSON.stringify(tasks));
  }, [tasks]);
  

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
                  setTasksStatus={setTasksStatus}
                  tasks={tasks}
                >
                  {tasks
                    .filter((item) => item.status === label)
                    .map((item) => (
                      <KanbanItem
                        tasks={tasks}
                        label={label}
                        key={item._id}
                        id={item._id}
                      >
                        <EditableElement
                          onChange={(event) =>
                            processChange(event, item._id, label)
                          }  
                        >
                          <li className={styles.dragItem} onBlur={handleFocusOut}>{item.title}</li>
                        </EditableElement>
                      </KanbanItem>
                    ))}
                </KanbanColumn>
              );
            })}
          </ul>
        </div>
      </DndProvider>
    </>
  );
}

export default App;
