const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}

function DisplayHomePage(){
    return (
      <div>Welcome to the waitlist tracker.</div>
    );
  }


  function DisplayFreeSlots(props){
    const length = props.waitlist.length;
    if (length < 25) {
      return <div>Current slots filled: {length} / 25</div>;
    }
    return  <div style={{ color: 'red' }}>Current slots filled: {length} / 25. Fully filled. Remove some customers. </div>;
  }

  function WaitRow(props){
      const entry = props.entry;
      return (
        <tr>
          <td>{entry.id}</td>
          <td>{entry.name}</td>
          <td>{entry.number}</td>
          <td>{entry.created.toDateString()}</td>
        </tr>
      );
  }

  function DisplayCustomers(props){
      const waitRows = props.waitlist.map(entry => <WaitRow key = {entry.id} entry = {entry}/>);
      return (
        <table className = "bordered-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Mobile Number</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {waitRows}
            </tbody>
        </table>
      );
  }
  
  class AddingCustomer extends React.Component {
    constructor(){
      super();
      this.handleAddCust = this.handleAddCust.bind(this);
    }
    
    handleAddCust(e){
      e.preventDefault();
      const form = document.forms.addCustomer;
      const customer = {
        name: form.name.value, number: form.number.value
      }
      this.props.addCustomer(customer);
      form.name.value = '';
      form.number.value = '';
    }

    render() {
      return (
        <form name = "addCustomer" onSubmit = {this.handleAddCust}>
          <input type = 'text' name = 'name' placeholder = 'Name' />
          <input type = 'text' name = 'number' placeholder = 'Mobile Number'/>
          <button>Add</button>
        </form>
      );
    }
  }

  async function graphQLFetch(query, variables = {}) {
    try {
      const response = await fetch('http://localhost:5000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ query, variables })
      });
      const body = await response.text();
      const result = JSON.parse(body, jsonDateReviver);
  
      if (result.errors) {
        const error = result.errors[0];
        if (error.extensions.code == 'BAD_USER_INPUT') {
          const details = error.extensions.exception.errors.join('\n ');
          alert(`${error.message}:\n ${details}`);
        } else {
          alert(`${error.extensions.code}: ${error.message}`);
        }
      }
      return result.data;
    } catch (e) {
      alert(`Error in sending data to server: ${e.message}`);
    }
  }
  
  class DeleteCustomer extends React.Component {
    constructor(){
      super();
      this.handleRmCust = this.handleRmCust.bind(this);
    }   

    handleRmCust(e){
      e.preventDefault();
      const form = document.forms.removeCustomer;
      const id = form.id.value;
      this.props.deleteCustomer(id);
      form.id.value = '';

    }

    render() {
      return (
        <form name = "removeCustomer" onSubmit = {this.handleRmCust}>
          <input type = 'text' name = 'id' placeholder = 'ID' />
          <button>Remove</button>
        </form>
      );
    }
  }
  
  class HotelWaitlist extends React.Component {
    constructor(){
      super();
      this.state = {waitlist: []};
      this.addCustomer = this.addCustomer.bind(this);
      this.deleteCustomer = this.deleteCustomer.bind(this);
    }
    
    componentDidMount() {
      this.loadData();
      }

    async loadData() {
      const query = `query {
        custList {
          id name number created
        }
      }`;

    const data = await graphQLFetch(query);
      if (data) {
        this.setState({ waitlist: data.custList});
      }
    };

    async addCustomer(customer) {
      const query = `mutation {
        custAdd(cust:{
          name: "${customer.name}",
          number: "${customer.number}"
        }) {
          id
        }
      }`;
  
    const data = await graphQLFetch(query, { customer });
    if (data) {
      this.loadData();
      }
    }
    
    async deleteCustomer(id) {
      const query = `mutation{
        custDel(id: "${id}"){
          id
        }
      }`;
  
    const data = await graphQLFetch(query);
    if (data) {
      this.loadData();
      }
    }

  
    render() {
      return (
        <React.Fragment>
          <h1>Hotel Waitlist</h1>
          <DisplayHomePage />
          <hr />
          <DisplayFreeSlots waitlist = {this.state.waitlist} />
          <hr />
          <DisplayCustomers waitlist = {this.state.waitlist}/>
          <hr />
          <AddingCustomer addCustomer = {this.addCustomer}/>
          <hr />
          <DeleteCustomer deleteCustomer = {this.deleteCustomer}/>
        </React.Fragment>
      );
    }
  }
  
  const element = <HotelWaitlist />;
  
  ReactDOM.render(element, document.getElementById('contents'));
