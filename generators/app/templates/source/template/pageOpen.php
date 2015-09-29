<!-- @: template/page/open.php -->
<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <title><%= appName %></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width">
        <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->

        <!-- build:css(./bower_components) ../asset/style/vendor.sitebuild.css -->
        <!-- bower:css -->
        <!-- endbower -->
        <% if (dependencies.framework === 'Semantic UI') { %><link rel="stylesheet" href="semantic/dist/semantic.css" /><% } %>

        <!-- endbuild -->


        <!-- build:css(./source) ../asset/style/style.sitebuild.css -->
        <link rel="stylesheet" href="asset/css/style.sitebuild.css">
        <!-- endbuild -->
    </head>
    <body>
    <!-- /: template/page/open.php -->