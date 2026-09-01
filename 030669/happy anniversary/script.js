// =========================================
// 1. ระบบ Lock Screen
// =========================================
const correctPassword = "030669"; // 👈 เปลี่ยนรหัสผ่านตรงนี้
let currentInput = "";
const passDisplay = document.getElementById("pass-display");
const errorMsg = document.getElementById("error-msg");

function pressKey(num) {
    if (currentInput.length < 6) {
        currentInput += num;
        updateDisplay();
    }
}

function clearPass() {
    currentInput = "";
    errorMsg.innerText = "";
    updateDisplay();
}

function updateDisplay() {
    // แสดงเป็นดอกจัน (*) ตามจำนวนที่กด
    let displayStr = currentInput.padEnd(6, "_").split("").join(" ");
    if (currentInput.length > 0) {
        displayStr = currentInput.replace(/./g, "*").padEnd(6, "_").split("").join(" ");
    }
    passDisplay.innerText = displayStr;
}

function checkPass() {
    if (currentInput === correctPassword) {
        nextSection(2); // รหัสถูก ไปหน้า 2
    } else {
        errorMsg.innerText = "รหัสผิดน้า ลองใหม่นะคะ 🥺";
        currentInput = "";
        setTimeout(updateDisplay, 500);
    }
}

// =========================================
// 2. ฟังก์ชันสลับหน้าเว็บ (SPA)
// =========================================
function nextSection(sectionNumber) {
    // ซ่อนทุกหน้า
    const sections = document.querySelectorAll("section");
    sections.forEach(sec => sec.classList.remove("active"));
    
    // แสดงหน้าที่เลือก
    const nextSec = document.getElementById("sec" + sectionNumber);
    if (nextSec) {
        nextSec.classList.add("active");
    }
}

// =========================================
// 3. ระบบตัวนับเวลา & ล็อกปุ่มถัดไป
// =========================================
const startDate = new Date("2026-06-03T00:00:00"); // 👈 วันที่เริ่มคบกัน (ปี-เดือน-วัน)
const targetDate = new Date("2026-09-03T00:00:00").getTime(); // 👈 วันที่เป้าหมายนับถอยหลัง

function updateTimer() {
    const now = new Date();
    const nowTime = now.getTime();

    // 1. คำนวณจำนวน "วันทั้งหมด" ที่คบกันมา
    const diffTime = nowTime - startDate.getTime();
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // 2. คำนวณเวลานับถอยหลังสู่วันเป้าหมาย
    const distance = targetDate - nowTime;

    const timerDisplay = document.getElementById("timer-display");
    const nextButton = document.getElementById("btn-next-sec2"); // ปุ่มถัดไปในหน้า 2

    if (timerDisplay) {
        if (distance > 0) {
            // ถ้ายังไม่ถึงเวลา
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            timerDisplay.innerHTML = `
                <span style="font-size: 1.1em;">💖 คบกันมาแล้วรวมทั้งหมด: <b>${totalDays} วัน</b></span><br><br>
                ⏳ นับถอยหลังสู่วันครบรอบ:<br>
                ${days} วัน : ${hours} ชม. : ${minutes} นาที : ${seconds} วินาที
            `;

            // 🔒 ล็อกปุ่มถัดไป (กดไม่ได้ + ทำปุ่มให้จางลง)
            if (nextButton) {
                nextButton.disabled = true;
                nextButton.style.opacity = "0.5";
                nextButton.style.cursor = "not-allowed";
            }

        } else {
            // ถ้าถึงเวลาแล้ว
            timerDisplay.innerHTML = `
                <span style="font-size: 1.1em;">💖 คบกันมาแล้วรวมทั้งหมด: <b>${totalDays} วัน</b></span><br><br>
                🎉 ถึงวันครบรอบแล้ว! กดไปต่อได้เลย 🥳💖
            `;

            // 🔓 ปลดล็อกปุ่มถัดไป (กดได้ปกติ)
            if (nextButton) {
                nextButton.disabled = false;
                nextButton.style.opacity = "1";
                nextButton.style.cursor = "pointer";
            }
        }
    }
}

// ให้อัปเดตเวลาทุกๆ 1 วินาที
setInterval(updateTimer, 1000);
updateTimer(); // เรียกใช้ครั้งแรกทันทีตอนโหลดเว็บ