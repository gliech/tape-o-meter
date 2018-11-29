var fadeTime = 300; // half of complete fade
var refreshTime = 15000; // 15 seconds
var csvUrl = './tapeout-progress.csv';

function loadContent() {
  $.ajax({
    url: csvUrl,
    dataType: 'text',
    async: false,
    cache: false,
    ifModified: true,
    success: function(data) {
      if (data) {
        $('.generated').fadeOut(fadeTime, function() { $(this).remove(); })
        setTimeout( function() {
          for ( let meter of processCSV(data) ) {
            createMeter(meter[0], meter[1]);
          }
        }, fadeTime );
      } else {
        createError();
      }
    },
    error: createError
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
  var progressLabel = $('<label/>', { class: 'generated', text: meterName });
  var progressBar = $('<div/>', { class: 'meterbar generated' });
  progressBar.append( $('<progress/>', { value: meterValue }) );
  progressBar.append( $('<div/>', { class: 'percentage', text: meterPercentage }) );
  progressLabel.hide().appendTo('body').fadeIn(fadeTime);
  progressBar.hide().appendTo('body').fadeIn(fadeTime);
}

function createError() {
  var errorMessage = 'Error: could not load tapeout progress information';
  var errorElement = $('<footer>', { class: 'error generated', text: errorMessage });
  if ( $('.error').length == 0 ) {
    errorElement.hide().appendTo('body').fadeIn(fadeTime);
  }
}

$(function() {
  loadContent();
  setInterval(loadContent, refreshTime);
});
