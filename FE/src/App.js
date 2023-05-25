import './App.css';

import ToDoList from './components/ToDoList';

function App() {
	return (
		<div className="App">
			<h1 className='header'>Web ToDo</h1>
			<ToDoList />
		</div>
	);
}

export default App;

// onClick submit: add new checkbox with inputvalue + bin icon
// onclick bin icon: remove added checkbox
// onclick checkbox: add textdecoration on inputvalue 