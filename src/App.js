import React, {Component} from 'react';
//Mis componentes
import Navigation from './Navigation';
import PictureFilter from './PictureFilter';

class App extends Component {
//{this.state.user && <Welcome  user={this.state.user}/> }
  render(){
    return (
      <div>
        <Navigation/>
        
        <PictureFilter path="/picture-filter" />

      </div>
    );
  }

}

export default App;
