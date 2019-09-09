var triviaQuestions = [{
	question: "What was Biggie's first hit single?",
	answerList: ["IceIceBaby", "Juicy", "StraightOuttaCompton", "Last Christmas"],
	answer: 1
},{
	question: "Who is the richest rapper alive worth over a billion dollars?",
	answerList: ["Kurtis Blow", "Lil Wayne", "Jay-Z", "Tekashi 69"],
	answer: 2
},{
	question: "Which rap song was the first to reach top 40 on Billboard?",
	answerList: ["The Message", "Rapper's Delight", "The Electric Slide", "Aint No Half Steppin"],
	answer: 1
},{
	question: "Which rapper plays a detective on Law and Order SVU?",
	answerList: ["Ice Cube", "Vanilla Ice", "Ice-T", "Ice Coffee"],
	answer: 2
},{
	question: "What rapper's real name is Marshall Mathers",
	answerList: ["Eminem", "Uncle Luke", "Flavor Flav", "Lil Yachty"],
	answer: 0
},{
	question: "What rapper is a member of Outkast",
	answerList: ["Andre 3000", "Method Man", "Busta Rhymes", "Chingy"],
	answer: 0
},{
	question: "Which rapper is not a member of the Wu-tang Clan?",
	answerList: ["ODB", "Method Man", "Ghostface Killah", "Coolio"],
	answer: 3
},{
	question: "Which rapper starred in the movie Above The Rim?",
	answerList: ["Juelz Santana", "Master P", "Lil Kim","Tupac"],
	answer: 3
},{
	question: "Which rapper has hos in different area codes?",
	answerList: ["Ludacris", "Will Smith", "Eminem", "Nicki Minaj"],
	answer: 0
},{
	question: "Which rapper voiced the Reptar wagon in The Rugrats Movie?",
	answerList: ["Busta Rhymes", "MC Lyte", "Paul Wall", "Kwame"],
	answer: 0
},{
	question: "Which rapper advises you to stop drop shut em down and open up shop?",
	answerList: ["Noriega", "DMX", "Rich Homie Quan", "J Cole"],
	answer: 1
},{
	question: "Which rapper played Jimmy on Degrassi?",
	answerList: ["Drake", "Lil Jon", "Lil Scrappy", "Project Pat"],
	answer: 0
},{
	question: "Which rapper had a swimming pool full of liquor then they dived in it?",
	answerList: ["Kanye West", "Fabolous", "Fat Joe", "Kendrick Lamar"],
	answer: 3
},{
	question: "Which rapper had an album called The Chronic?",
	answerList: ["Dr.Dre", "Dr.Seuss", "Dr.OZ", "Wiz Khalifa"],
	answer: 0
},{
	question: "'Which rapper speaks with a British accent?",
	answerList: ["Bizzy Bone", "Slick Rick", "Da Baby", "21 Savage"],
	answer: 1
}];

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 'question13','question14','question15'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Foshizzel Dizzel you got the answer right!",
	incorrect: "Nah, that's not it.",
	endTime: "Outta time!",
	finished: "Word!How did you do Playa?."
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}
