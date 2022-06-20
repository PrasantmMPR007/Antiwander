import React, { Component } from 'react';
import './component/Floor.css';
import Floor from './component/Floor';
import MyMap from './component/Map';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Floor />
                <MyMap />
            </div>
        );
    }
}

export default App;
