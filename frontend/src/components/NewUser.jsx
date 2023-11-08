import React,{useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';





function NewUser() {

    const [TodoName, setTodoName] = useState("")
    const [Password, setPassword] = useState("")
    const [TodoId,setTodoId]=useState("")
    const navigate = useNavigate();

    const generateToken= (e)=>{
        e.preventDefault();

       if(!TodoName || !Password)return;
       else{
      

        const url = 'https://todo-backend-tyler.vercel.app/new';
        const data = {
            name: TodoName ,
            password: Password
        };
        
        axios.post(url, data)
            .then(response => {
                console.log('Request sent successfully');
                console.log('Response data:', response.data);
                localStorage.setItem("token", (response.data.token))
                setTodoId(response.data.todoId)
                if(response.data.todoId){
                    navigate(`/${response.data.todoId}`);
                   }
                

            })
            .catch(error => {
                console.error('Error:', error);
            });


       }
      
       
    }


  return (
    
    <div className='bg-slate-200 min-h-screen '>
    <div className="p-7 text-center text-purple-600 text-3xl font-bold"><h2>Do Together. Do More 📝</h2></div>
    <div className="m-20 mt-10">
    <form>
        
        <div className="mb-5 flex justify-center"> {/* Center the input horizontally */}
            <div className="">
                <label for="email" className="block mb-2 text-m font-semibold text-gray-900">Todo Name</label>
                <input
                    type="text"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="Summer project"
                    value={TodoName}
                    onChange={(e)=> setTodoName(e.target.value)}
                    required
                />
            </div>
        </div>
        <div className="mb-3 flex justify-center"> {/* Center the input horizontally */}
            <div className="">
                <label for="password" className="block mb-2 text-m font-semibold text-gray-900"> Password</label>
                <input
                    type="password"
                    id="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    required
                    value={Password}
                    onChange={(e)=> setPassword(e.target.value)}
                />
            </div>
        </div>
        <div className="text-center">
            <button
                type="submit"
                onClick={generateToken}
                className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm w-1/2 sm:w-auto px-5 py-2.5 text-center "
            >
                Submit
            </button>
        </div>
    </form>
</div>


   </div>
  )
}

export default NewUser