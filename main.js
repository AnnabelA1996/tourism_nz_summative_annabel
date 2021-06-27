// date-picker
let startDate;
let endDate;

const dateOptions = {
  altInput: true,
  altFormat: 'F j, Y',
  dateFormat: 'Y-m-d',
  minDate: 'today',
  mode: 'range',
  // allowInput: true,
  inline: true,

  onChange(dates, string, picker) {
    $('#selected-dates').text(string);
    [startDate, endDate] = dates;
    if (dates[0]) {
      picker.set('maxDate', new Date(dates[0]).fp_incr(15));
    } else {
      picker.set('maxDate', '');
    }
    $('#start-date').text(startDate);
    $('#end-date').text(endDate);
  },
};

$('#datepicker').flatpickr(dateOptions);

const mapConfig = {
  zoomSnap: 0.2,
};

// map
const map = L.map('mapid', mapConfig).fitBounds(L.latLngBounds(L.latLng({
  lng: 179.243,
  lat: -33.490,
}), L.latLng({
  lng: 164.924,
  lat: -47.600,
})));

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);