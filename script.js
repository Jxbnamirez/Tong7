// คลังคำถามดาราศาสตร์และอวกาศ
const quizData = [
    {
        question: "1. ดาวเคราะห์ดวงใดในระบบสุริยะที่มีขนาดใหญ่ที่สุด?",
        options: ["ดาวอังคาร", "ดาวเสาร์", "ดาวพฤหัสบดี", "ดาวยูเรนัส"],
        correct: 2
    },
    {
        question: "2. ดาวเคราะห์ดวงใดที่ได้ชื่อว่าเป็น 'ฝาแฝดของโลก'?",
        options: ["ดาวพุธ", "ดาวศุกร์", "ดาวอังคาร", "ดาวเนปจูน"],
        correct: 1
    },
    {
        question: "3. แงจากดวงอาทิตย์ใช้เวลาเดินทางมาถึงโลกประมาณกี่นาที?",
        options: ["ประมาณ 3 นาที", "ประมาณ 8 นาที", "ประมาณ 15 นาที", "เดินทางมาถึงทันที"],
        correct: 1
    },
    {
        question: "4. ดาวเคราะห์ดวงใดในระบบสุริยะที่มีดวงจันทร์บริวารมากที่สุด?",
        options: ["ดาวเสาร์", "ดาวพฤหัสบดี", "โลก", "ดาวเนปจูน"],
        correct: 0
    },
    {
        question: "5. กาแล็กซีที่ระบบสุริยะของเราอาศัยอยู่มีชื่อว่าอะไร?",
        options: ["กาแล็กซีแอนโดรเมดา", "กาแล็กซีทางช้างเผือก", "กาแล็กซีแมกเจลแลน", "กาแล็กซีไตรแองกูลัม"],
        correct: 1
    }
];

let currentQuestionIndex = 0;
let score = 0;

const quizBox = document.getElementById('quiz-box');
const resultBox = document.getElementById('result-box');
const questionElement = document.getElementById('question-text');
const optionsBox = document.getElementById('options-box');
const nextButton = document.getElementById('next-button');
const currentNumIdx = document.getElementById('current-number');
const totalNumIdx = document.getElementById('total-number');
const scoreElement = document.getElementById('score');

// ฟังก์ชันเริ่มเกมใหม่
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultBox.classList.add('hide');
    quizBox.classList.remove('hide');
    totalNumIdx.textContent = quizData.length;
    showQuestion();
}

// ฟังก์ชันดึงคำถามมาแสดง
function showQuestion() {
    resetState();
    let currentQuestion = quizData[currentQuestionIndex];
    currentNumIdx.textContent = currentQuestionIndex + 1;
    questionElement.textContent = currentQuestion.question;

    // สร้างปุ่มตัวเลือก
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-btn');
        button.addEventListener('click', () => selectOption(index, button));
        optionsBox.appendChild(button);
    });
}

// ล้างปุ่มของข้อเก่าและซ่อนปุ่มถัดไป
function resetState() {
    nextButton.classList.add('hide');
    while (optionsBox.firstChild) {
        optionsBox.removeChild(optionsBox.firstChild);
    }
}

// ฟังก์ชันเมื่อผู้เล่นกดเลือกคำตอบ
function selectOption(selectedIndex, clickedButton) {
    const currentQuestion = quizData[currentQuestionIndex];
    const correctIndex = currentQuestion.correct;
    const allButtons = optionsBox.querySelectorAll('.option-btn');

    // ตรวจว่าตอบถูกหรือผิด
    if (selectedIndex === correctIndex) {
        clickedButton.classList.add('correct');
        score++;
    } else {
        clickedButton.classList.add('wrong');
        // ไฮไลท์ข้อที่ถูกให้ผู้เล่นดูด้วย
        allButtons[correctIndex].classList.add('correct');
    }

    // ล็อกไม่ให้กดปุ่มอื่นซ้ำได้อีกในข้อนี้
    allButtons.forEach(button => button.disabled = true);

    // แสดงปุ่ม "ข้อถัดไป"
    nextButton.classList.remove('hide');
}

// อีเวนต์ปุ่มข้อถัดไป
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        showQuestion();
    } else {
        showResult();
    }
});

// ฟังก์ชันแสดงหน้าสรุปคะแนน
function showResult() {
    quizBox.classList.add('hide');
    resultBox.classList.remove('hide');
    scoreElement.textContent = `${score} / ${quizData.length}`;
}

// เรียกใช้งานครั้งแรกเมื่อโหลดหน้าเว็บ
startQuiz();
