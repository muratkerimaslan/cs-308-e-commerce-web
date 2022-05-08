import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

// Styles
import './HeaderBar.css'


function HeaderBar() {

  return (
    <ul class="header-bar">
      <li>
        <nav>
          <Link to='/SignUp'> Sign Up </Link>
        </nav>
      </li>
      <li>
        <nav>
          <Link to='/Login'> Login </Link>
        </nav>
      </li>

    </ul>

  )
}

export default HeaderBar;
