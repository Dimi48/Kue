import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import InputText from './components/InputText';
import TodoList from "./components/TodoList";
import Confirm from "./components/Confirm";
import Home from "./components/Home";
import ClientQueue from "./components/ClientQueue";
import Pending from "./components/Pending";

function App() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/queue" element={<ClientQueue/>} />
                    <Route path="/input-text" element={<InputText/>} />
                    <Route path="/confirm" element={<Confirm/>} />
                    <Route path="/list" element={<TodoList/>} />
                    <Route path="/pending" element={<Pending/>} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;