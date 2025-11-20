const inputContianer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dataEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelector('span');

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');


let countdownTitle = "";
let countdownDate = "";
let countdownValue = Date;
let countdownActive;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set Date input Min with Today's date
const today = new Date().toISOString().split('T')[0];
dataEl.setAttribute('min', today);

// Populate Countdown
function updateDOM() 
{
    countdownActive = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownValue - now;

        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);

        // Hide Input 
        inputContianer.hidden = true;

        // If countdown is ended , show complete
        if(distance < 0)
        {
            countdownEl.hidden = true;
            clearInterval(countdownActive);
            completeElInfo.textContent = `${countdownTitle} Finished on ${countdownDate}`;
            completeEl.hidden = false;
        }
        else
        {
            // Else , Show the countdown in progress
            countdownElTitle.textContent = `${countdownTitle}`;
            timeElements[0].textContent = `${days}`;
            timeElements[1].textContent = `${hours}`;
            timeElements[2].textContent = `${minutes}`;
            timeElements[3].textContent = `${seconds}`;
            completeEl.hidden = true;
            countdownEl.hidden = false;
        }
    } , second);
}

// Take Values From FORM INPUT
function updateCountdown(e) 
{
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;

    // Check for Valid Date
    if(countdownDate === '')
    {
        alert('Please Select a Date for Countdown.')
    }
    else
    {
         // Get number version of current Date
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}

// Reset All Values
function reset()
{
    // Hide Countdowns , show Input
    countdownEl.hidden = true;
    completeEl.hidden = true;
    inputContianer.hidden = false;

    // Stop the Countdown
    clearInterval(countdownActive);

    // Reset Values
    countdownTitle = '';
    countdownDate = ''; 
}

// Event Listeners
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click' , reset);
completeBtn.addEventListener('click' , reset);