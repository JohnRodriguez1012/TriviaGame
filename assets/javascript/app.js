alert("Alright! Are you ready for some trivia? Just click start to begin!");

// global variables
var intervalId;
var questionCounter = 0;
var answeredCorrectly = 0;
var incorrectlyAnswered = 0;
var skippedQuestion = 0;
var currentQuestion;
var audioElement = document.createElement("audio");


//questions and objects
var allQuestions = [
	{
		question: "Cash Rules Everything Around Me (C.R.E.A.M) Get the money! Dolla dolla bill y'all",
		answer1: "Dr. Dre",
		answer2: "Wale",
		answer3: "Wu Tang Clan",
		answer4: "Jay-Z",
		correctAnswer: "Wu Tang Clan",
		correctInfo: "THAT'S RIGHT! You'd probably survive the 36th Chamber of Death, kid."
	},
	{
		question: "Are we gonna let the elevator bring us down? Oh, no! Let's go!",
		answer1: "Michael Jackson",
		answer2: "Prince",
		answer3: "Bruno Mars",
		answer4: "Miguel",
		correctAnswer: "Prince",
		correctInfo: "WOOOOOOOOO! Get yourself a little red corvette!"
	},
	{
		question: "Guess who just came back today? Them wild-eyed boys that'd been away",
		answer1: "Thin Lizzy",
		answer2: "AC/DC",
		answer3: "Lynryd Skynyrd",
		answer4: "The Styx",
		correctAnswer: "Thin Lizzy",
		correctInfo: "You're right...I can't think of a pun for Thin Lizzy...ON TO THE NEXT ONE!"
	},
	{
		question: "Hey, I put some new shoes on and suddenly everything is right",
		answer1: "Amos Lee",
		answer2: "Jason Mraz",
		answer3: "Paolo Nutini",
		answer4: "John Mayer",
		correctAnswer: "Paolo Nutini",
		correctInfo: "Good choice! You knew something that I really expected you to get wrong`."
	},
	{
		question: "So, here we go now! Holla if ya hear though, come and here me flow",
		answer1: "Lords of the Underground",
		answer2: "Positive K",
		answer3: "LL Cool J",
		answer4: "Naughty By Nature",
		correctAnswer: "Naughty By Nature",
		correctInfo: "I would have been pretty sad if you got this wrong"
	},
	{
		question: "Ride with the mob, Alhamdulillah. Check in with me and do your job. ",
		answer1: "Three 6 Mafia",
		answer2: "A$ap Ferg",
		answer3: "Trap Lord",
		answer4: "Lil Jon",
		correctAnswer: "A$ap Ferg",
		correctInfo: "Oh snap crackle pop! You know the difference between the original and the new song that sampled the beat!"
	},
	{
		question: "We're so bad we know we're good. Blowin' your mind like we knew we would. You know we're struttin' for fun. Struttin' our stuff for everyone.",
		answer1: "The Chicago Bears",
		answer2: "Run DMC",
		answer3: "Sir Mix A Lot",
		answer4: "Kool and the Gang",
		correctAnswer: "The Chicago Bears",
		correctInfo: "Yeah, an actual football team made a rap song. I have hope for my career"
	},
	{
		question: "Gravity is working against me and gravity wants to bring me down",
		answer1: "Jason Mraz",
		answer2: "Dave Matthews Band",
		answer3: "John Mayer",
		answer4: "Anderson Paak",
		correctAnswer: "John Mayer",
		correctInfo: "This was one of the six John Mayer songs I knew."

	},
	{
		question: "I need a dollar dollar, a dollar is what I need",
		answer1: "Maxwell",
		answer2: "Aloe Blacc",
		answer3: "SoMo",
		answer4: "Justin Timberlake",
		correctAnswer: "Aloe Blacc",
		correctInfo: "This is the theme song of every college grad when paying student loans"
	},
	{
		question: "I said a hip hop the hippie the hippie To the hip hip hop and you don't stop The rock it to the bang bang boogie Say up jump the boogie to the rhythm of the boogie, the beat",
		answer1: "Kurtis Blow",
		answer2: "Grandmaster Flash",
		answer3: "DJ Jazzy Jeff & The Fresh Prince",
		answer4: "Sugarhill Gang",
		correctAnswer: "Sugarhill Gang",
		correctInfo: "Just try saying that 5 times fast."
	},
];		

var questionsLength = allQuestions.length;


