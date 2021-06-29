// date-picker
let startDate;
let endDate;

// input form

let firstNameValid = true;
let secondNameValid = true;
let amountOfPeopleValid = true;
let ageValid = true;

function submitActive() {
  $('#submit').prop('disabled', !(firstNameValid
    && secondNameValid && amountOfPeopleValid
    && ageValid));
}

function validateAmountOfPeople(event) {
  const value = event.target.value.trim();
  const num = Number.parseInt(value, 10);
  if (Number.isNaN(num) || num > 6 || num < 1) {
    amountOfPeopleValid = false;
    $('#amount-of-people').css({
      background: 'red',
    });
  } else {
    $('#amount-of-people').css({
      background: '',
    });
    amountOfPeopleValid = true;
  }
  submitActive();
}

function validateFirstName(event) {
  firstNameValid = /^[a-zA-Z]+$/.test(event.target.value.trim());
  if (firstNameValid) {
    $('#first-name').css({
      background: '',
    });
  } else {
    $('#first-name').css({
      background: 'red',
    });
  }
  submitActive();
}

function validateSecondName(event) {
  secondNameValid = /^[a-zA-Z]+$/.test(event.target.value.trim());
  if (secondNameValid) {
    $('#second-name').css({
      background: '',
    });
  } else {
    $('#second-name').css({
      background: 'red',
    });
  }
  submitActive();
}

function validateAge(event) {
  const value = event.target.value.trim();
  const num = Number.parseInt(value, 10);
  if (Number.isNaN(num) || num < 16) {
    ageValid = false;
    $('#age').css({
      background: 'red',
    });
  } else {
    $('#age').css({
      background: '',
    });
    ageValid = true;
  }
  submitActive();
}

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

const dateOptions = {
  altInput: true,
  altFormat: 'F j, Y',
  dateFormat: 'Y-m-d',
  minDate: 'today',
  mode: 'range',
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

const wayPoints = [];

let routeControl;

$('#datepicker').flatpickr(dateOptions);

// map

const mapConfig = {
  zoomSnap: 0.2,
};

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

// map.on('click', (event) => {
//   L.marker(event.latlng).addTo(map);
// });

function setRouting() {
  routeControl.setWaypoints(wayPoints);
}

function departureChange() {
  const city = cities[this.value];
  wayPoints[0] = {
    lat: city.lat,
    lng: city.lng,
  };
  setRouting();
}

function arrivalChange() {
  const city = cities[this.value];
  wayPoints[1] = {
    lat: city.lat,
    lng: city.lng,
  };
  setRouting();
}

function initDropdowns() {
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
  $('#departure-location').change(departureChange);
  $('#arrival-location').change(arrivalChange);
}

// init screens - page switching functions

function changeScreen() {
  $('.view').hide();
  const view = $(this).data('view');
  $(`#${view}`).show();
}

function initScreens() {
  $('.view').slice(1).hide();
  $('.nav-link').click(changeScreen);
  $('.nav-logo').click(changeScreen);
}

function init() {
  initScreens();
  initDropdowns();
  routeControl = L.Routing.control({
    waypoints: [null],
    router: L.Routing.mapbox('pk.eyJ1IjoiYW5uYWJlbGEiLCJhIjoiY2txZ2VhNjk2MDQ2bTJ3bnl6NXF2eDFpMyJ9.q1BsrbH_z74eNRr8KJCOJA'),
  });
  routeControl.addTo(map);
  $('#amount-of-people').blur(validateAmountOfPeople);
  $('#age').blur(validateAge);
  $('#first-name').blur(validateFirstName);
  $('#second-name').blur(validateSecondName);
}

init();
