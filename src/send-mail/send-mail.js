var data ; var siteName = "FivePointTaxes";
$("#contactForm").validate({
  onkeyup: false,
  onclick: false,
  onfocusout: false,
  normalizer: function(value) {
    return $.trim(value);
  },
  rules: {
    fname: {
      required: true
    },
    lname: {
      required: true
    },
    email: {
      required: true,
      email: true
    },
    phone: {
      required: true
    },
    subject: {
      required: true,
    },
    message: {
      required: true
    }
  },
  messages: {
    fname: {
      required: "First Name is required!"
    },
    lname: {
      required: "Last Name is required!"
    },
    email: {
      required: "Email is required!",
      email: "Please enter valid email!"
    },
    phone: {
      required: "Phone is required!"
    },
    subject: {
      required: "Subject is required!"
    },
    message: {
      required: "Message is required!"
    }
  },
  highlight: function(element) {
    $(element).addClass("is-invalid");
  },
  unhighlight: function(element, errorClass) {
    $(element).removeClass("is-invalid");
  },
  errorElement: "div",
  errorClass: "invalid-feedback",
  submitHandler: function() {
    data = '';
    data = $("#contactForm").serialize();
    data += "&siteName=" + siteName;
    sendContactUsEmail(data);
  }
});

$("#contactModalForm").validate({
  onkeyup: false,
  onclick: false,
  onfocusout: false,
  normalizer: function(value) {
    return $.trim(value);
  },
  rules: {
    fname: {
      required: true
    },
    lname: {
      required: true
    },
    email: {
      required: true,
      email: true
    },
    phone: {
      required: true
    },
    subject: {
      required: true,
    },
    message: {
      required: true
    }
  },
  messages: {
    fname: {
      required: "First Name is required!"
    },
    lname: {
      required: "Last Name is required!"
    },
    email: {
      required: "Email is required!",
      email: "Please enter valid email!"
    },
    phone: {
      required: "Phone is required!"
    },
    subject: {
      required: "Subject is required!"
    },
    message: {
      required: "Message is required!"
    }
  },
  highlight: function(element) {
    $(element).addClass("is-invalid");
  },
  unhighlight: function(element, errorClass) {
    $(element).removeClass("is-invalid");
  },
  errorElement: "div",
  errorClass: "invalid-feedback",
  submitHandler: function() {
    data = '';
    data = $("#contactModalForm").serialize();
    data += "&siteName=" + siteName;
    sendContactUsEmail(data);
  }
});

function sendContactUsEmail(data) {
  console.log(data);
  

  $.ajax({
    url: "./send-mail/send-contant-us-mail.php",
    method: "POST",
    data: data,
    beforeSend: function() {
      $(".contactFormSubmit span").removeClass("d-none");
      $(".contactFormSubmit").attr("disabled", true);
    },
    success: function(data, status, xhr) {
      $(".contactForm").trigger("reset");
      $(".contactFormSubmit span").addClass("d-none");
      $(".contactFormSubmit").attr("disabled", false);
      if (data.status === "error") {
        errorToastrMsg(data.message);
        return true;
      }
      successToastrMsg(data.message);
    },
    error: function(xhr, status, error) {
      $(".contactFormSubmit span").addClass("d-none");
      displayError(xhr);
    }
  });
}


// 
var toastrOptions = {
  // "closeButton": true,
  "preventDuplicates": true,
  "preventOpenDuplicates": true,
  "showMethod": 'slideDown',
  "progressBar": true,
  "showMethod": 'slideDown',
  "hideMethod": 'slideUp',
  "closeMethod": 'slideUp',
  "timeOut": 3000,
  "maxOpened": 1
}

function successToastrMsg($msg) {
  toastr.options = toastrOptions;

  toastr.success($msg);
}

function warningToastrMsg($msg) {
  toastr.options = toastrOptions;

  toastr.warning($msg);
}

function infoToastrMsg($msg) {
  toastr.options = toastrOptions;

  toastr.info($msg);
}

function errorToastrMsg($msg) {
  toastr.options = toastrOptions;

  toastr.error($msg);
}

function displayError(xhr) {
  var err = JSON.parse(xhr.responseText);
  var message = [err.message];
  if (err.errors !== undefined) {
    $.each(err.errors, function(key, value) {
      message.push("<li>" + value + "</li>");
    });
  }
  errorToastrMsg(message);
}