// Function called for questions answered correctly.  
/*Hides all buttons 
Displays info on the correct guess 
Adds to the counter 
Checks to see if max number off questions has been reached If questCounter == questionsLength, then the game if over and endScreen() is called. 
If not, then a new questions is displayed.*/
function correctAnswer(){
	$('.button').off("click");
	$('.answer-buttons').hide();
	$('.question').text(allQuestions[questionCounter].correctInfo);
	questionCounter++;
	answeredCorrectly++;
	clearInterval(intervalId);
	if ( questionCounter == questionsLength){  
		setTimeout(endScreen, 1000 * 5);
	} else {
		setTimeout(displayQuestion, 1000 * 5);
	}
}

// Function call for questions answered incorrectly.  
/*Hides all buttons
Show c'mon fam, 
adds to counters
checks to see if max number off questions has been reached.  If questCounter == questionsLength, then the game if over and endScreen() is called.  
If not, then a new questions */
function wrongAnswer(){
	$('.button').off("click");
	$('.answer-buttons').hide();
	$('.question').text("C'mon fam!").css({"color" : "red", "font-size" : "5em"});
	questionCounter++;
	incorrectlyAnswered++
	clearInterval(intervalId);
	if ( questionCounter == questionsLength){
		setTimeout(endScreen, 1000 * 3);
	} else {
		setTimeout(displayQuestion, 1000 * 3);
	}
	
}

// Function that is called when the 11second timer runs out.  Hides buttons, displays "Time's Up!", increments the appropriate counters, and checks to see if max number off questions has been reached.  If questCounter == questionsLength, then the game if over and endScreen() is called.  If not, then a new questions is displayed.
function noTime(){
	$('.button').off("click");
	$('.question').text("Did you forget to answer?!?").css({"color" : "red", "font-size" : "5em"});
	$('.answer-buttons').hide();
	questionCounter++;
	skippedQuestion++
	clearInterval(intervalId);
	if ( questionCounter == questionsLength){
		setTimeout(endScreen, 1000 * 2);
	} else {
		setTimeout(displayQuestion, 1000 * 2);
	}
}


//Function that is called when all questions have been answered.  
/*Plays sweet theme
displays scores
If they play again, everything reset
Music stops
first questions is displayed */
function endScreen(){
	audioElement.setAttribute("src", "assets/theme.mp3");
    audioElement.play();
	$('.answer-buttons').show();
	$('.question').text("How did you do!").css({"color" : "white", "font-size" : "3em"});
	$('.answer-1').text("Oh yeah! Look what you got right: " + answeredCorrectly );
	$('.answer-2').text("So close yet so far: " + incorrectlyAnswered );
	$('.answer-3').text("Let's see how many free points your left: " + skippedQuestion );
	$('.answer-4').text(" Click Here To Play Again");
	$('.answer-4').on("click", function(){
		audioElement.pause();
		gameReset();
		displayQuestion();
 	});

}


//function called if the user clicks "play again" on the end screen.  Resets all pertinent variable to 0
function gameReset() {
	 questionCounter = 0;
	 answeredCorrectly = 0;
	 incorrectlyAnswered = 0;
	 skippedQuestion = 0;

	 return questionCounter;
	 return answeredCorrectly;
	 return incorrectlyAnswered;
	 return skippedQuestion;
}


//function that displays the timer and the current question
function displayQuestion() {
	
	var timer = 11;
	//decrease timer and display it on screen in the timer div
	intervalId = setInterval(decrement, 1000);
	function decrement() {
      timer--;
      $(".timer").html(timer);
      // if the timer reaches 0, call noTime()
      if (timer === 0) {
      	noTime();
      }
  	}
   	
   	//added this as it seemed like the previous click was getting carried over
	$('.button').off("click"); 
	//display and style the current question
	$('.question').text(allQuestions[questionCounter].question).css({"color" : "white", "font-size" : "3em", "border" : ""});
	//show all the buttons and their answers
	$('.answer-buttons').show();
	$('.answer-1').text(allQuestions[questionCounter].answer1);
	$('.answer-2').text(allQuestions[questionCounter].answer2);
	$('.answer-3').text(allQuestions[questionCounter].answer3);
	$('.answer-4').text(allQuestions[questionCounter].answer4);
	//display correctAnswer() or wrongAnswer() depending on if the text for the button clicked matches the value of the correctAnswer
	$('.button').on("click", function(){
	 	if ($(this).text() == allQuestions[questionCounter].correctAnswer){
	 		correctAnswer();
	 	} else {
	 		wrongAnswer();
	 	}
 	});
}

//display the start screen and display a questions once the button is clicked
$(document).ready(function() {
	$('.answer-1').text("Click Here To Start!");
	$('.answer-2').hide();
	$('.answer-3').hide();
	$('.answer-4').hide();
	$('.button').on("click", function(){
		$('.answer-2').show();
		$('.answer-3').show();
		$('.answer-4').show();
		displayQuestion();
	});
});