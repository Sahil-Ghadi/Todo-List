import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])

  const handleChange= (e)=>{
    setTodo(e.target.value)
    console.log(todo)
  }

  const handleEdit= (e,id)=>{
   let to=todos.filter(item=>item.id===id);
   setTodo(to[0].todo)
  let newTodos = todos.filter(item=>{
    return item.id!==id
    //to remove edited todo from list
  });
  setTodos(newTodos)
  }

 const handleDelete=(e,id)=>{
  let newTodos=todos.filter(item=>item.id!==id)
  setTodos(newTodos)
 }

  const  handleAdd= ()=>{
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    console.log(todos)
  }

  const handleCheckbox=(e,id)=>{
    let index=todos.findIndex(item=>{
      return item.id===id
    });
    let newTodos=[...todos]
    newTodos[index].isCompleted=!newTodos[index].isCompleted
    setTodos(newTodos)
   console.log(todos)
    // let newtodo=todos[index]
    // newtodo.isCompleted=!newtodo.isCompleted
    // setTodos([...todos],newtodo);
  }

  return (
    <>
 <div className="app flex flex-col justify-center items-center">
      <div className="title m-3">
        <h1 className='text-2xl'>To-Do-List</h1>
      </div>
       <div className="addBar bg-slate-300 rounded-full w-3/5 flex justify-between mb-6">
        <input placeholder='Add your Task' onChange={handleChange} type="text" name="text" value={todo} className='h-10 w-80 p-3 bg-transparent rounded-full'/>
        <button onClick={handleAdd} disabled={todo.length<4} className='bg-amber-200 rounded-full w-16 hover:bg-amber-500'>Add+</button>
      </div>
     <div className="todos bg-slate-400 min-h-72 w-11/12  rounded-xl">
         {todos.map(item=>{
          return <div key={item.id} className="todo bg-sky-300 rounded-full flex items-center justify-between m-4 w-4/5">
            <div className="textPart flex items-center ">
            <input onChange={(e)=>{handleCheckbox(e,item.id)}} type="checkbox"  className='h-5 w-5 ml-2' checked={item.isCompleted} id={item.id} />
            <p className={item.isCompleted?'ml-2 line-through':'ml-2 '}>{item.todo}</p> 
            </div>
            <div className="buttons h-full">
            <button onClick={(e)=>{handleEdit(e,item.id)}} className='bg-fuchsia-400 text-stone-50 rounded-full w-16 p-1 m-1 hover:bg-fuchsia-500'>Edit</button>
            <button onClick={(e)=>{handleDelete(e,item.id)}} className='bg-fuchsia-400 text-stone-50 rounded-full w-16 p-1 m-1 hover:bg-fuchsia-500'>Delete</button>
            </div>
          </div>
         })}
       
     </div>
  </div>
    </>
  )
}

export default App
