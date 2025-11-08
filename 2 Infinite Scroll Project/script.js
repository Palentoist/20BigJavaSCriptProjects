const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArray = [];

// Unsplash API

const count = 10;
const apiKey = 'HhOqGcqiPoZgzWQ1ZyhlVB33DP8_-DT-buZMNHBIJ88'; 
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Create Elements for Links and Photos
function displayPhotos()
{
    photosArray.forEach((photo) => {
        // Create Anchor Element to link to Unsplash
        const item = document.createElement("a");
        item.setAttribute('href' , photo.links.html);
        item.setAttribute('target' , '_blank');

        // Create an Image For Photo
        const image = document.createElement("img");
        image.setAttribute('src' , photo.urls.regular);
        image.setAttribute('alt' , photo.alt_description);
        image.setAttribute('title' , photo.alt_description);

        // Put image inside the Anchor tag
        item.appendChild(image);
        imageContainer.appendChild(item);
        });
}
// Get Photos From Unsplash API
async function getPhotos()
{
    try
    {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    }
    catch(error)
    {

    }
}
// On Load

getPhotos();