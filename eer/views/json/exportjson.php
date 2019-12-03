<?php
/*

   Copyright 2019 Gilia

   Author: gab

   exportJSON.php

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
<div class="modal fade" tabindex="-1" role="dialog"
     id="exportjson_widget"
     aria-labelledby="exportjson_widget" aria-hidden="true">

    <div class="modal-dialog modal-dialog-centered" role="document">
	<div class="modal-content">

	    <div class="modal-header">
		<h1 class="modal-title">JSON</h1>
		<button type="button" class="close" data-dismiss="modal"
			aria-label="close">
		    <span aria-hidden="true">&times;</span>
		</button>
	    </div>

	    <div class="modal-body">
		<p>Use the Refresh button to refresh the JSON content with the last modifications.</p>
		<textarea class="form-control" id="exportjson_input"  rows="5"><%= jsonstr %></textarea>
		<div class="btn-group" role="group">
		    <button id="exportjson_copybtn" class="btn btn-secondary">
			Copy
		    </button>
		    <button id="exportjson_refreshbtn" class="btn btn-secondary">
			Refresh
		    </button>
		</div>
	    </div>

	    <div class="modal-footer">
		<button type="button" class="btn btn-danger"
			data-dismiss="modal">
		    Close
		</button>
	    </div>

	</div>
    </div>
</div>
