import React, {Component} from 'react';
import {FaFlask} from 'react-icons/fa';
import { Link } from '@reach/router'

class Navigation extends Component{
    render(){

        return(
<nav className="site-nav family-sans navbar navbar-expand bg-primary navbar-dark higher">
  <div className="container-fluid">
    <Link to="/" className="navbar-brand">
      <FaFlask className="mr-1"/>PictureFilter
    </Link>
  </div>
</nav>
        );
    }
}
export default Navigation;