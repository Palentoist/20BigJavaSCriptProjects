// Get Quotes From API
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes;

// Show Loading
function loading() 
{
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete() 
{
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show New Quote
function newQuote() 
{
    const quote = apiQuotes;
    authorText.textContent = quote.author;
    quoteText.textContent = quote.quote;

    // Long quote styling
    if (quote.quote.length > 50) 
    {
        quoteText.classList.add("long-quote");
    } 
    else 
    {
        quoteText.classList.remove("long-quote");
    }

    complete();
}

// Get Quotes From API
async function getQuotes() 
{
    loading();
    const apiUrl = "https://dummyjson.com/quotes/random";
    try 
    {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } 
    catch (error) 
    {
        console.log("Error fetching quotes:", error);
        complete();
    }
}

// Tweet Quote
function tweetQuote() 
{
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", getQuotes);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuotes();
