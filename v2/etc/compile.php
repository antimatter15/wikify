<?php
header("content-type: text/javascript");
  
  //from http://www.justin-cook.com/wp/2006/03/31/php-parse-a-string-between-two-strings/
function get_string_between($string, $start, $end){
        $string = " ".$string;
        $ini = strpos($string,$start);
        if ($ini == 0) return "";
        $ini += strlen($start);
        $len = strpos($string,$end,$ini) - $ini;
        return substr($string,$ini,$len);
}

$html = get_string_between(file_get_contents("toolbar.htm"),
              "<!--BEGIN Main-->",
              "<!--END Main-->");


//http://www.blog.highub.com/regular-expression/php-regex-regular-expression/php-regex-remove-whitespace-from-html/
$newhtml = preg_replace( "/(?:(?<=\>)|(?<=\/\>))(\s+)(?=\<\/?)/","", $html);

$newhtml = preg_replace("/[\n\r]/","",$newhtml);

$out =  "var wk_toolbar = '".$newhtml."';";

file_put_contents("js/toolbar.js",$out);
?>