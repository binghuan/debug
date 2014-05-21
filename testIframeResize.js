console.log('!!!');

var iframe;
var lightBoxFrame;

$('document').ready(function() {

  console.log('Document is Ready!!');
  iframe = document.getElementById('topbarFrame');
  lightBoxFrame = document.getElementById('lightboxFrame');

  $('#btn_biggeriframeNoAnim').click(function() {
      console.log('ready to modify iframe height');
      //$('#topbarFrame').hide();
      iframe.height = '130pt';
      //$('#topbarFrame').show();

  });

  $('#btn_reset').click(function() {
    iframe.height = '75pt';
    $(iframe).show();
  });

  $('#btn_showLightBox').click(function() {
    console.log('ready to show lightbox');
    $(iframe).hide();
    lightBoxFrame.height = '100%';
    //$(lightBoxFrame).show();
    lightBoxFrame.style.cssText = "z-index:2147483647;visibility: display; position:fixed;";
    //lightBoxFrame.style.cssText = "z-index:2147483647;background-color: gray;visibility: display; filter: alpha(opacity=0);opacity:0.1;position:fixed;";

  });

});
