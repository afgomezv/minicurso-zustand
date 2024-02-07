import { DragEvent, useState } from "react";
import Swal from "sweetalert2";
import { useTaskStore } from "../stores";
import { TaskStatus } from "../interfaces";

interface Options {
  status: TaskStatus;
}

export const useTasks = ({ status }: Options) => {
  const isDragging = useTaskStore((state) => !!state.draggingTaskId);
  const onTaskDrop = useTaskStore((state) => state.onTaskDrop);
  const addTask = useTaskStore((state) => state.addTask);

  const [onDragOver, setOnDragOver] = useState(false);

  const handleAddTask = async () => {
    const { isConfirmed, value } = await Swal.fire({
      title: "Nueva Tarea",
      input: "text",
      inputLabel: "Nueva Tarea",
      inputPlaceholder: "Ingrese el nombre de la tarea",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "Debe de ingresar un nombre para la atrea";
        }
      },
    });

    if (!isConfirmed) return;
    addTask(value, status);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setOnDragOver(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setOnDragOver(false);
  };

  const handleOnDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setOnDragOver(false);
    onTaskDrop(status);
  };
  return {
    //* Properties
    isDragging,
    onDragOver,

    //*Methods
    handleAddTask,
    handleDragOver,
    handleDragLeave,
    handleOnDrop,
  };
};
