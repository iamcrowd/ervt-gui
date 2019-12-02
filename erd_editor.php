<?php
require_once('template.php');
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta charset="utf-8" />
	<meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
	<title>(ervt) t-crowd, the ontologist</title>
<!--	<link rel="icon" href="crowdteensicon.png" type="image/png" /> -->

	<!--<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>-->

	<link rel="stylesheet" type="text/css" href="./css/joint_v2.2.1.css" />
	<link rel="stylesheet" type="text/css" href="./css/erd.css" />
	<link rel="stylesheet" type="text/css" href="./css/interfaz.css" />
	<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
	<link rel="stylesheet" type="text/css" href="./css/bootstrap.css" />
</head>
<body onload="addToolBar();">
	<header>
		<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
			<button class="navbar-toggler" type="button"
							data-toggle="collapse" data-target="#navbarNav"
							aria-controls="navbarNav" aria-expanded="false"
							aria-label="Toggle navigation">
							<span class="navbar-toggler-icon"></span>
			</button>

			<div class="collapse navbar-collapse" id="navbarNav">
				<ul class="navbar-nav mr-auto">
					 	<div id="navbar_placeholder"></div>
				</ul>

				<a class="btn btn-sm btn-outline-dark" href="http://faiweb.uncoma.edu.ar/" target="_black" role="button">
							<img src="imgs/unco.png" height="32" alt="uncoma">
				</a>
				<a class="btn btn-sm btn-outline-dark" href="https://lissi.cs.uns.edu.ar/" target="_black" role="button">
							<img src="imgs/uns.gif" height="32" alt="uns">
				</a>
			</div>
		</nav>

<!--		<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
			<button class="navbar-toggler" type="button"
				data-toggle="collapse" data-target="#navbarNav"
				aria-controls="navbarNav" aria-expanded="false"
				aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarNav">
				<ul class="navbar-nav mr-auto">

					<a class="navbar-brand crowd-header text-white">ERvt-crowd<span class="crowdforteens-header text-white"></span>

	  			<div class="nav-item dropdown">
						<a role="button" class="nav-link dropdown-toggle" href="#"
				   			id="ervt-dropdown-btn" data-toggle="dropdown"
				   			aria-haspopup="true" aria-expanded="false">
								Model
						</a>
						<div class="dropdown-menu" aria-labelledby="ervt-dropdown-btn">
				    	<a class="dropdown-item" href="#" id="json">Export to JSON</a>
						</div>
					</div>

		<a class="tooltipsbottom" href="#"><button class="btn-group menubutton" type="button" id="json"
				onclick="exportTemporalJSON()">JSON</button><span>Export JSON diagram</span></a>
			<a class="tooltipsbottom" href="#"><button class="btn-group menubutton" type="button" id="inference"
				onclick="checkSatisfiability()">SAT</button><span>Sat</span></a>
			<a class="tooltipsbottom" href="#"><button class="btn-group menubutton" type="button" id="tdllitefpx"
				onclick="encodeERvt()">TDLliteFPX</button><span>TDLliteFPX</span></a>
			<a class="tooltipsbottom" href="#"><button class="btn-group menubutton" type="button" id="insertquery"
				onclick="insertQuery()">Query</button><span>Query</span></a>

			<a class="unco btn btn-sm btn-outline-dark" href="http://faiweb.uncoma.edu.ar/" target="_blank" role="button">
				<img src="imgs/unco.png" height="32" alt="uncoma" />
			</a>

		</ul>
	</nav>-->


	</header>

	<div id="paper"></div><!--<div id="palette-container">-->
	<div id="palette" class="palette-vertical"></div><!--</div>-->
	<div id="minimap"></div>


	<span id='string_span' style='font-size: 14;white-space: nowrap;display:none'></span>

	<div class="container">

  <div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog">

      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Result</h4>
        </div>
        <div class="modal-body">
          <p>http://localhost/t-crowd/api/tdl2TDLLiteFPX_tbox/</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>

    </div>
  </div>
</div>


<!--<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script> -->
<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
<script src="./libs/lodash.js"></script>
<script src="./libs/backbone.js"></script>
<script src="./libs/joint_v2.2.1.js"></script>
<script src="./libs/svg-pan-zoom.js"></script>
<script src="./eer/js/palette_shapes.js"></script>
<script src="./eer/js/erd2.js"></script>
<script src="./eer/js/temperd.js"></script>
<script src="./eer/js/utils.js"></script>
<script src="./eer/requests/server_connection.js"></script>
<script src="./eer/views/queries/insert_query.js"></script>
<script src="./eer/views/widgetMgr.js"></script>
<script src="./eer/views/queries.js"></script>
<script src="./eer/views/toolbar/toolbar.js"></script>

<?php
include 'all_templates.php';
include 'placeholders.php';
?>
</body>
</html>
