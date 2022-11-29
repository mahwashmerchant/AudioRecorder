
# AudioRecorder

## Tech Stack Used
I used React JS and Bootstrap (for responsiveness) to develop the Frontend because I was most comfortable with it after doing a course on freecodecamp.org.

## Overview of Implementation
The assignment brief required a webpage which would record user audio, process it for grammatical correction at the backend and send it back to frontend to be played back for the user. As I was only focusing on the frontend, I decided to simulate the backend processing using a timer and added a toast (informing the user that their audio is being processed for correction). After the timer is over, the audio (copied version of the original) is available for playback on the large green Play button.
There are three buttons (Record, Stop and Play) which allow the user to start recording, stop recording and playback the recording respectively. Another Play button at the bottom allows playback of the supposed corrected (not implemented yet) audio file.
Due to time constraints, I have kept this web app minimal yet functional.

## How to Run the Project
To run the project, first run the following command:
` npm install`
This will install your required node packages.
Next run:
`npm start`
This will run the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.