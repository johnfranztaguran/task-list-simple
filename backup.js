class TaskApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    	items: [],
      input: '',
      completed: {}
    }
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.handleUpdateItem = this.handleUpdateItem.bind(this);
  }
  
  handleChange(input) {
  console.log(input);
  this.setState({ input });
  };
  
  handleOnSubmit(e) {
  	e.preventDefault();
    const { items, input } = this.state;
    this.setState({
    	items: [...items, input],
      input: ''
    });
  };
  
  handleDeleteItem(toDel) {
  	this.setState({
    	items: this.state.items.filter((item, index) => index !== toDel)
    });
  };
  
  handleUpdateItem(itemIndex) {
  	this.setState(state => ({
    completed: { ...state.completed, [itemIndex]: !state.completed[itemIndex] }
    }))
  }
  
  render() {
  const { items, input, completed } = this.state;
    return (
      <div>
        <h2>Tasks:</h2>
        <form onSubmit={this.handleOnSubmit}>
          <input
            onChange={e => this.handleChange(e.target.value)}
            value={input}
            type='text'
          />
          <button type='submit'>ADD</button>
        </form>
        <ol>
        {
        	items.map((val, i) => {
          	const completedStatus = completed[i] ? 'done' : 'undone';
          	return (
            	<li key={i}>
            	  <div className={completedStatus}>
            	    <span onClick={() => this.handleUpdateItem(i)}>&#9745;</span>
                  {val}
                  <button onClick={() => this.handleDeleteItem(i)}>&times;</button>
            	  </div>
            	</li>
            )
          })
        }
        </ol>
      </div>
    )
  }
}

ReactDOM.render(<TaskApp />, document.querySelector("#app"))


.done {
  color: rgba(0, 0, 0, 0.3);
  text-decoration: line-through;
}
.undone {
  text-decoration: none
}