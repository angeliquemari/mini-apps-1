(function() {

  $('#json-submission').submit(function(e) {
    e.preventDefault();
    console.log('test');
    alert('test');
    // var form = $('.file')[0];
    // var file = form.files[0];
    // var formData = new FormData();
    // formData.append('file', file);
    // $.ajax({
    //   type: 'POST',
    //   data: formData,
    //   url: '/',
    //   cache: false,
    //   contentType: false,
    //   processData: false,
    //   success: (data) => {
    //     $('#csv-report').append(data);
    //   }
    // })
  });

})();

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
//       $('#csv-report').append(data);
//     }
//   })
// });
