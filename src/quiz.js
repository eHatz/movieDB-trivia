//this quiz randomly pick a movie from the the actor's list, randomly selects a question to ask about the movie
//and then randomly selects 2 other movies to add as incorrect answer choices

var actor = 'Brad Pitt';
var correctIndex;
var incorrIndex1;
var incorrIndex2;

//make sure the options are all different
function answerChoices() {
	if (correctIndex === undefined) {
		correctIndex = Math.floor(Math.random() * movies.length);
	};

	if (incorrIndex1 === undefined || incorrIndex1 === correctIndex) {
		incorrIndex1 = Math.floor(Math.random() * movies.length);
		return answerChoices();
	} else if (incorrIndex2 === undefined || incorrIndex2 === correctIndex || incorrIndex1 === incorrIndex2) {
		incorrIndex2 = Math.floor(Math.random() * movies.length);
		return answerChoices();
	};
	var choices = [incorrIndex1, incorrIndex2];
	var shuffleAnswer = Math.floor(Math.random() * 3);
	choices.splice(shuffleAnswer, 0, correctIndex);
	return choices;
};

function createQuestion() {
	var choiceIndexes = answerChoices();
	var answerIndex = correctIndex;
	//3 questions will be selected randomly
	var questions =[
		{
			question: 'Which of '+ actor +'\'s movies is this image from?',
			image: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + movies[correctIndex].backdrop_path,
			answerType: 'Title'
		}, 
		{
			question: 'Based on the description, what is the title of this movie?',
			description: movies[correctIndex].overview,
			answerType: 'Title'
		},
		{
			question: 'What year was '+ actor + '\'s ' + movies[correctIndex].original_title +' released?',
			answerType: 'movieYear'
		}
	];
	//pick random question
	var questionIndex = Math.floor(Math.random() * questions.length);
	var answersArr = [];
	var correctAnswer;
	//gets correct information for answer choices based on question
	if (questions[questionIndex].answerType === 'Title') {
		for (var i = 0; i < choiceIndexes.length; i++) {
			answersArr.push(movies[choiceIndexes[i]].original_title);
		};
		correctAnswer = movies[answerIndex].original_title;
	} else if (questions[questionIndex].answerType === 'movieYear') {
		for (var i = 0; i < choiceIndexes.length; i++) {
			answersArr.push(movies[choiceIndexes[i]].release_date.slice(0,4));
		};
		correctAnswer = movies[answerIndex].release_date.slice(0,4);
	};
	//if there is an image in the question add to the page
	if (questions[questionIndex].image) {
		$('#question').html(questions[questionIndex].question);
		var img = $('<img></img>');
		img.attr('src', questions[questionIndex].image);
		$('#description').html(img);
		for (var i = 0; i < answersArr.length; i++) {
			$('#answerBtn'+ (i+1)).html(answersArr[i]);
			$('#answerBtn'+ (i+1)).attr('value', answersArr[i]);
		};
		//if there is a description for the question add it to the page
	} else if(questions[questionIndex].description) {
		$('#question').html(questions[questionIndex].question);
		$('#description').html(questions[questionIndex].description);
		for (var i = 0; i < answersArr.length; i++) {
			$('#answerBtn'+ (i+1)).html(answersArr[i]);
			$('#answerBtn'+ (i+1)).attr('value', answersArr[i]);
		};
	} else {
		$('#question').html(questions[questionIndex].question)
		for (var i = 0; i < answersArr.length; i++) {
			$('#answerBtn'+ (i+1)).html(answersArr[i]);
			$('#answerBtn'+ (i+1)).attr('value', answersArr[i]);
		};
	};

//check answer submission
$('.answerBtn').click(function() {
	if (this.value === correctAnswer) {
		$('#question').html('Correct!').attr('class', 'correct');
		$('.answerChoices').css('display', 'none');
		$('#replay').css('display', 'inherit');
	} else {
		$('#question').html('Incorrect! The answer was: ' + correctAnswer).attr('class', 'incorrect');
		$('.answerChoices').css('display', 'none');
		$('#replay').css('display', 'inherit');
	}
})
};

//play again button/reset game
$('#playAgain').click(function() {
	correctIndex = undefined;
	incorrIndex1 = undefined;
	incorrIndex2 = undefined;
	$('#question').attr('class', '');
	$('#description').html('');
	$('.answerChoices').css('display', 'inherit');
	$('#replay').css('display', 'none');
	createQuestion();
})
createQuestion();