<?php
/*

   Copyright 2019 GILIA

   Author: gab

   insertdata.php

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
<div class="modal fade show" tabindex="-1" role="dialog" id="insertdata_widget"
     aria-labelledby="insertdata_widget" aria-hidden="true">

     <div class="modal-dialog modal-dialog-centered" role="document">
	      <div class="modal-content">

	         <div class="modal-header">
		           <h4 class="modal-title">Insert Temporal Data</h4>
		             <button type="button" class="close" data-dismiss="modal" aria-label="close">
		                 <span aria-hidden="true">&times;</span>
		             </button>
	         </div>

           <div class="alert alert-info">
             <strong>!</strong>
             These temporal data (ABox) will be asserted to the KB, i.e, TBox /\ ABox.
           </div>

           <div class="alert alert-warning">
             <strong>Abox syntax</strong></br>

             <span class="badge badge-secondary">
               Person(John,0) </br>
               Name(John,Mcking,0) </br>
               Name(Maria,Kennedy,0) </br>
               Name(John,Kennedy,1) </br>
               Name(Ana,Kennedy,n)</span> </br>
              n is an integer number. only one assertion per line and \n
           </div>

	          <div class="modal-body">
		            <textarea class="form-control"
                          id="insert_data_input"
                          rows="5"></textarea>
	         </div>

	         <div class="modal-footer">
		           <button type="button" id="abox" class="btn btn-primary" data-dismiss="modal">
                 Close
               </button>
	        </div>

	      </div>
    </div>
</div>
