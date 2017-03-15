window.onload = function() {
  $.validator.addMethod("tel", function(value, element) {
    return this.optional(element) || (/[\d\-\.\(\)\+\ ]+/.test(value) && value.length >= 10);
  }, "Please enter a valid phone number, can include +, -, ()");

  /////////////////////
  // FORM SUBMISSION //
  /////////////////////
  $("#contact-submit").on('click', function() {
    if ($('#contact-form').valid()) {
      var name = $('input[name="name"]').val();
      var email = $('input[name="email"]').val();
      var tel = $('input[name="tel"]').val();

      $.ajax({
        url: "https://docs.google.com/forms/d/1fToTgN-XHR2OkczYJexXhsURFD2qbyxAaaY1QKUr3KM/formResponse",
        type: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        },
    contentType: "application/x-www-form-urlencoded",
        data: {
          "entry.2030772584": name,
          "entry.769044472": email,
          "entry.863131288": tel,
        }
      }).done( function() {
        $("#contact-form").hide();
        $("#contact-success").show();
      }).fail( function() {
        $("#contact-form").hide();
        $("#contact-success").show();
        console.log('CORS error, form still submitted, whatever.');
      })
    }
  })

  //////////////
  // CAROUSEL //
  //////////////
  var studentIndex = 0;

  function slideStudent(n) {
    showStudent(studentIndex += n);
  }

  function currentStudent(n) {
    showStudent(studentIndex = n);
  }

  function showStudent(n) {
    var i;
    var students = $('.student');
    var titles = $('.student-title');
    // var studentDots = $('.student_dots span');
    if (n > students.length - 1) {studentIndex = 0}
    if (n < 0) {studentIndex = students.length - 1}
    for (i = 0; i < students.length; i++) {
      students[i].style.display = "none";
      titles[i].style.display = "none";
    }
    // for (i = 0; i < studentDots.length; i++) {
    //   studentDots[i].className = studentDots[i].className.replace("dove-gray", "silver");
    // }
    students[studentIndex].style.display = "block";
    titles[studentIndex].style.display = "block";
    // studentDots[studentIndex].className = studentDots[studentIndex].className.replace("silver", "dove-gray");
  }

  // for (i = 0; i < $('.student').length; i++) {
  //   $('.student_dots').append('<span class="dot silver" data-id=' + i + '><i class="fa fa-circle" aria-hidden="true"></i></span>');
  // }

  // $('.student_dots .dot').click( function() {
  //   currentStudent($(this).data().id);
  // })

  showStudent(studentIndex);
  $('#previous_student').click(function() {slideStudent(-1)});
  $('#next_student').click(function() {slideStudent(1)});
}