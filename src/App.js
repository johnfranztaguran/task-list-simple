import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: [],
      inputTask: '',
      completed: {}
     };
  };

  onSubmitTask = e => {
    e.preventDefault();
    const { items, inputTask } = this.state;
    this.setState({
      items: [...items, inputTask],
      inputTask: ''
    });
  };

  handleChange = inputTask => {
    console.log(inputTask)
    this.setState({ inputTask })
  };

  handleDeleteItem = toDelete => {
    this.setState({
      items: this.state.items.filter((item, index) => index !== toDelete)
    });
  };

  handleUpdateList = itemIndex => {
    this.setState(state => ({
      completed: { ...state.completed, [itemIndex]: !state.completed[itemIndex] }
    }));
  };
  
  render() {
    const { items, inputTask, completed } = this.state;
    return ( 
      <div id="main">
        <h1>Task List</h1>
        <form onSubmit={this.onSubmitTask}>
          <input
            onChange={e => this.handleChange(e.target.value)}
            value={inputTask}
            type='text'
          />
          <button type='submit' className='btn btn-default'>ADD</button>
        </form>
        <ul className="list-group">
          {
            items.map((val, i) => {
              const taskStatus = completed[i] ? 'done' : 'undone';
              return (
                <li key={i} className="list-group-item ">
                  <div className={taskStatus}>
                    <span
                      className="glyphicon glyphicon-ok icon"
                      aria-hidden="true"
                      onClick={() => this.handleUpdateList(i)}
                    >&#9745;</span>
                      {val}
                    <button
                      type="button"
                      className="close"
                      onClick={() => this.handleDeleteItem(i)}
                    >&times;</button>
                  </div>
                </li>
              )
            })
          }
        </ul>
      </div>
     );
  };
};

export default App;
