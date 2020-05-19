<?php
/*

   Copyright 2020 GILIA

   Author: gab

   form.php

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
<div class="modal fade show" tabindex="-1" role="dialog" id="form_sat_widget"
     aria-labelledby="form_sat_widget" aria-hidden="true">

     <div class="modal-dialog modal-dialog-centered" role="document">
	      <div class="modal-content">

	         <div class="modal-header">
		           <h4 class="modal-title">Reasoner Settings</h4>
		             <button type="button" class="close" data-dismiss="modal" aria-label="close">
		                 <span aria-hidden="true">&times;</span>
		             </button>
	         </div>

           <div class="alert alert-info">
             <strong>!</strong>
             Enter settings for the TDL-Lite Reasoner
           </div>

	          <div class="modal-body">
              <div class="row">
               <div class="col-md-6">
                 <label for="solver">Choose SAT solvers:</label><br>
                 <select name="solver" id="solver">
                   <option value="nusmv-bdd">NuSMV-BDD-LTL</option>
                   <option value="nusmv-bddp">NuSMV-BDD-LTLp</option>
                   <option value="nusmv-bmc">NuSMV-BMC-LTL</option>
                   <option value="nusmv-bmcp">NuSMV-BMC-LTLp</option>
                   <option value="nuxmv-bdd">nuxmv-BDD-LTL</option>
                   <option value="nuxmv-bddp">nuxmv-BDD-LTLp</option>
                   <option value="nuxmv-bmc">nuxmv-BMC-LTL</option>
                   <option value="nuxmv-bmcp">nuxmv-BMC-LTLp</option>
                   <option value="aalta">Aalta</option>
                 </select>
               </div>

               <div class="col-md-6">
                 <a style="color:blue;text-decoration: underline;"
                    href="solversdetails.html" target="_blank"
                    title="Go to Solver details page"> see Solver details </a>
               </div>
             </div> </br>

            <div class="row">
                <div class="col-md-6">
                    <label for="time">Time Limit:</label><br>
		                <input type="number" title="Time limit waiting for results (seconds)" value="60" min="1" max="600" id="time" name="Time Limit"><br>
                    <label for="memory">Memory Limit:</label><br>
                    <input type="number" title="Memory limit to be used (MB)" value="1024" min="1" max="2048" id="memory" name="Memory Limit"><br>
                </div>
            </div>

	         </div>

	         <div class="modal-footer">
		           <button type="button" id="check" class="btn btn-primary" data-dismiss="modal">
                 Check
               </button>
	        </div>

	      </div>
    </div>
</div>
