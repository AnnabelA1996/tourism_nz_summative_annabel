/* eslint-disable space-before-function-paren */
// date-picker
let startDate;
let endDate;
let numberOfDays;

// input form

let firstNameValid = true;
let secondNameValid = true;
let numberOfPeopleValid = true;
let ageValid = true;
let licenseValid = false;
let currencyValid = true;

let firstName;
let secondName;
let numberOfPeople;
let age;

let testDistance;
let totalDistanceKm;

let validVehicles;
let departureLocation;
let destinationLocation;
let license;
let currency = 'NZD';

function submitActive() {
  $('#submit').prop(
    'disabled',
    !(firstNameValid && secondNameValid && numberOfPeopleValid && ageValid),
  );
}

function validateNumberOfPeople(event) {
  const value = event.target.value.trim();
  const num = Number.parseInt(value, 10);
  numberOfPeople = num;
  if (Number.isNaN(num) || num > 6 || num < 1) {
    numberOfPeopleValid = false;
    $('#number-of-people').css({
      background: 'red',
    });
  } else {
    $('#number-of-people').css({
      background: '',
    });
    numberOfPeopleValid = true;
  }
  submitActive();
}

function validateLicense(event) {
  license = event.target.value;
  licenseValid = true;
}

function validateCurrency(event) {
  currency = event.target.value;
  currencyValid = true;
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

const vehicles = [
  {
    name: 'Small Car',
    consumption: 8.5,
    minPeople: 1,
    maxPeople: 2,
    price: 129,
    minDays: 1,
    maxDays: 10,
    license: ['full', 'restricted', 'learners'],
    imgId: 'small-car',
  },

  {
    name: 'Motorbike',
    consumption: 3.7,
    minPeople: 1,
    maxPeople: 1,
    price: 109,
    minDays: 1,
    maxDays: 5,
    license: ['motorcycle'],
    imgId: 'small-car',
  },

  {
    name: 'Large Car',
    consumption: 9.71,
    minPeople: 1,
    maxPeople: 5,
    price: 129,
    minDays: 3,
    maxDays: 10,
    license: ['full', 'restricted', 'learners'],
    imgId: 'large-car',
  },

  {
    name: 'motor home',
    consumption: 17,
    minPeople: 2,
    maxPeople: 6,
    price: 200,
    minDays: 2,
    maxDays: 15,
    license: ['full', 'restricted', 'learners'],
    imgId: 'van',
  },
];

function displayRecommendedVehicles(vehiclesArray) {
  console.log('blah');
  let html = '';
  vehiclesArray.forEach((recommendation) => {
    html += `<div><img src="/images/${recommendation.vehicle.imgId}.png">
              <p>${recommendation.vehicle.name}</p>
              <p>${recommendation.license}</p>
              <p>${recommendation.consumption}</p>
              <p>${recommendation.totaldist}</p>
              <p>${recommendation.price}</p>
              <p>${recommendation.name}</p>
              <p>${recommendation.departureLocation.name}</p>
              <p>${recommendation.destinationLocation.name}</p>
              <p>${recommendation.startDate.toDateString()}</p>
              <p>${recommendation.endDate.toDateString()}</p>
              <p>${recommendation.numberOfPeople}</p>
            </div>`;
  });
  $('#recommended-vehicles').html(html);
  // console.log(html);
}

function generateValidVehicles() {
  validVehicles = [];
  vehicles.forEach((vehicle) => {
    const valid =
      numberOfPeople <= vehicle.maxPeople &&
      numberOfPeople >= vehicle.minPeople &&
      vehicle.license.includes(license) &&
      numberOfDays <= vehicle.maxDays &&
      numberOfDays >= vehicle.minDays;

    // console.log(vehicle.name);
    // console.log(
    //   `number of ppl: ${numberOfPeople}, vehicle.maxPeople: ${vehicle.maxPeople}, vehicle.minPeople: ${vehicle.minPeople}, vehicle.minDays: ${vehicle.minDays}, vehicle.maxDays: ${vehicle.maxDays}, vehicle.license: ${vehicle.license}, license: ${license}, numberOfDays: ${numberOfDays}`,
    // );

    if (valid) {
      validVehicles.push({
        vehicle,
        totaldist: totalDistanceKm,
        consumption: (vehicle.consumption * totalDistanceKm) / 100,
        price:
        fx(vehicle.price * numberOfDays,).convert({ from:'NZD', to: currency}),
        name: `${firstName} ${secondName}`,
        numberOfPeople,
        numberOfDays,
        departureLocation,
        destinationLocation,
        license,
        startDate,
        endDate,
      });
    }
  });
  displayRecommendedVehicles(validVehicles);
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
    lng: 176.122,
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
    lat: -43.532,
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

const MS_PER_DAY = 1000 * 60 * 60 * 24;

function getDaysInRange(start, end) {
  if (!end) return 1;
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
  const utc2 = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());

  return Math.floor((utc2 - utc1) / MS_PER_DAY) + 1;
}

function assignUserInputsToVariables() {
  $('#first-name').keyup(() => {
    firstName = $('#first-name').val().trim();
    $('#first-name-output').html(firstName);
  });
  $('#second-name').keyup(() => {
    secondName = $('#second-name').val().trim();
    $('#second-name-output').html(secondName);
  });
  $('#number-of-people').keyup(() => {
    numberOfPeople = Number.parseInt($('#number-of-people').val().trim(), 10);
    $('#number-of-people-output').html(numberOfPeople);
  });
  $('#age').keyup(() => {
    age = Number.parseInt($('#age').val().trim(), 10);
    $('#age-output').html(age);
    // console.log(numberOfPeople);
  });
}

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
    numberOfDays = getDaysInRange(startDate, endDate);
    $('#number-of-days').text(numberOfDays);
  },
};

