import axios from "axios";
export const API_URL = "http://localhost:3000";


//add task
export async function addTodoTask(text) {
    console.log(text,"taskkkkkkkkkkkk");
    const datavalue = await axios
      .post(`${API_URL}/task/addtask`, text)
      .then((response) => {
        console.log(response);
        return response.data;
      });
    return datavalue;
  }

  //list task
  export async function Tasklist() {
    return await axios
      .get(`${API_URL}/task/viewtask`)
      .then((response) => {
        return response.data;
      });
  }
//list task using id
export async function TasklistId(id) {
    return await axios
      .get(`${API_URL}/task/viewtask/${id}`)
      .then((response) => {
        return response.data;
      });
  }
export async function editTask(id,data) {
  return await axios
  .put(`${API_URL}/task/taskUpdate/${id}`,data)
  .then((response)=>{
    return response.data;
  });
}  


//delete item
export async function deleteTaskService(id) {
    return await axios
      .delete(`${API_URL}/task/taskRemove/${id}`)
      .then((response) => {
        return response.data;
      });
  }