<?php
/*

   Copyright 2019 Gilia

   Author: gab

   toolbar.php

   This program is free software: you can redistribute it and/or modify
   it under the terms of the GNU General Public License as published by
   the Free Software Foundation, either version 3 of the License, or
   (at your option) any later version.

   This program is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU General Public License for more details.

   You should have received a copy of the GNU General Public License
   along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */


?>

<div class="navbar-nav">

  <div class="nav-item dropdown">
    <a role="button"
       class="navbar-brand crowd-header nav-link dropdown-toggle" href="#"
       id="ervt-dropdown-btn" data-toggle="dropdown"
       aria-haspopup="true" aria-expanded="false">
      crowd-ERvt v0.1
    </a>

    <div class="dropdown-menu" aria-labelledby="ervt-dropdown-btn">
      <a class="dropdown-item" href="#" id="disclaimer">Disclaimer</a>
      <a class="dropdown-item" href="#" id="features">Features</a>
    </div>

  </div>

  <div class="nav-item dropdown">

	   <a role="button" class="nav-link dropdown-toggle" href="#"
	     id="ervt-dropdown-btn" data-toggle="dropdown"
	      aria-haspopup="true" aria-expanded="false">
	       Temporal Model
	   </a>
	    <div class="dropdown-menu" aria-labelledby="ervt-dropdown-btn">
          <a class="dropdown-item" href="#" id="export-json">Export to JSON</a>
          <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#" id="insert-data">Insert Temporal Data</a>
	   </div>
  </div>

  <div class="nav-item dropdown">

     <a role="button" class="nav-link dropdown-toggle" href="#"
       id="ervt-dropdown-btn" data-toggle="dropdown"
        aria-haspopup="true" aria-expanded="false">
         Encoding
     </a>
      <div class="dropdown-menu" aria-labelledby="ervt-dropdown-btn">
            <a class="dropdown-item" href="#" id="tdllitefpx">TDL-LiteFPX Encoding</a>
     </div>
  </div>

  <div class="nav-item dropdown">

     <a role="button" class="nav-link dropdown-toggle" href="#"
       id="ervt-dropdown-btn" data-toggle="dropdown"
        aria-haspopup="true" aria-expanded="false">
         Reasoning
     </a>
      <div class="dropdown-menu" aria-labelledby="ervt-dropdown-btn">
          <a class="dropdown-item" href="#" id="insert-query">Insert Query</a>
        <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#" id="sat">Satisfiability</a>
     </div>
  </div>

</div>
