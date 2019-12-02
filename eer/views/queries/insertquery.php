<?php
/*

   Copyright 2019 GILIA

   Author: gab

   insert_query.php

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
<div class="modal fade show" tabindex="-1" role="dialog" id="insertquery_widget"
     aria-labelledby="insertquery_widget" aria-hidden="true">

     <div class="modal-dialog modal-dialog-centered" role="document">
	      <div class="modal-content">

	         <div class="modal-header">
		           <h4 class="modal-title">Entity Consistency Queries</h4>
		             <button type="button" class="close" data-dismiss="modal" aria-label="close">
		                 <span aria-hidden="true">&times;</span>
		             </button>
	         </div>

           <div class="alert alert-info">
             <strong>!</strong>
             These queries will be asserted to the KB when checking for
             entities consistency (whether there is a model where
a particular entity is non empty), i.e, KB /\ Entity. 
           </div>

	          <div class="modal-body">
		            <textarea class="form-control" id="insert_query_input" rows="5">
                </textarea>
	         </div>

	         <div class="modal-footer">
		           <button type="button" class="btn btn-primary" data-dismiss="modal">
                 Close
               </button>
	        </div>

	      </div>
    </div>
</div>
