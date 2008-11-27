<?php
$html = file_get_contents("toolbar.htm");
echo preg_replace( "/(?:(?<=\>)|(?<=\/\>))(\s+)(?=\<\/?)/","", $html )
                    
?>
