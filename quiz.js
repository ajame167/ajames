let startTime = Date.now();

let timeLeft = 600;

const timer = setInterval(() => {

    let min = Math.floor(timeLeft / 60);
    let sec = timeLeft % 60;

    document.getElementById("countdown").textContent =
        `${min}:${sec.toString().padStart(2, '0')}`;

    timeLeft--;

    if (timeLeft < 0) {
        clearInterval(timer);
        document.getElementById("quizForm").requestSubmit();
    }

}, 1000);

document.getElementById("quizForm")
.addEventListener("submit", function(e){

    e.preventDefault();

    let score = 0;

    let feedback = "";

    const answers = {
        q1: "hypertext markup language",
        q2: "cascading style sheets",
        q3: "c",
        q4: "c",
        q5: "b",
        q7: ".css",
        q8: "#",
        q9: "script",
        q10: "console.log"
    };

    // Q1
    let q1 = document.getElementById("q1").value.toLowerCase().trim();
    if(q1 === answers.q1){
        score++;
        feedback += "<p class='correct'>Q1 Correct</p>";
    } else {
        feedback += "<p class='incorrect'>Q1 Incorrect. Answer: HyperText Markup Language</p>";
    }

    // Q2
    let q2 = document.getElementById("q2").value.toLowerCase().trim();
    if(q2 === answers.q2){
        score++;
        feedback += "<p class='correct'>Q2 Correct</p>";
    } else {
        feedback += "<p class='incorrect'>Q2 Incorrect. Answer: Cascading Style Sheets</p>";
    }

    // Radio Questions
    ["q3","q4","q5","q8","q10"].forEach(question=>{
        let choice = document.querySelector(
            `input[name="${question}"]:checked`
        );

        if(choice && choice.value === answers[question]){
            score++;
            feedback += `<p class='correct'>${question.toUpperCase()} Correct</p>`;
        } else {
            feedback += `<p class='incorrect'>${question.toUpperCase()} Incorrect</p>`;
        }
    });

    // Multi Select Question
    let selected = [...document.querySelectorAll(
        'input[name="q6"]:checked'
    )].map(cb=>cb.value);

    let correct = ["header","section","article"];

    if(selected.length===3 &&
       correct.every(v=>selected.includes(v))){

        score++;
        feedback +=
        "<p class='correct'>Q6 Correct</p>";
    }
    else{
        feedback +=
        "<p class='incorrect'>Q6 Incorrect. Answer: Header, Section, Article</p>";
    }

    // Select
    let q7 = document.getElementById("q7").value;

    if(q7 === answers.q7){
        score++;
        feedback += "<p class='correct'>Q7 Correct</p>";
    }
    else{
        feedback +=
        "<p class='incorrect'>Q7 Incorrect. Answer: .css</p>";
    }

    // Q9
    let q9 = document.getElementById("q9").value
                .toLowerCase().trim();

    if(q9 === answers.q9){
        score++;
        feedback += "<p class='correct'>Q9 Correct</p>";
    }
    else{
        feedback +=
        "<p class='incorrect'>Q9 Incorrect. Answer: script</p>";
    }

    let elapsed =
        Math.floor((Date.now() - startTime) / 1000);

    let minutes =
        Math.floor(elapsed / 60);

    let seconds =
        elapsed % 60;

    let result =
        score >= 7 ? "PASS" : "FAIL";

    let resultClass =
        score >= 7 ? "pass" : "fail";

    document.getElementById("results").innerHTML =
    `
    <h2 class="${resultClass}">
        ${result}
    </h2>

    <h3>Total Score: ${score}/10</h3>

    <h3>Time Spent:
        ${minutes}m ${seconds}s
    </h3>

    ${feedback}
    `;

    clearInterval(timer);

});