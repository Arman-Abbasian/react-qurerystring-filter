import { BrowserRouter } from 'react-router-dom'
import './App.css'
import FilteredPosts from './components/Filter';
import { Toaster } from 'react-hot-toast';

function App() {

  return (
      <div>
        <BrowserRouter>
        <FilteredPosts />
        <Toaster/>
        </BrowserRouter>
      </div>
  )
}

export default App
