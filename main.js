const cities = {
  auckland: {
    name: 'Auckland',
    lat: -36.8509,
    lng: 174.7645,
  },
  whangarei: {
    name: 'Whangarei',
    lat: -35.7275,
    lng: 174.3166,
  },
  hamilton: {
    name: 'Hamilton',
    lat: -37.7826,
    lng: 175.2528,
  },
  tauranga: {
    name: 'Tauranga',
    lat: -37.7476,
    lng: 176.1220,
  },
  rotorua: {
    name: 'Rotorua',
    lat: -38.1446,
    lng: 176.2378,
  },
  gisborne: {
    name: 'Gisborne',
    lat: -38.6641,
    lng: 178.0228,
  },
  napier: {
    name: 'Napier',
    lat: -39.5109,
    lng: 176.8764,
  },
  newPlymouth: {
    name: 'New Plymouth',
    lat: -39.0572,
    lng: 174.0794,
  },
  palmerstonNorth: {
    name: 'Palmerston North',
    lat: -40.3545,
    lng: 175.6097,
  },
  wellington: {
    name: 'Wellington',
    lat: -41.2924,
    lng: 174.7787,
  },
  nelson: {
    name: 'Nelson',
    lat: -41.2985,
    lng: 173.2444,
  },
  greymouth: {
    name: 'Greymouth',
    lat: -42.4614,
    lng: 171.1985,
  },
  christchurch: {
    name: 'Christchurch',
    lat: -43.5320,
    lng: 172.6306,
  },
  dunedin: {
    name: 'Dunedin',
    lat: -45.8795,
    lng: 170.5006,
  },
  queenstown: {
    name: 'Queenstown',
    lat: -45.0302,
    lng: 168.6615,
  },
  invercargill: {
    name: 'Invercargill',
    lat: -46.4179,
    lng: 168.3615,
  },
};

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

map.on('click', (event) => {
  L.marker(event.latlng).addTo(map);
});

Object.keys(cities).forEach((key) => {
  const option1 = document.createElement('option');
  const option2 = document.createElement('option');
  option1.value = key;
  option2.value = key;
  option1.text = cities[key].name;
  option2.text = cities[key].name;
  $('#departure-location').append(option1);
  $('#arrival-location').append(option2);
});

// init screens

function changeScreen() {
  $('.view').hide();
  const view = $(this).data('view');
  $(`#${view}`).show();
}

function initScreens() {
  $('.view').slice(1).hide();
  $('.nav-link').click(changeScreen);
  $('.nav-logo').click(changeScreen);
  // ^ needed to add class not just nav-link because there's nothing called that
}

function init() {
  initScreens();
}

init();
