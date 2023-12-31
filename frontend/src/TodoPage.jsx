import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { TodoProvider } from './contexts'
import { TodoForm, TodoItem } from './components'
import { useParams,useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';







function TodoPage() {
  const navigate = useNavigate();

  const [todos,setTodos]= useState([])
  const [ListName,setListName]=useState("")
  const { todoId } = useParams();
  const [firstReload, setfirstReload] = useState(true)
  const [showCopyAlert, setShowCopyAlert] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://group-todo.vercel.app/' + todoId);
    setShowCopyAlert(true); // Set the state variable to true
  }
  

  const settingTodo=()=>{
   
    const authToken = localStorage.getItem("token")
      console.log(authToken);
    
  
  
    if (authToken){
      const axiosConfig = {
        headers: {
          Authorization: 'Bearer ' + authToken,
        },
      };
  
      
      // Make a GET request to your API endpoint using Axios with the JWT token in the headers
      axios.get('https://todo-backend-tyler.vercel.app/'+todoId, axiosConfig)
        .then((response) => {
          // Assuming response.data is an array of todos
          console.log(response.data)
          setTodos(response.data.todos);
          setListName(response.data.name)
        })
        .catch((error) => {
          console.error('Error fetching todos:', error);
          
          navigate("/"+todoId+"/login");
  
  
        });
  }
else{
  console.log("not logged in!");
  navigate("/"+todoId+"/login");
}}


  const addTodo = (todo) =>{
      setTodos((prev)=>[...prev,{id:Date.now(),...todo}]
      )
  }

  const updateTodo = (id,todo) =>{

    setTodos((prev)=> prev.map((prevTodo)=>(prevTodo.id===id ? todo:prevTodo)))

  }

  const deleteTodo = (id) =>{
    setTodos((prev)=> prev.filter((todo)=>todo.id!==id))
  }

  const toggleComplete = (id) =>{
    setTodos((prev)=>prev.map((prevTodo)=>prevTodo.id===id ? {...prevTodo, completed:!prevTodo.completed} : prevTodo))
  }
  

  useEffect(() => {
    
    
    

    settingTodo()

   
      


  }, [])


  useEffect(() => {

    if((todos.length===0) && (firstReload==true)){
      setfirstReload(false);
      settingTodo();

      
    }
    if(todos.length!=0){
       const authToken = localStorage.getItem('token');
    if (authToken) {
      const axiosConfig = {
        headers: {
          Authorization: 'Bearer ' + authToken,
        },
      };

      const url = `https://todo-backend-tyler.vercel.app/${todoId}/update`;
      const data = todos
      console.log(data);

      axios
        .post(url, data, axiosConfig)
        .then((response) => {
          console.log('Request sent successfully');
          console.log('Response data:', response.data);

          // Handle any response data or update state as needed
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }

    }
   
  }, [todos]);
  
  

  return (
    <TodoProvider value={{todos,addTodo,updateTodo,deleteTodo,toggleComplete}}>
      
      <div className="bg-slate-200 min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-lg bg-slate-200 rounded-lg px-4 py-3 text-black">
 
                  
                    <h1 className="text-2xl text-black font-bold text-center  mt-2">{ListName}</h1>
                    <p className='text-gray-700 font-medium text-center mb-5  '>Share the link & password with your friends. Manage things together 🔗</p>

                    <div className='text-center'>
                    {showCopyAlert && ( // Conditionally render the alert based on the state variable
              <Alert onClose={() => setShowCopyAlert(false)}>
                The link is successfully copied.
              </Alert>
            )}

                    <button 
                    onClick={handleCopyLink}
                    
                    className="px-2 py-2 mb-2 mt-5 text-sm font-medium text-center text-white bg-purple-500 rounded-lg hover:bg-green-700 "
  // onClick={() =>  navigator.clipboard.writeText('https://group-todo.vercel.app/'+todoId)}
>
  Copy the Todo Link 📋
</button>
</div>
                    <div className="mb-4">
                        <TodoForm/>
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {todos.map((todo)=>(
                        <div key={todo.id}
                        className='w-full' >

                            <TodoItem todo={todo}/>
                        </div>
                        ))}
                    </div>
                </div>
            </div>

    </TodoProvider>
  )
}

export default TodoPage
