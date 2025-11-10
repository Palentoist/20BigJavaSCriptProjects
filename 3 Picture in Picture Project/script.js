const videoElement = document.getElementById("video");
const button = document.getElementById("button");

// Prompt User to Select a Media Stream and Pass that to Viedo element

async function selectMediaStream()
{
    try
    {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream;
        videoElement.onloadedmetadata = () =>{
            videoElement.play();
        }
    }
    catch(error)
    {
        // Catch Errors Here
        console.log("Error here : " , error);
    }
}

button.addEventListener('click', async () => {
    // Disable Button
    button.disabled = true;

    // Start Picture in Picture
    await videoElement.requestPictureInPicture();

    // Reset Button
    button.disabled = false;

})

selectMediaStream();