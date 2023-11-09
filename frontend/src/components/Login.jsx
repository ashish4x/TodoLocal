import React, { useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {

const { todoId } = useParams();
const [TodoName, setTodoName] = useState("")
const [password, setpassword] = useState("")

const navigate = useNavigate();

const generateToken= (e)=>{
    e.preventDefault();

   if(!password)return;
   else{
  

    const url = 'https://todo-backend-tyler.vercel.app/login/'+todoId;
    const data = {
        
        password
    };
    
    axios.post(url, data)
        .then(response => {
            console.log('Request sent successfully');
            console.log('Response data:', response.data);
            localStorage.setItem("token", (response.data.token))
            
            // setTodoId(response.data.todoId)
            if(response.data.token){
                navigate(`/${todoId}`);
               }
            

        })
        .catch(error => {
            console.error('Error:', error);

        });


   }
  
   
}

useEffect(() => {
    
    
    axios.get('https://todo-backend-tyler.vercel.app/'+todoId+'/name')
      .then((response) => {
        // Assuming response.data is an array of todos
        console.log(response.data)
        setTodoName(response.data);
        
      })
      .catch((error) => {
        console.error('Error fetching todos:', error);
      });

  }, [])



  return (
    <div className='bg-slate-200 min-h-screen'>
    <div className="p-7 text-center text-purple-600 text-3xl font-bold"><h2>Do Together. Do More 📝</h2></div>
    <div className="m-20 mt-10">
    <form>
        
        <div className="mb-5 flex justify-center"> {/* Center the input horizontally */}
            <div className=" text-center">
            

                <h2 className=' text-xl font-medium'>Enter Password to access <span className='text-purple-600 font-bold '>{TodoName}</span> Todo</h2>
            </div>
        </div>
        <div className="mb-3 flex justify-center"> {/* Center the input horizontally */}
            <div className="">
                {/* <label for="password" className="block mb-2 text-sm font-medium text-gray-900">Your password</label> */}
                <input
                    type="password"
                    id="password"
                    placeholder='secr3t'
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    required
                    value={password}
                    onChange={(e)=> setpassword(e.target.value)}
                    
                />
            </div>
        </div>
        <div className="text-center">
            <button
                type="submit"
                onClick={generateToken}
                className="text-white bg-purple-500  font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center "
            >
                Submit
            </button>
        </div>
    </form>
</div>


   </div>
  )
}

export default Login