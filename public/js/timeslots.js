// Get the calendar container
const calendar = document.getElementById('calendar');
const datePicked = document.getElementById('date-picker');
const timeslot = document.getElementById('timeslot');


// Time slots for each day
const schedule = {
  "Monday": { start: 9, end: 18 },
  "Tuesday": { start: 9, end: 18 },
  "Wednesday": { start: 9, end: 18 },
  "Thursday": { start: 9, end: 18 },
  "Friday": { start: 9, end: 18 },
  "Saturday": { start: 11, end: 17 },
  "Sunday": { start: 12, end: 17 }
};


// Get day from date picked
function getDayFromDate(date) {
  const day = new Date(date).toLocaleString('en-us', { weekday: 'long' });
  return day;
}

// Add change event to date pciker
datePicked.addEventListener('change', (e) => {
  const date = e.target.value;
  const day = getDayFromDate(date);
  calendar.innerHTML = '';
  generateTimeSlots(day);
});

// Function to generate time slots with 30-minute intervals for a given day
function generateTimeSlots(day) {
  const { start, end } = schedule[day];

  for (let i = start; i < end; i++) {
    for (let j = 0; j < 60; j += 30) {
      const time = `${String(i).padStart(2, '0')}:${String(j).padStart(2, '0')}`;
      createSlot(time);
    }
  }
}

// Function to create time slots
function createSlot(time) {
  const slot = document.createElement('div');
  slot.className = 'btn btn-primary m-1';
  slot.textContent = time;

  // Add click event to select the time slot
  slot.addEventListener('click', () => {
    timeslot.value = time;
    alert(`You have selected the time: ${time}`);
  });

  calendar.appendChild(slot);
}

// Generate time slots for the current day when the page loads (for example, 'Saturday')
const today = new Date().toLocaleString('en-us', { weekday: 'long' });
generateTimeSlots(today);
