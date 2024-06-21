const quizData = [
    {
        question: "Quem é o protagonista da série?",
        answers: [
            { text: "Eric Effiong", correct: false },
            { text: "Otis Milburn", correct: true },
            { text: "Maeve Wiley", correct: false },
            { text: "Jean Milburn", correct: false }
        ]
    },
    {
        question: "Qual é o nome da mãe de Otis?",
        answers: [
            { text: "Jean", correct: true },
            { text: "Emma", correct: false },
            { text: "Maureen", correct: false },
            { text: "Emily", correct: false }
        ]
    },
    {
        question: "Qual personagem é conhecido por dar conselhos sexuais aos colegas?",
        answers: [
            { text: "Maeve Wiley", correct: false },
            { text: "Jean Milburn", correct: false },
            { text: "Otis Milburn", correct: true },
            { text: "Adam Groff", correct: false }
        ]
    },
    {
        question: "Quem é o melhor amigo de Otis?",
        answers: [
            { text: "Adam Groff", correct: false },
            { text: "Eric Effiong", correct: true },
            { text: "Jackson Marchetti", correct: false },
            { text: "Ruby Matthews", correct: false }
        ]
    },
    {
        question: "Onde Maeve mora?",
        answers: [
            { text: "Com os pais", correct: false },
            { text: "Sozinha em um trailer", correct: true },
            { text: "Com a avó", correct: false },
            { text: "Na escola", correct: false }
        ]
    },
    {
        question: "Qual é a profissão da mãe de Otis?",
        answers: [
            { text: "Professora", correct: false },
            { text: "Médica", correct: false },
            { text: "Psicoterapeuta", correct: true },
            { text: "Advogada", correct: false }
        ]
    },
    {
        question: "Qual é o nome da escola onde a série se passa?",
        answers: [
            { text: "Moordale Secondary School", correct: true },
            { text: "Riverdale High School", correct: false },
            { text: "Springfield Elementary", correct: false },
            { text: "Hill Valley High", correct: false }
        ]
    },
    {
        question: "Quem é a diretora da escola no início da série?",
        answers: [
            { text: "Jean Milburn", correct: false },
            { text: "Hope Haddon", correct: false },
            { text: "Emily Sands", correct: false },
            { text: "Michael Groff", correct: true }
        ]
    },
    {
        question: "Quem Otis começa a namorar na segunda temporada?",
        answers: [
            { text: "Maeve Wiley", correct: false },
            { text: "Ruby Matthews", correct: false },
            { text: "Ola Nyman", correct: true },
            { text: "Lily Iglehart", correct: false }
        ]
    },
    {
        question: "Qual personagem trabalha na lanchonete da escola?",
        answers: [
            { text: "Otis Milburn", correct: false },
            { text: "Maeve Wiley", correct: true },
            { text: "Jackson Marchetti", correct: false },
            { text: "Eric Effiong", correct: false }
        ]
    },
    {
        question: "Qual é o hobby de Lily Iglehart?",
        answers: [
            { text: "Desenhar quadrinhos eróticos", correct: true },
            { text: "Tocar violino", correct: false },
            { text: "Escrever poesia", correct: false },
            { text: "Dançar balé", correct: false }
        ]
    },
    {
        question: "Quem é o pai de Ola?",
        answers: [
            { text: "Jakob", correct: true },
            { text: "Michael", correct: false },
            { text: "Remi", correct: false },
            { text: "Colin", correct: false }
        ]
    },
    {
        question: "Por que Maeve procura Otis no início da série?",
        answers: [
            { text: "Para pedir ajuda com seus estudos", correct: false },
            { text: "Para convencê-lo a abrir uma clínica de terapia sexual", correct: true },
            { text: "Para ser seu amigo", correct: false },
            { text: "Para pedir conselhos amorosos", correct: false }
        ]
    },
    {
        question: "Qual é a relação de Maeve com seu irmão?",
        answers: [
            { text: "Eles são muito próximos", correct: false },
            { text: "Ela não tem irmão", correct: false },
            { text: "Seu irmão está desaparecido", correct: false },
            { text: "Eles têm uma relação conturbada", correct: true }
        ]
    },
    {
        question: "Quem Maeve descobre estar apaixonada na terceira temporada?",
        answers: [
            { text: "Jackson Marchetti", correct: false },
            { text: "Isaac", correct: false },
            { text: "Eric Effiong", correct: false },
            { text: "Otis Milburn", correct: true }
        ]
    }
];

const questionElement = document.getElementById('question');
const answersElement = document.getElementById('answers');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = quizData[currentQuestionIndex];
    questionElement.innerHTML = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('answer');
        button.addEventListener('click', () => selectAnswer(answer));
        answersElement.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = 'none';
    while (answersElement.firstChild) {
        answersElement.removeChild(answersElement.firstChild);
    }
}

function selectAnswer(answer) {
    const correct = answer.correct;
    if (correct) {
        score++;
    }
    Array.from(answersElement.children).forEach(button => {
        if (button.innerHTML == answer.text) {
            button.style.backgroundColor = correct ? 'lightgreen' : 'red';
        } else if (quizData[currentQuestionIndex].answers.find(a => a.text == button.innerHTML).correct) {
            button.style.backgroundColor = 'lightgreen';
        }
        button.disabled = true;
    });
    nextButton.style.display = 'block';
}

nextButton.addEventListener('click', () => {
    if (nextButton.innerHTML === "Reiniciar") {
        startQuiz();
    } else {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            showQuestion();
        } else {
            showScore();
        }
    }
});

function showScore() {
    resetState();
    questionElement.innerHTML = `Você acertou ${score} de ${quizData.length}!`;
    nextButton.innerHTML = 'Reiniciar';
    nextButton.style.display = 'block';
}

startQuiz();