var fadeTime = 300; // half of complete fade
var refreshTime = 10000; // 5 minutes
var csvUrl = './tapeout-progress.csv';

function loadContent() {
  $.ajax({
    url: csvUrl,
    dataType: 'text',
    async: false,
    cache: false,
    success: function(data) {
      if (data) {
        $('.generated').fadeOut(fadeTime, function() { $(this).remove(); })
        setTimeout( function(meters) {
          for ( let meter of processCSV(data) ) {
            createMeter(meter[0], meter[1]);
          }
        }, fadeTime, data );
      }
    }
  });
}

function processCSV(text) {
  var csvArray = [];
  for ( let line of text.replace(/\n$/, '').split(/\r\n|\n/) ) {
    csvArray.push( line.split(',') );
  }
  return csvArray;
}

function createMeter(meterName, meterValue) {
  var meterPercentage = ( Number.parseFloat(meterValue) * 100 ).toFixed(0) + '%';
  var progressLabel = $('<label/>', { class: 'generated', text: meterName } )
  var progressBar = $('<div/>', { class: 'meterbar generated' } );
  progressBar.append( $('<progress/>', { value: meterValue } ) );
  progressBar.append( $('<div/>', { class: 'percentage', text: meterPercentage }) );
  progressLabel.hide().appendTo('.grid').fadeIn(fadeTime);
  progressBar.hide().appendTo('.grid').fadeIn(fadeTime);
}

function populateGrid() {
  $('.meter').fadeOut(fadeTime, function() { $(this).remove(); })
  setTimeout('createMeters()', fadeTime);
}

function reloadContent() {
  setInterval(loadContent, refreshTime);
}

document.addEventListener("DOMContentLoaded", loadContent);
document.addEventListener("DOMContentLoaded", reloadContent);
