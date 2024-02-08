import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

function App() {
  const notify = () => {
    toast.success("Video uploaded!");
  };

  const [post, setPost] = useState({
    title: "",
    email: "",
    video: null,
  });

  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("video", post.video);
    formData.append("email", post.email);

    const response = await axios.post(
      "https://back-poc.onrender.com/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const uploadedFileDetails = {
      title: post.title,
      email: post.email,
      video: post.video,
    };

    setUploadedFiles([...uploadedFiles, uploadedFileDetails]);
    setPost({ title: "", email: "", video: null });

    console.log(response);
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-200 text-blac">
      <h1 className="text-2xl mb-4">POC</h1>
      <form
        className="flex flex-col bg-white border-[1.5px] border-gray-300 rounded-md w-[400px] h-2/4 gap-7 items-center"
        onSubmit={handleSubmit}
      >
        <input
          className="block mt-24 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black"
          type="text"
          placeholder="  title"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
        />
        <input
          className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black"
          type="text"
          placeholder="  email"
          value={post.email}
          onChange={(e) => setPost({ ...post, email: e.target.value })}
        />
        <input
          type="file"
          name="video"
          id="video"
          className="hidden"
          onChange={(e) => setPost({ ...post, video: e.target.files[0] })}
        />
        <label
          htmlFor="video"
          className="bg-black text-white hover:bg-white hover:border-black hover:border-2 hover:text-black font-bold py-2 px-4 rounded inline-block cursor-pointer"
        >
          Select file
        </label>
        <button
          onClick={notify}
          className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white hover:border-black hover:border-2 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          {" "}
          Upload
        </button>
        <ToastContainer />
      </form>

      <div className="mt-5">
        <h2 className="text-lg font-semibold text-center">Uploaded files</h2>
        <table className="border-collapse border border-black mt-3 bg-white">
          <thead>
            <tr>
              <th className="border border-black px-4 py-2">Email</th>
              <th className="border border-black px-4 py-2">FileName</th>
            </tr>
          </thead>
          <tbody>
            {uploadedFiles.map((file, index) => (
              <tr key={index}>
                <td className="border border-black px-4 py-2">{file.email}</td>
                <td className="border border-black px-4 py-2">
                  {file.video.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
