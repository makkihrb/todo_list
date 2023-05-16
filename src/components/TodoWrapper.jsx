import React,{useState} from 'react'
import { TodoForm } from './TodoForm'
import { v4 as uuidv4} from 'uuid';
import { Todo } from './Todo';
import { EditTodoForm } from './EditTodoForm';
uuidv4();

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([])
  const addTodo = todo => {
    if (todo.trim()) { //  if the todo input is not empty or have only whitespaces
    setTodos([...todos, {id:  uuidv4(), task: todo, complete: false,  isEditing:  false}])
    }
  }
const toggleCompleted = id => setTodos(todos.map(todo => todo.id===id ? {...todo, completed: !todo.completed} : todo))
const deleteTodo = id => {
    setTodos(todos.filter(todo => todo.id !== id))
} 
const editTodo = id => {
    setTodos(todos.map(todo => todo.id=== id ? {...todo, isEditing: !todo.isEditing} : todo))
}
const editTask = (task, id) => {
  setTodos(todos.map(todo => todo.id === id ? {...todo, task, isEditing : !todo.isEditing} : todo))
}
  return (
    <div className='TodoWrapper'>
        <h1>Your TO-DO List</h1>
        <h4> To Mark a Task as Completed , Just Click on it's text </h4>
        <h3> Underscored Task are Completed ones</h3>
        <TodoForm addTodo={addTodo} />
        {todos.map((todo, index) => (
          todo.isEditing ? (
            <EditTodoForm editTodo={editTask} task={todo}/>
          ) : (
            <Todo task={todo} key={index} toggleCompleted={toggleCompleted} deleteTodo ={deleteTodo}  editTodo={editTodo}/>
            ))
          )
          }

    </div>
  )
}
