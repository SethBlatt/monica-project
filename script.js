/* 
text input box to input chores.
minute counter input box for how long each chore should take.
time input box for how frequetly each chore should be done.
number box for how many children and text input box for child name.
counter input box for child age (auto assigns random chore to 
random child based on age) 
assign button that creates a table depending on num of children and 
chores input.
font: Comic Sans MS
Colors: Days of the week black, chore list brown.
Child Color: random color per child.
Else color: black.

Once a list of chores are made, one of them is randomly assigned to a child
based on the child's age.
a button that adds the number of children that you input, for example: 
if 5 children,
button produces 5 rows, then input each child, submit to populate random table.
need to include an input box with minimum and maximum age.
Populate first day randomly, then sequence the rest of the month. 
Check mark for chores that are complete.
 You would also need to store this information in a persistent data store so 
 that it can be loaded the next time the calendar is opened.
*/



const numberOfChildrenInput = document.getElementById("number-of-children");
const inputFieldsDiv = document.getElementById("input-fields");
function createChoreInputElements() {

  const numberOfChildren = numberOfChildrenInput.value;

  // Clear any existing input fields
  inputFieldsDiv.innerHTML = "";

  // Add new input fields based on the number of chores
  for (let i = 0; i < numberOfChildren; i++) {
    const choreInput = document.createElement("input");

    choreInput.setAttribute("type", "text");
    choreInput.setAttribute("placeholder", "Chore");

    const minChoreLengthInput = document.createElement("input");
    minChoreLengthInput.setAttribute("type", "number");
    minChoreLengthInput.setAttribute("placeholder", "Minutes to complete");

    const choreFrequencyInput = document.createElement("input");
    choreFrequencyInput.setAttribute("type", "text");
    choreFrequencyInput.setAttribute("list", "options");
    choreFrequencyInput.setAttribute("placeholder", "Frequency");
    const frequencyOptions = document.createElement("datalist");
    frequencyOptions.setAttribute("id", "options");
    frequencyOptions.innerHTML = `
        <option value="1 Time Per Week">
        <option value="2 Times Per Week">
        <option value="3 Times Per Week">
        <option value="4 Times Per Week">
        <option value="5 Times Per Week">
        <option value="6 Times Per Week">
        <option value="Daily">
      `;

    const childNameInput = document.createElement("input");
    childNameInput.setAttribute("type", "text");
    childNameInput.setAttribute("placeholder", "Name of child");

    inputFieldsDiv.appendChild(choreInput);
    inputFieldsDiv.appendChild(minChoreLengthInput);
    inputFieldsDiv.appendChild(choreFrequencyInput);
    inputFieldsDiv.appendChild(frequencyOptions);
    inputFieldsDiv.appendChild(childNameInput);
    inputFieldsDiv.appendChild(document.createElement("br"));
  }
}
numberOfChildrenInput.addEventListener("change", createChoreInputElements);



const submitButton = document.getElementById("submit-button");

function createCalendarEvents() {

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const chores = [];
  const inputFields = inputFieldsDiv.querySelectorAll("input");

  // Extract input values for each chore
  for (let i = 0; i < inputFields.length; i += 4) {
    const chore = {
      name: inputFields[i].value,
      time: parseInt(inputFields[i + 1].value),
      frequency: inputFields[i + 2].value,
      child: inputFields[i + 3].value
    };
    chores.push(chore);

  }


  // Create calendar events for each chore
  const calendarTable = document.querySelector("table");
  const firstDayOfMonth = new Date(year, month, 1);
  let dayOfWeek = firstDayOfMonth.getDay();

  for (const chore of chores) {
    let frequency = parseInt(chore.frequency.charAt(0));

    for (let i = 1; i <= 5; i++) {
      if (dayOfWeek === i && frequency > 0) {
        const choreDate = new Date(year, month, dayOfWeek + (i - 1));
        const choreDay = choreDate.getDate();
        const choreCell = calendarTable.querySelector
          ("td:nth-of-type(" + (choreDay + dayOfWeek - 1) + ")");

        const choreHTML = "<div>" + chore.name + "<br>" + chore.child + "</div>";
        choreCell.innerHTML += choreHTML;

        frequency--;
      }
    }
  }
}

submitButton.addEventListener("click", createCalendarEvents)



const monthNames = ["January", "February", "March", "April", "May",
  "June", "July", "August", "September", "October", "November", "December"];
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
  "Friday", "Saturday"];

function generateCalendarHTML(year, month) {
  // Get the first day of the month
  const firstDay = new Date(year, month, 1);
  // Get the number of days in the month
  const numDays = new Date(year, month + 1, 0).getDate();

  // Start building the table HTML
  let tableHTML = '<table>';


  // Add the day names row
  tableHTML += '<tr>';
  for (let i = 0; i < 7; i++) {
    tableHTML += '<th>' + dayNames[i] + '</th>';
  }
  tableHTML += '</tr>';

  // Add the days of the month
  let day = 1;
  tableHTML += '<tr>';
  for (let i = 0; i < firstDay.getDay(); i++) {
    tableHTML += '<td></td>';
  }
  for (let i = 0; i < numDays; i++) {
    if (day > 31) {
      break;
    }
    if (i > 0 && (i + firstDay.getDay()) % 7 === 0) {
      tableHTML += '</tr><tr>';
    }
    tableHTML += '<td>' + day + '</td>';
    day++;
  }
  for (let i = 0; i < 7 - ((numDays + firstDay.getDay()) % 7); i++) {
    tableHTML += '<td></td>';
  }
  tableHTML += '</tr></table>';

  return tableHTML;
}

// Function to generate the calendar table HTML
function generateCalendarTableHTML(year, month) {
  // Get the calendar HTML
  const calendarHTML = generateCalendarHTML(year, month);

  // Create the table HTML
  let tableHTML = '<table>';

  // Add the month and year header row
  tableHTML += '<tr><th colspan="7">' + monthNames[month] + ' ' + year + '</th></tr>';

  // Add the day names row
  tableHTML += '<tr>';
  for (let i = 0; i < 7; i++) {
    tableHTML += '<th>' + dayNames[i] + '</th>';
  }
  tableHTML += '</tr>';

  // Add the calendar cell
  tableHTML += '<tr><td colspan="7">' + calendarHTML + '</td></tr>';

  // Close the table HTML
  tableHTML += '</table>';

  return tableHTML;
}


const container = document.getElementById('calendar-container');
const now = new Date();
const year = now.getFullYear();
const month = now.getMonth();
const calendarTableHTML = generateCalendarTableHTML(year, month);
container.innerHTML = calendarTableHTML;
