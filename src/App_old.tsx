import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

export interface Props {

}

export interface State {

}

class App extends React.Component<Props, State> {
  state = {
    values: []
  }

  componentDidMount() {
    axios.get('/api/values')
      .then((response) => {
        console.log(response)
        this.setState({
          values: response.data
        })
      })
  }

  render() {
    return (



      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <ul>
            {
              this.state.values.map((value: any) => (
                <li key={value.id}>{value.name}</li>
              ))}
          </ul>
        </header>
      </div>


    );
  }
}

export default App;
