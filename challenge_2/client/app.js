// $('#json-submission').submit(function(e) {
//   e.preventDefault();
//   var form = $('.file')[0];
//   var file = form.files[0];
//   var formData = new FormData();
//   formData.append('file', file);
//   $.ajax({
//     type: 'POST',
//     data: formData,
//     url: '/',
//     cache: false,
//     contentType: false,
//     processData: false,
//     success: (data) => {
//       $('#csv-report').empty().append(data);
//       $('#download').show();
//     }
//   });
// });

// $('#download').click(function(e) {
//   e.preventDefault();
//   $.ajax({
//     type: 'GET',
//     url: '/download',
//     success: (data) => {
//       var blob = new Blob([data]);
//       var link = document.createElement('a');
//       link.href = window.URL.createObjectURL(blob);
//       link.download = "convertedJSON.csv";
//       link.click();
//     }
//   });
// });