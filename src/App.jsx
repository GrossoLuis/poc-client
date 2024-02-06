import { useState } from "react"
import axios from 'axios'
import './index.css'


function App() {
   
  const [post, setPost] = useState({
    title: '',
    email: '', 
    video: null
  })


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData()

    formData.append('video', post.video)
    formData.append('email', post.email)




    const response = await axios.post('https://poc-back-production.up.railway.app/upload', formData, {
      headers: {
            "Content-Type": "multipart/form-data"
    } 
  })

  console.log(response);
  }

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-white text-blac">
        <h1 className="text-2xl mb-10">POC</h1>
      <form className="flex flex-col bg-white border-[1.5px] border-black rounded-md w-[400px] h-3/4 gap-7 items-center"  onSubmit={handleSubmit}>
        <input className="block mt-24 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black" type="text" placeholder="  title" onChange={e =>  setPost({...post, title: e.target.value})}/>
        <input className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black"type="text" placeholder="  email" onChange={e =>  setPost({...post, email: e.target.value})}/>
        <input type="file" name="video" id="video" onChange={e =>  setPost({...post, video: e.target.files[0]})} />
        <button className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white hover:border-black hover:border-2 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"> Upload</button>
      </form>


    </div>
  )
}

export default App