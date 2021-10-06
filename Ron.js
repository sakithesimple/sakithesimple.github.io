document.addEventListener("DOMContentLoaded", function () {
    let header = document.querySelector(".card-header");
    let question = document.querySelector(".card-title");
    header.innerHTML = "Question 1";
    question.innerHTML = "Easy ones first- \"She <em>needs</em> to sort out her priorities!\"";
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
    const books = ['Sorcerer\'s Stone', 'Chamber of Secrets', 'Prisoner of Azkaban', 'Goblet of Fire', 'Order of phoenix', 'Half-blood Prince', 'Deathly Hallows']
    const MA = 10;
    const one = [MA, 0, 0, 0, 0, 0, 0]
    const two = [0, MA, 0, 0, 0, 0, 0]
    const three = [0, 0, MA, 0, 0, 0, 0]
    const four = [0, 0, 0, MA, 0, 0, 0]
    const five = [0, 0, 0, 0, MA, 0, 0]
    const six = [0, 0, 0, 0, 0, MA, 0]
    const seven = [0, 0, 0, 0, 0, 0, MA]
    questions.push(new Question("Easy ones first- \"She <em>needs</em> to sort out her priorities!\"", books, null, one, ""));
    questions.push(new Question("\"She <em>needs</em> to sort out her priorities!\"<br>About whom?", [], 'name', ['hermione'], ""));
    questions.push(new Question("\"It's beautiful, isn't it, the moon&#128525;\"", books, null, six, ""));
    questions.push(new Question("\"It's beautiful, isn't it, the moon&#128525;\"<br> To whom?", [], 'name', ['harry'], ""));
    questions.push(new Question("\"why spiders? why can't it be follow the butterflies!?\"", books, null, two, ""));
    questions.push(new Question("\"why spiders? why can't it be follow the butterflies!?\"<br>To whom?", [], 'name', ['harry'], ""));
    questions.push(new Question("\"You look dreadful, Ron!\"<br>This one's TO Ron", books, null, six, ""));
    questions.push(new Question("\"You look dreadful, Ron!\"<br>And who was so rude!", [], 'name', ['luna', 'lovegood'], ""));
    questions.push(new Question("\"Spiders, spiders, they want me  to tap dance, I don't wanna tap dance!\"", books, null, three, ""));
    questions.push(new Question("\"You tell 'em, Ron!\"<br>Who's so chill?", [], 'name', ['harry'], ""));
    questions.push(new Question("\"Percy wouldn’t recognize a joke if it danced naked in front of him wearing dobby’s tea cozy!\"", books, null, four, ""));
    questions.push(new Question("\"Percy wouldn’t recognize a joke if it danced naked in front of him wearing dobby’s tea cozy!\"<br>To whom?", [], 'name', ['hermione'], ""));
    questions.push(new Question("\"I Want To Fix That In My Memory Forever.\"", books, null, four, ""));
    questions.push(new Question("\"I Want To Fix That In My Memory Forever.\"<br>What\s he talking about?", [], 'name', ['draco', 'malfoy', 'ferret'], ""));
    questions.push(new Question("\"Those Muggle Nutters That Cut People Up?\"", books, null, five, ""));
    questions.push(new Question("\"Those Muggle Nutters That Cut People Up?\"<br>About whom?", [], 'name', ['doctor'], ""));
    questions.push(new Question("\"Excuse me, are you the imprint of a departed soul?\"", books, null, six, ""));
    questions.push(new Question("\"Excuse me, are you the imprint of a departed soul?\"<br>To whom?", [], 'name', ['snape', 'severus'], ""));
    questions.push(new Question("\"It's me, I'm extremely famous.\"", books, null, seven, "./images/glasses.gif"));
    questions.push(new Question("\"It's me, I'm extremely famous.\"<br>To whom?<br>About whom?", [], 'name', ['hermione'], ""));
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
            if (score >= 100) {
                result = "Are you in love with Ron? Score: " + score.toString() + "!";
                //imgsrc = "./images/trio.jpg";
                imgsrc = 10;
            }
            else if (score >= 80) {
                result = "Wicked! Score: " + score.toString();
                //imgsrc = "./images/brilliant.gif";
                imgsrc = 12;
            }
            else if (score > 50) {
                result = "Impressive! Score: " + score.toString() + "!";
                //imgsrc = "./images/da.jpg";
                imgsrc = 11;
            }
            else if (score > 35) {
                result = "You heard some... Score: " + score.toString();
                //imgsrc = "./images/mental.gif";
                imgsrc = 13;
            }
            else {
                result = "BlOOody HElL!! Score: " + score.toString() + "!";
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