const wayPoints = [];

let routeControl;

$('#datepicker').flatpickr(dateOptions);

// map

const mapConfig = {
  zoomSnap: 0.2,
};

const map = L.map('mapid', mapConfig).fitBounds(
  L.latLngBounds(
    L.latLng({
      lng: 179.243,
      lat: -33.49,
    }),
    L.latLng({
      lng: 164.924,
      lat: -47.6,
    }),
  ),
);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// map.on('click', (event) => {
//   L.marker(event.latlng).addTo(map);
// });

function setRouting() {
  routeControl.setWaypoints(wayPoints);
}

function departureChange() {
  const city = cities[this.value];
  departureLocation = city;
  wayPoints[0] = {
    lat: city.lat,
    lng: city.lng,
  };
  setRouting();
}

function arrivalChange() {
  const city = cities[this.value];
  destinationLocation = city;
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
    router: L.Routing.mapbox(
      'pk.eyJ1IjoiYW5uYWJlbGEiLCJhIjoiY2txZ2VhNjk2MDQ2bTJ3bnl6NXF2eDFpMyJ9.q1BsrbH_z74eNRr8KJCOJA',
    ),
  });
  routeControl.addTo(map);

  // calculating total distance
  routeControl.on('routesfound', (e) => {
    // console.log('distance');
    // console.log(e.routes[0].summary.totalDistance);
    testDistance = e.routes[0].summary.totalDistance;
    totalDistanceKm = Math.floor(testDistance / 1000);
    $('#length-of-trip-km').text(`${totalDistanceKm}KM`);
  });

  assignUserInputsToVariables();

  $('#number-of-people').blur(validateNumberOfPeople);
  $('#age').blur(validateAge);
  $('#first-name').blur(validateFirstName);
  $('#second-name').blur(validateSecondName);
  $('#license').change(validateLicense);
  $('#currency').change(validateCurrency);
  $('#btn').click(generateValidVehicles);
}
// loop over vehicles
// when correct calculate consumption

init();
