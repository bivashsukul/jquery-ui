$(document).ready(function(){

  $( "#draggable" ).draggable({ scroll: true });
  $( "#draggable2" ).draggable({ scroll: true, scrollSensitivity: 100 });
  $( "#draggable3" ).draggable({ scroll: true, scrollSpeed: 100 });

// * jquery accordian -UI
$( function() {
  $( "#accordion" ).accordion();
} );

// *jQuery UI Effects - Animate demo---------------------------------
$( function() {
  var state = true;
  $( "#button" ).on( "click", function() {
    if ( state ) {
      $( "#effect" ).animate({
        backgroundColor: "#aa0000",
        color: "#fff",
        width: 500
      }, 1000 );
    } else {
      $( "#effect" ).animate({
        backgroundColor: "#fff",
        color: "#000",
        width: 240
      }, 1000 );
    }
    state = !state;
  });
} );


// *UI Autocomplete - Multiple values---------------------------
$( function() {
  var availableTags = [
    "ActionScript",
    "AppleScript",
    "Asp",
    "BASIC",
    "C",
    "C++",
    "Clojure",
    "COBOL",
    "ColdFusion",
    "Erlang",
    "Fortran",
    "Groovy",
    "Haskell",
    "Java",
    "JavaScript",
    "Lisp",
    "Perl",
    "PHP",
    "Python",
    "Ruby",
    "Scala",
    "Scheme"
  ];
  function split( val ) {
    return val.split( /,\s*/ );
  }
  function extractLast( term ) {
    return split( term ).pop();
  }

  $( "#tags" )
    // don't navigate away from the field on tab when selecting an item
    .on( "keydown", function( event ) {
      if ( event.keyCode === $.ui.keyCode.TAB &&
          $( this ).autocomplete( "instance" ).menu.active ) {
        event.preventDefault();
      }
    })
    .autocomplete({
      minLength: 0,
      source: function( request, response ) {
        // delegate back to autocomplete, but extract the last term
        response( $.ui.autocomplete.filter(
          availableTags, extractLast( request.term ) ) );
      },
      focus: function() {
        // prevent value inserted on focus
        return false;
      },
      select: function( event, ui ) {
        var terms = split( this.value );
        // remove the current input
        terms.pop();
        // add the selected item
        terms.push( ui.item.value );
        // add placeholder to get the comma-and-space at the end
        terms.push( "" );
        this.value = terms.join( ", " );
        return false;
      }
    });
} );


// *-jQuery UI Checkboxradio - Product Selector-------------
$( function() {
  function handleShape( e ) {
    $( ".shape" )
      .removeClass( "circle pill square rectangle" )
      .addClass( $( e.target ).val() );
  };
  function handleToggle( e ) {
    var target = $( e.target );

    if ( target.is( ".brand-toggle" ) ) {
      var checked = target.is( ":checked" ),
        value = $( "[name='brand']" )
          .filter( ":checked" )
          .attr( "data-" + target[ 0 ].id )
      $( ".shape" ).css( target[ 0 ].id, checked ? value : "" );
    } else {
      $( ".shape" ).toggleClass( target[ 0 ].id, target.is( ":checked") );
    }
  }
  function updateBrand() {
    handleShape( { target: $( "[name='shape']:checked" ) } );
    $( ".toggle:checked" ).each( function() {
      handleToggle( { target: $( this ) } );
    } );
  }

  // Initalize widgets
  $( "input" ).checkboxradio();
  $( ".shape-bar, .brand" ).controlgroup();
  $( ".toggles" ).controlgroup( {
    direction: "vertical"
  } );

  // Bind event handlers
  $( "[name='shape']").on( "change", handleShape );
  $( ".toggle" ).on( "change", handleToggle );
  $( "[name='brand']").on( "change", updateBrand );

  // Set initial values
  updateBrand();
} );

// *jQuery UI Datepicker -----------------
$( "#datepicker" ).datepicker( $.datepicker.regional[ "fr" ] );
$( "#locale" ).on( "change", function() {
  $( "#datepicker" ).datepicker( "option",
    $.datepicker.regional[ $( this ).val() ] );
});

// *jQuery UI Dialog - Animation
$( "#dialog" ).dialog({
  autoOpen: false,
  show: {
    effect: "blind",
    duration: 1000
  },
  hide: {
    effect: "explode",
    duration: 1000
  }
});

$( "#opener" ).on( "click", function() {
  $( "#dialog" ).dialog( "open" );
});


// jQuery UI Menu - Icons-----------------------
$( "#menu" ).menu();


// jQuery UI Progressbar - Custom Label---------------------
var progressbar = $( "#progressbar" ),
progressLabel = $( ".progress-label" );

progressbar.progressbar({
value: false,
change: function() {
  progressLabel.text( progressbar.progressbar( "value" ) + "%" );
},
complete: function() {
  progressLabel.text( "Complete!" );
}
});

function progress() {
var val = progressbar.progressbar( "value" ) || 0;

progressbar.progressbar( "value", val + 2 );

if ( val < 99 ) {
  setTimeout( progress, 80 );
}
}

setTimeout( progress, 2000 );

// UI Selectmenu - Product Selection---------------------
// !(no =1 )-------------
var circle = $( "#circle" );
 
$( "#radius" ).selectmenu({
  change: function( event, data ) {
    circle.css({
      width: data.item.value,
      height: data.item.value
    });
  }
 });

$( "#color" ).selectmenu({
   change: function( event, data ) {
     circle.css( "background", data.item.value );
   }
 });
// ! no=2-------
$.widget( "custom.iconselectmenu", $.ui.selectmenu, {
  _renderItem: function( ul, item ) {
    var li = $( "<li>" ),
      wrapper = $( "<div>", { text: item.label } );

    if ( item.disabled ) {
      li.addClass( "ui-state-disabled" );
    }

    $( "<span>", {
      style: item.element.attr( "data-style" ),
      "class": "ui-icon " + item.element.attr( "data-class" )
    })
      .appendTo( wrapper );

    return li.append( wrapper ).appendTo( ul );
  }
});

$( "#filesA" )
  .iconselectmenu()
  .iconselectmenu( "menuWidget" )
    .addClass( "ui-menu-icons" );

$( "#filesB" )
  .iconselectmenu()
  .iconselectmenu( "menuWidget" )
    .addClass( "ui-menu-icons customicons" );

$( "#people" )
  .iconselectmenu()
  .iconselectmenu( "menuWidget")
    .addClass( "ui-menu-icons avatar" );


// jQuery UI Slider - Colorpicker----------
function hexFromRGB(r, g, b) {
  var hex = [
    r.toString( 16 ),
    g.toString( 16 ),
    b.toString( 16 )
  ];
  $.each( hex, function( nr, val ) {
    if ( val.length === 1 ) {
      hex[ nr ] = "0" + val;
    }
  });
  return hex.join( "" ).toUpperCase();
}
function refreshSwatch() {
  var red = $( "#red" ).slider( "value" ),
    green = $( "#green" ).slider( "value" ),
    blue = $( "#blue" ).slider( "value" ),
    hex = hexFromRGB( red, green, blue );
  $( "#swatch" ).css( "background-color", "#" + hex );
}

$( "#red, #green, #blue" ).slider({
  orientation: "horizontal",
  range: "min",
  max: 255,
  value: 127,
  slide: refreshSwatch,
  change: refreshSwatch
});
$( "#red" ).slider( "value", 255 );
$( "#green" ).slider( "value", 140 );
$( "#blue" ).slider( "value", 60 );


// jQuery UI Tabs - Simple manipulation----------------------
var tabTitle = $( "#tab_title" ),
      tabContent = $( "#tab_content" ),
      tabTemplate = "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></li>",
      tabCounter = 2;
 
    var tabs = $( "#tabs" ).tabs();
 
    // Modal dialog init: custom buttons and a "close" callback resetting the form inside
    var dialog = $( "#dialog" ).dialog({
      autoOpen: false,
      modal: true,
      buttons: {
        Add: function() {
          addTab();
          $( this ).dialog( "close" );
        },
        Cancel: function() {
          $( this ).dialog( "close" );
        }
      },
      close: function() {
        form[ 0 ].reset();
      }
    });
 
    // AddTab form: calls addTab function on submit and closes the dialog
    var form = dialog.find( "form" ).on( "submit", function( event ) {
      addTab();
      dialog.dialog( "close" );
      event.preventDefault();
    });
 
    // Actual addTab function: adds new tab using the input from the form above
    function addTab() {
      var label = tabTitle.val() || "Tab " + tabCounter,
        id = "tabs-" + tabCounter,
        li = $( tabTemplate.replace( /#\{href\}/g, "#" + id ).replace( /#\{label\}/g, label ) ),
        tabContentHtml = tabContent.val() || "Tab " + tabCounter + " content.";
 
      tabs.find( ".ui-tabs-nav" ).append( li );
      tabs.append( "<div id='" + id + "'><p>" + tabContentHtml + "</p></div>" );
      tabs.tabs( "refresh" );
      tabCounter++;
    }
 
    // AddTab button: just opens the dialog
    $( "#add_tab" )
      .button()
      .on( "click", function() {
        dialog.dialog( "open" );
      });
 
    // Close icon: removing the tab on click
    // !no=1
    tabs.on( "click", "span.ui-icon-close", function() {
      var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
      $( "#" + panelId ).remove();
      tabs.tabs( "refresh" );
    });
 
    tabs.on( "keyup", function( event ) {
      if ( event.altKey && event.keyCode === $.ui.keyCode.BACKSPACE ) {
        var panelId = tabs.find( ".ui-tabs-active" ).remove().attr( "aria-controls" );
        $( "#" + panelId ).remove();
        tabs.tabs( "refresh" );
      }
    });

// !no=2
$( "#tabs" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
$( "#tabs li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );


//* jQuery UI Effects - Easing demo
if ( !$( "<canvas>" )[0].getContext ) {
  $( "<div>" ).text(
    "Your browser doesn't support canvas, which is required for this demo."
  ).appendTo( "#graphs" );
  return;
}

var i = 0,
  width = 100,
  height = 100;

$.each( $.easing, function( name, impl ) {
  var graph = $( "<div>" ).addClass( "graph" ).appendTo( "#graphs" ),
    text = $( "<div>" ).text( ++i + ". " + name ).appendTo( graph ),
    wrap = $( "<div>" ).appendTo( graph ).css( 'overflow', 'hidden' ),
    canvas = $( "<canvas>" ).appendTo( wrap )[ 0 ];

  canvas.width = width;
  canvas.height = height;
  var drawHeight = height * 0.8,
    cradius = 10,
    ctx = canvas.getContext( "2d" );
  ctx.fillStyle = "black";

  // Draw background
  ctx.beginPath();
  ctx.moveTo( cradius, 0 );
  ctx.quadraticCurveTo( 0, 0, 0, cradius );
  ctx.lineTo( 0, height - cradius );
  ctx.quadraticCurveTo( 0, height, cradius, height );
  ctx.lineTo( width - cradius, height );
  ctx.quadraticCurveTo( width, height, width, height - cradius );
  ctx.lineTo( width, 0 );
  ctx.lineTo( cradius, 0 );
  ctx.fill();

  // Draw bottom line
  ctx.strokeStyle = "#555";
  ctx.beginPath();
  ctx.moveTo( width * 0.1, drawHeight + .5 );
  ctx.lineTo( width * 0.9, drawHeight + .5 );
  ctx.stroke();

  // Draw top line
  ctx.strokeStyle = "#555";
  ctx.beginPath();
  ctx.moveTo( width * 0.1, drawHeight * .3 - .5 );
  ctx.lineTo( width * 0.9, drawHeight * .3 - .5 );
  ctx.stroke();

  // Plot easing
  ctx.strokeStyle = "white";
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.moveTo( width * 0.1, drawHeight );
  $.each( new Array( width ), function( position ) {
    var state = position / width,
      val = impl( state, position, 0, 1, width );
    ctx.lineTo( position * 0.8 + width * 0.1,
      drawHeight - drawHeight * val * 0.7 );
  });
  ctx.stroke();

  // Animate on click
  graph.on( "click", function() {
    wrap
      .animate( { height: "hide" }, 2000, name )
      .delay( 800 )
      .animate( { height: "show" }, 2000, name );
  });

  graph.width( width ).height( height + text.height() + 10 );
});

// *jQuery UI Position - Image Cycler




  // !  END------------
  });