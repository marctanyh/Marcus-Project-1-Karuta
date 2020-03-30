const startButton = document.getElementById("start-button")

const nextButton = document.getElementById("next-button")

const promptContainerElement = document.getElementById("prompt-container")

const promptElement = document.getElementById("prompt")

const responseButtonElement = document.getElementById("response-buttons")

var shuffledPrompt, currentPromtIndex

startButton.addEventListener("click", startGame)

nextButton.addEventListener("click",() => {
  currentPromtIndex++
  setNextPrompt()
})

// Start button function
function startGame(){
  console.log("Started")
  // Hides button after being clicked
  startButton.classList.add("hide")
  // Randomizer for beging question, gives positive or negative number with equal probility 
  shuffledPrompt = prompt.sort(() => Math.random() - .5 )
  currentPromtIndex =  0
  // Shows prompt after being clicked
  promptContainerElement.classList.remove("hide")
  setNextPrompt()
}

// Next button function
function setNextPrompt(){
  resetState()
  showPrompt(shuffledPrompt[currentPromtIndex])

}

function showPrompt(prompt){
  // Uses prompt from prompt array to be the card title
  promptElement.innerText = prompt.prompt
  // Populating button information
  prompt.responses.forEach(response => {
    const button = document.createElement("button")
    // Gets text from responses in the prompt array to use as button text
    button.innerText =  response.text
    button.classList.add("button")
    if (response.correct) {
      button.dataset.correct = response.correct
    }
    button.addEventListener("click", selectResponse)
    responseButtonElement.appendChild(button)
  })

}

// Resets questions to default
function resetState() {
  // Rsets bg color when next button is pressed 
  clearStatusClass(document.body)
  // Hide next button when new prompt is shown
  nextButton.classList.add("hide")
  // Removes children from answer button elements 
  while (responseButtonElement.firstChild){
    responseButtonElement.removeChild
    (responseButtonElement.firstChild)
  }
}

function selectResponse(event){
  const selectedButton = event.target
  // Checks if response is correct
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  // Loops through all questions, need to create an array to use forEach loop
  Array.from(responseButtonElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  // Checks if there are any more promts to go through. If there is the "Next button" shows, if not "Play again shows and starts the game all over"
  if (shuffledPrompt.length > currentPromtIndex + 1 ){
    nextButton.classList.remove("hide")
  } else {
    startButton.innerText = "Play again"
    startButton.classList.remove("hide")
  }
  
}

// Changes button and background to reflect if answers are correct or wrong
function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add("correct")
  } else {
    element.classList.add("wrong")
  }
}

// Resets elemenst
function clearStatusClass(element) {
  element.classList.remove("correct")
  element.classList.remove("wrong")
}

// Promopts and response arrays
const prompt = [
  {
    prompt: '‘To be, or not to be: that is the question’',
    responses: [
      { text: 'Hamlet Act 3, Scene 1', correct: true },
      { text: 'As You Like it Act 2, Scene 7', correct: false },
      { text: 'Romeo and Juliet Act 2, Scene 2', correct: false },
      { text: 'Richard III Act 1, Scene 1', correct: false }
    ]
  },
  {
    prompt: '‘All the world ‘s a stage, and all the men and women merely players. They have their exits and their entrances; And one man in his time plays many parts.’',
    responses: [
      { text: 'Hamlet Act 3, Scene 1', correct: false },
      { text: 'As You Like it Act 2, Scene 7', correct: true },
      { text: 'Romeo and Juliet Act 2, Scene 2', correct: false },
      { text: 'Richard III Act 1, Scene 1', correct: false }
    ]
  },
  {
    prompt: 'Romeo, Romeo! wherefore art thou Romeo?’',
    responses: [
      { text: 'Hamlet Act 3, Scene 1', correct: false },
      { text: 'As You Like it Act 2, Scene 7', correct: false },
      { text: 'Romeo and Juliet Act 2, Scene 2', correct: true },
      { text: 'Richard III Act 1, Scene 1', correct: false }
    ]
  },
  {
    prompt: '‘Now is the winter of our discontent’',
    responses: [
      { text: 'Hamlet Act 3, Scene 1', correct: false },
      { text: 'As You Like it Act 2, Scene 7', correct: false },
      { text: 'Romeo and Juliet Act 2, Scene 2', correct: false },
      { text: 'Richard III Act 1, Scene 1', correct: true }
    ]
  }
]