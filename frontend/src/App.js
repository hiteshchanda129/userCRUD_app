import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import UserEdit from './components/UserEdit';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/form" element={<UserForm />} />
          <Route exact path="/" element={<UserList />} />
          <Route exact path="/:id" element={<UserEdit />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
