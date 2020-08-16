const successMessage = { status: 'success' };
const errorMessage = { status: 'error' };
const status = {
  success: 200,
  error: 500,
  notfound: 404,
  unauthorized: 401,
  conflict: 409,
  created: 201,
  bad: 400,
  nocontent: 204,
};

const conjuction = 'at|this'
const numbs = '[1-9]|am|pm' 
const days  = '((mon|tues|wed(nes)?|thur(s)?|fri|sat(ur)?|sun)(day)?)'
const day = 'monday|tuesday|wednesday|thrusday|friday|saturday|sunday'
const times = 'today|tomorrow|next week|next month'  
const daysNumb = {
  'sunday' : 7,
  'monday' : 1,
  'tuesday' : 2,
  'wednesday': 3,
  'thursday' : 4,
  'friday' : 5,
  'saturday' : 6
}

const locationFilter = `${conjuction}|${numbs}|${days}|${times}` 
const timeFilter =`[1-9]?(am)|[1-9]?(pm)`
const eventFilter = `${day}|${times}` 

module.exports =  {
  successMessage,
  errorMessage,
  status,
  locationFilter,
  timeFilter,
  eventFilter,
  daysNumb
};