import React, { useState, useEffect } from "react";
import { editTask } from "../Services/services";

export default function Modal({ showModal, task, setShowModal,refreshTasks }) {
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    // Set newTodo to task.description when showModal is true
    if (showModal && task?.description) {
      setNewTodo(task.description);
    }
  }, [showModal, task]);

  const handleEditTodoClick = (id) => {
    if (newTodo.trim() !== "") {
      // Dispatch Redux action here if needed
      editTodo(id, { description: newTodo.trim(), status: 0, completed: task?.completed });
    }
  }

  const editTodo = (id, todo) => {
    if (todo.description.trim() !== "") {
      editTask(id, todo).then((response) => {
        setShowModal(false); // Close the modal after editing
        refreshTasks();
      }).catch(error => {
        console.error("Error editing todo:", error);
      });
    } else {
      console.log("No data to edit");
    }
  }

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl align-middle text-center flex font-semibold">
                    Edit Task
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-12">
                  <input
                    type='text'
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder='Enter notes....'
                    className='flex-grow p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500'
                  />
                  <button
                    className='ml-4 p-2 bg-blue-700 text-white rounded hover:bg-blue-600 focus:outline-none'
                    onClick={() => handleEditTodoClick(task?.id)}
                  >
                    Edit
                  </button>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 bg-black font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
