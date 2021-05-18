import React, { useState } from "react";

import { Header } from "../components/Header";
import { MyTasksList } from "../components/MyTasksList";
import { TodoInput } from "../components/TodoInput";

interface Task {
  id: number;
  title: string;
  done: boolean;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if (!newTaskTitle) return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title: newTaskTitle,
        done: false,
      },
    ]);
  }

  function handleMarkTaskAsDone(id: number) {
    const edited = [...tasks];
    const task = edited.find((item) => item.id === id);

    if (task) {
      task.done = !task.done;
    }

    setTasks(edited);
  }

  function handleRemoveTask(id: number) {
    const edited = [...tasks];
    const taskIndex = edited.findIndex((item) => item.id === id);

    if (taskIndex >= 0) {
      edited.splice(taskIndex, 1);
    }

    setTasks(edited);
  }

  return (
    <>
      <Header />

      <TodoInput addTask={handleAddTask} />

      <MyTasksList
        tasks={tasks}
        onPress={handleMarkTaskAsDone}
        onLongPress={handleRemoveTask}
      />
    </>
  );
}
