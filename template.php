<?php
/*

   Copyright 2019 Gilia

   Author: gab

   template.php

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

/**
   Insert the named widget template.

   Insert the <script> tag and then include the file with the same name under
   the templates directory.
 */
function insert_template($name, $dir){
    echo "<script type=\"text/template\" id=\"template_$name\">";
    include "eer/views/$dir/$name.php";
    echo "</script>";
}

?>
