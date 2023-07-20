// Fungsi untuk menghitung BMI berdasarkan nilai yang diinput oleh pengguna
function calculateBMI() {
    // Mendapatkan nilai dari elemen input jenis kelamin, usia, berat, dan tinggi
    const gender = document.getElementById("gender").value;
    const age = document.getElementById("age").value;
    const weight = document.getElementById("weight").value;
    const height = document.getElementById("height").value;

    // Memeriksa apakah semua subjek telah diisi, jika tidak munculkan peringatan
    if (!gender || !age || !weight || !height) {
        alert("Harap isi semua subjek terlebih dahulu.");
        return;
    }

    // Mengkonversi berat dan tinggi menjadi angka (float)
    const weightInKg = parseFloat(weight);
    const heightInCm = parseFloat(height);

    // Mengkonversi tinggi ke meter
    const heightInM = heightInCm / 100;

    // Menghitung BMI
    const bmi = weightInKg / (heightInM * heightInM);

    // Menentukan status BMI dan saran berdasarkan nilai BMI
    let bmiStatus = "";
    let bmiAdvice = "";

    if (bmi < 18.5) {
        bmiStatus = "Berat badan kurang";
        bmiAdvice = "Anda disarankan untuk meningkatkan berat badan.";
    } else if (bmi >= 18.5 && bmi < 24.9) {
        bmiStatus = "Berat badan normal";
        bmiAdvice = "Pertahankan pola makan dan gaya hidup yang sehat.";
    } else if (bmi >= 25 && bmi < 29.9) {
        bmiStatus = "Berat badan berlebih";
        bmiAdvice = "Anda disarankan untuk mengurangi berat badan.";
    } else {
        bmiStatus = "Obesitas";
        bmiAdvice = "Konsultasikan dengan dokter untuk menurunkan berat badan.";
    }

    // Menampilkan hasil BMI, status, dan saran pada elemen HTML
    document.getElementById("bmiResult").innerText = `${bmi.toFixed(2)}`;
    document.getElementById("bmiStatus").innerText = `Status BMI: ${bmiStatus}`;
    document.getElementById("bmiAdvice").innerText = bmiAdvice;

    // Menampilkan tombol download hasil dan kotak hasil BMI
    document.getElementById("downloadButton").style.display = "block";
    document.getElementById("result").style.display = "block";
}

// Fungsi untuk mereset form kalkulator
function resetForm() {
    // Menghapus nilai pada input jenis kelamin, usia, berat, dan tinggi
    document.getElementById("gender").value = "";
    document.getElementById("age").value = "";
    document.getElementById("weight").value = "";
    document.getElementById("height").value = "";

    // Menyembunyikan kotak hasil BMI dan tombol download
    document.getElementById("result").style.display = "none";
    document.getElementById("downloadButton").style.display = "none";
}

// Fungsi untuk mengunduh hasil perhitungan BMI
function downloadResult() {
    // Mendapatkan nilai hasil BMI, status, dan saran dari elemen HTML
    const bmiResult = document.getElementById("bmiResult").innerText;
    const bmiStatus = document.getElementById("bmiStatus").innerText;
    const bmiAdvice = document.getElementById("bmiAdvice").innerText;

    // Menggabungkan hasil menjadi satu teks untuk diunduh
    const downloadText = `${bmiResult}\n${bmiStatus}\n${bmiAdvice}`;

    // Membuat elemen link untuk mengunduh teks hasil
    const element = document.createElement("a");
    element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(downloadText)
    );
    element.setAttribute("download", "hasil_bmi.txt");

    element.style.display = "none";
    document.body.appendChild(element);
    element.click();

    document.body.removeChild(element);
}

// Memeriksa validitas input pada kolom umur, berat, dan tinggi saat halaman dimuat
checkFormValidity();

// Fungsi untuk menampilkan atau menyembunyikan pesan error berdasarkan validitas input
function displayErrorMessage(input, isValid) {
    const errorElement = document.getElementById(`${input.id}Error`);
    if (!isValid) {
        errorElement.style.display = "block";
        input.classList.add("invalid");
    } else {
        errorElement.style.display = "none";
        input.classList.remove("invalid");
    }
}

// Fungsi untuk memeriksa validitas input pada setiap kolom saat pengguna mengisi atau mengubah nilai
function checkFormValidity() {
    const ageInput = document.getElementById("age");
    const weightInput = document.getElementById("weight");
    const heightInput = document.getElementById("height");
    const calculateButton = document.getElementById("calculateButton");

    // Memeriksa validitas kolom umur
    displayErrorMessage(ageInput, ageInput.validity.valid);

    // Memeriksa validitas kolom berat
    displayErrorMessage(weightInput, weightInput.validity.valid);

    // Memeriksa validitas kolom tinggi
    displayErrorMessage(heightInput, heightInput.validity.valid);

    // Nonaktifkan tombol hitung jika ada kolom yang tidak valid
    calculateButton.disabled = !(ageInput.validity.valid && weightInput.validity.valid && heightInput.validity.valid);
}

// Event listener untuk memeriksa validitas input saat pengguna mengisi kolom
document.getElementById("age").addEventListener("input", checkFormValidity);
document.getElementById("weight").addEventListener("input", checkFormValidity);
document.getElementById("height").addEventListener("input", checkFormValidity);
