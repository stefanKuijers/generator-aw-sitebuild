<% if ( dependencies.framework !== 'Pure CSS' && dependencies.framework !== 'No framework' && !dependencies.jQuery ) { %> $( document ).ready( function() {<% } %>
    console.log('JS for home.php');
<% if ( dependencies.framework !== 'Pure CSS' && dependencies.framework !== 'No framework' && !dependencies.jQuery ) { %>} );<% } %>
