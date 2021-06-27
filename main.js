const dateOptions = {
    altInput: true,
    altFormat: "F j, Y",
    dateFormat: "Y-m-d",
    minDate: "today",
    maxDate: new Date().fp_incr(14), // 14 days from now
    mode: "range",

    onClose: function(dates, sting, picker){
        $('#selected-dates').text(string);
    }
}

$('#datepicker').flatpickr(dateOptions);