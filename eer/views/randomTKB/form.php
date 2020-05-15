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
<div class="modal fade show" tabindex="-1" role="dialog" id="form_widget"
     aria-labelledby="form_widget" aria-hidden="true">

     <div class="modal-dialog modal-dialog-centered" role="document">
	      <div class="modal-content">

	         <div class="modal-header">
		           <h4 class="modal-title">Random TKB</h4>
		             <button type="button" class="close" data-dismiss="modal" aria-label="close">
		                 <span aria-hidden="true">&times;</span>
		             </button>
	         </div>

           <div class="alert alert-info">
             <strong>!</strong>
             Enter parameters to generate a randon TDLLite - TBox.
           </div>

	          <div class="modal-body">
              <div class="row">
                <div class="col-md-6">
                    <label for="ci">Ltbox:</label><br>
		                <input type="number" title="Concept Inclusion set size" min="1" max="1000" id="ci" name="CI"><br>
                    <label for="n">N:</label><br>
                    <input type="number" title="Concept set size" min="1" max="1000" id="n" name="N"><br>
                    <label for="pt">Pt:</label><br>
                    <input type="number" title="Probability of generating Temporal Roles" id="pt" name="Pt"><br>
                </div>
                <div class="col-md-6">
                    <label for="l">Lc:</label><br>
                    <input type="number" title="Length of Concepts" min="1" max="1000"  id="l" name="L"><br>
                    <label for="q">Qmax:</label><br>
                    <input type="number" title="Max Cardinality of Quantified Roles" min="1" max="1000"  id="q" name="Q"><br>
                    <label for="pr">Pr:</label><br>
                    <input type="number" title="Probability of generating Rigid Roles" id="pr" name="Pr"><br>
                </div>
              </div><br>

             <div class="row">
              <div class="col-md-6">
                <label for="solver">Choose SAT solvers:</label><br>
                <select name="solver" id="solver">
                <!--  <option value="all" selected>All</option> -->
                  <option value="nusmv-bdd">NuSMV-BDD</option>
                  <option value="nusmv-bmc">NuSMV-BMC</option>
                  <option value="nuxmv-bdd">nuxmv-BDD</option>
                  <option value="nuxmv-bmc">nuxmv-BMC</option>
                <!--  <option value="pltl">pltl</option> -->
                  <option value="aalta">Aalta</option>
                <!--  <option value="trpuc">TRP++UC</option> -->
                </select>
              </div>
              <div class="col-md-6">
                <a style="color:blue;text-decoration: underline;"
                   href="solversdetails.html" target="_blank"
                   title="Go to Solver details page"> see Solver details </a>
              </div>
            </div>

	         </div>

	         <div class="modal-footer">
		           <button type="button" id="send" class="btn btn-primary" data-dismiss="modal">
                 Send
               </button>
	        </div>

	      </div>
    </div>
</div>
