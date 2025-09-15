import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './component/Login';
import Signup from './component/Signup';
import BlogList from './component/BlogList';
import CreateBlog from './component/CreateBlog';
import EditBlog from './component/EditBlog';
import BlogDetail from './component/BlogDetail';


function App() {
  return (
    <Router>
      <div className="App">
        
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/create-blog" element={<CreateBlog />} />
          <Route path="/edit-blog/:id" element={<EditBlog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/" element={<BlogList />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
