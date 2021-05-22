document.addEventListener("DOMContentLoaded", function () {
    let header = document.querySelector(".card-header");
    let question = document.querySelector(".card-title");
    header.innerHTML = "Question 1";
    question.innerHTML = "Harry breaks his glasses a lot (like a LOT). How do you fix it?";
    textarea = document.querySelector("textarea.form-control");
    submitButton = document.querySelector("#submit")
    choices = document.querySelectorAll(".btn-secondary");
    images = document.querySelectorAll(".card-img-top");
    for (let i = 0; i < choices.length; i++) {
        choices[i].style.display = "none";
    }
    for (let i = 1; i < images.length; i++) {
        images[i].style.display = "none";
    }
    let qno = 1;
    let score = 0;
    let answer;
    questions = [];
    questions.push(new Question("Harry breaks his glasses a lot (like a LOT). How do you fix it?", [], "oculus reparo", [10, 0], "./images/glasses.gif"));
    questions.push(new Question("Do you like quidditch?", ["Do I-!... You should see my bedroom wall &#128584;", "Soccer is better", "I play for Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"], null, [15, -5, 15, 5, 0, -10], "./images/quidditch-bedroom.png"));
    questions.push(new Question("Are you-", ["muggle", "squib", "muggle-born", "half-blood", "pure-blood", "elf"], null, [0, 0, 5, 5, 0, 0], "./images/black-family-tree.png"));
    questions.push(new Question("Harry also gets his nose bled a lot. You're up! How do you make him <em>exceptionally ordinary</em>?", [], "episkey", [10, 0], "./images/exceptionally-ordinary.gif"));
    questions.push(new Question("Are you-", ["a Death Eater", "an Order of the Phoenix", "a double agent", "with the Ministry", "humbly below those ranks"], null, [-15, 10, 5, 0, 5], "./images/death-eaters.jpg"));
    questions.push(new Question("It's the 31st of July &#127881; What have you got for the party?", ["a bunch of dung-bombs", "Nimbus-2001", "a cursed necklace", "The Monster Book of Monsters", "What party?!"], null, [5, 10, -10, 0, -5], "./images/neville-booked.gif"));
    questions.push(new Question("Is divination real?", ["as real as Voldy's nose &#128513;", "I mean, it's better than knowing nothing", "divination eats physics for breakfast and chemistry for lunch!"], null, [10, 0, -5], "./images/divination.jpg"));
    questions.push(new Question("If you had the Elder Wand you would-", ["fight dark wizards with it", "make a fortune", "give it to your best friend", "curse Harry", "snap it"], null, [10, 0, 5, -10, 15], "./images/elder-wand.jpg"));
    questions.push(new Question("Have you ever hit umbridge with a Filibuster's or Weasleys'? &#127878;", ["Yours truly, yes &#128522;", "No, but I cheered", "Why would you do that!"], null, [15, 5, -10], "./images/flitwick-yes.gif"))
    questions.push(new Question("Name all 7 horcruxes of Voldemort", [], "too complicated", [-10, 0, 2, 4, 6, 8, 11, 15], "./images/horcruxes.jpg"));
    function nextQuestion() {
        score += questions[qno - 1].mark(answer);
        if (qno < questions.length) {
            newQuestion = questions[qno];
            question.innerHTML = newQuestion.question;
            images[qno - 1].style.display = "none";
            if (newQuestion.rightAnswer != null) {
                textarea.style.display = "block";
                submitButton.style.display = "block";
                for (let i = 0; i < choices.length; i++) {
                    choices[i].style.display = "none";
                }
            }
            else {
                textarea.style.display = "none";
                submitButton.style.display = "none";
                for (let i = 0; i < newQuestion.choices.length; i++) {
                    choices[i].style.display = "block";
                    choices[i].innerHTML = newQuestion.choices[i];
                }
                for (let i = newQuestion.choices.length; i < choices.length; i++) {
                    choices[i].style.display = "none";
                }
            }
            qno++;
            images[qno - 1].style.display = "block";
            header.innerHTML = `Question ${qno}`;
        }
        else if (qno == questions.length) {
            images[qno - 1].style.display = "none";
            let result, imgsrc;
            if (score >= 105) {
                result = "The golden trio needs to make room for one more member - you, Harry, Ron and Hermione - The Golden Four!";
                //imgsrc = "./images/trio.jpg";
                imgsrc = 10;
            }
            else if (score > 40) {
                result = "You are definitely getting invited to Dumbledore's Army!";
                //imgsrc = "./images/da.jpg";
                imgsrc = 11;
            }
            else if (score > 0) {
                result = "I mean, Harry doesn't mind you";
                //imgsrc = "./images/brilliant.gif";
                imgsrc = 12;
            }
            else if (score > -20) {
                result = "You and Harry just won't be friends";
                //imgsrc = "./images/mental.gif";
                imgsrc = 13;
            }
            else if (score > -60) {
                result = "Grab your wand tight if you ever meet Harry, cuz you're sure to get an <em>Expelliarmus</em> cast your way!"
                //imgsrc = "./images/expelliarmus.gif";
                imgsrc = 14;
            }
            else {
                result = "You give You-Know-Who a run for the top-spot on Harry's loathing list!!!";
                //imgsrc = "./images/together.jpg";
                imgsrc = 15;
            }
            question.innerHTML = result;
            images[imgsrc].style.display = "block";
            header.style.display = "none";
            textarea.style.display = "none";
            submitButton.style.display = "none";
            let cardBody = document.querySelector(".card-body");
            cardBody.style.position = "absolute";
            cardBody.style.width = "100%"
            question.style.textAlign = "center";
            question.style.fontSize = "xx-large";
            question.style.color = "antiquewhite";
        }
    }
    for (let i = 0; i < choices.length; i++) {
        choices[i].addEventListener("click", function () {
            answer = i;
            nextQuestion();
        });
    }
    submitButton.addEventListener("click", function () {
        answer = textarea.value;
        textarea.value = "";
        nextQuestion();
    });
});
