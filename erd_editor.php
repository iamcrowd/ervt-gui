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
	<!--<script src="./libs/bootstrap.js"></script>-->
	<script src="./libs/jquery.js"></script>
	<script src="./libs/lodash.js"></script>
	<script src="./libs/backbone.js"></script>
	<script src="./libs/joint_v2.2.1.js"></script>
	<script src="./libs/svg-pan-zoom.js"></script>
	<script src="./eer/js/palette_shapes.js"></script>
	
</head>
<body>
	<header>
		<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
			<a class="navbar-brand crowd-header text-white">ERvt-crowd<span class="crowdforteens-header text-white"></span>
			<a class="tooltipsbottom" href="#"><button class="btn-group menubutton" type="button" id="json" onclick="exportTemporalJSON()">JSON</button><span>Export JSON diagram</span></a>
			<a class="tooltipsbottom" href="#"><button class="btn-group menubutton" type="button" id="inference" onclick="checkSatisfiability()">SAT</button><span>Sat</span></a>
			<a class="tooltipsbottom" href="#"><button class="btn-group menubutton" type="button" id="inference" onclick="encodeERvt()">Encode</button><span>Encode</span></a>
			<a class="tooltipsbottom" href="#"><button class="btn-group menubutton" type="button" id="btnClean" onclick="cleanInference()">Clean</button><span>Clean validation markup</span></a>
			<a class="tooltipsbottom" href="#"><button class="btn-group menubutton" type="button" id="btnDB" onclick="generateDB()">DB</button><span>Generate the database</span></a></a>
			<a class="unco btn btn-sm btn-outline-dark" href="http://faiweb.uncoma.edu.ar/" target="_blank" role="button">
				<img src="imgs/unco.png" height="32" alt="uncoma" />
			</a>
		</nav>
	</header>
	<div id="paper"></div><!--<div id="palette-container">-->
	<div id="palette" class="palette-vertical"></div><!--</div>-->
	<div id="minimap"></div>
	<script src="./eer/js/erd2.js"></script>
	<script src="./eer/js/temperd.js"></script>
	<script src="./eer/js/utils.js"></script>
	<script src="./eer/requests/server_connection.js"></script>

	<span id='string_span' style='font-size: 14;white-space: nowrap;display:none'></span>
</body>
</html>