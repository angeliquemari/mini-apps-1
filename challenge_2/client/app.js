// $( document ).ready(function() {
//   $('#json-submission').submit(function(e) {
//     e.preventDefault();
//     var form = $('.file')[0];
//     var file = form.files[0];
//     var formData = new FormData();
//     formData.append('file', file);
//     $.ajax({
//       type: 'POST',
//       data: formData,
//       url: '/',
//       cache: false,
//       contentType: false,
//       processData: false,
//       success: (data) => {
//         $('#csv-report').empty().append(data);
//       }
//     });
//   });
// });
