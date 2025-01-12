// Image Resizer Functionality
const imageDropZone = document.getElementById("imageDropZone");
const imageInput = document.getElementById("imageInput");
const imageControls = document.getElementById("imageControls");
const previewImage = document.getElementById("previewImage");

imageDropZone.addEventListener("click", () => imageInput.click());
imageDropZone.addEventListener("dragover", (e) => e.preventDefault());
imageDropZone.addEventListener("drop", handleImageDrop);

imageInput.addEventListener("change", handleImageSelect);

function handleImageDrop(e) {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith("image/")) {
    handleImage(file);
  }
}

function handleImageSelect(e) {
  const file = e.target.files[0];
  if (file) {
    handleImage(file);
  }
}

function handleImage(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    previewImage.src = e.target.result;
    previewImage.style.display = "block";
    imageControls.style.display = "block";
  };
  reader.readAsDataURL(file);
}

async function resizeImage() {
  const width = document.getElementById("width").value;
  const height = document.getElementById("height").value;

  if (!width || !height) {
    alert("Please enter both width and height");
    return;
  }

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = width;
  canvas.height = height;

  ctx.drawImage(previewImage, 0, 0, width, height);

  const resizedImage = canvas.toDataURL("image/jpeg", 0.9);
  downloadFile(resizedImage, "resized-image.jpg");
}

// Format Converter Functionality
const convertDropZone = document.getElementById("convertDropZone");
const convertInput = document.getElementById("convertInput");
const convertBtn = document.getElementById("convertBtn");

convertDropZone.addEventListener("click", () => convertInput.click());
convertDropZone.addEventListener("dragover", (e) => e.preventDefault());
convertDropZone.addEventListener("drop", handleConvertDrop);

convertInput.addEventListener("change", handleConvertSelect);

function handleConvertDrop(e) {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  if (file) {
    handleConvertFile(file);
  }
}

function handleConvertSelect(e) {
  const file = e.target.files[0];
  if (file) {
    handleConvertFile(file);
  }
}

function handleConvertFile(file) {
  convertBtn.style.display = "block";
  convertBtn.setAttribute("data-file", file.name);
}

async function convertFile() {
  const file = convertInput.files[0];
  if (!file) return;

  if (file.type === "application/pdf") {
    // Convert PDF to JPG
    // Note: This is a simplified version. In production, you'd want to use a more robust PDF rendering solution
    const reader = new FileReader();
    reader.onload = async (e) => {
      const pdfData = new Uint8Array(e.target.result);
      const pdfDoc = await PDFLib.PDFDocument.load(pdfData);
      const page = await pdfDoc.getPage(0);
      // Convert page to image...
    };
    reader.readAsArrayBuffer(file);
  } else if (file.type === "image/jpeg") {
    // Convert JPG to PDF
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const pdf = new jspdf.jsPDF();
        pdf.addImage(img, "JPEG", 0, 0);
        pdf.save("converted.pdf");
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

// Contact Form Functionality
function handleContact(e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  // Here you would typically send this to a backend server
  console.log("Contact form submitted:", { email, message });
  alert("Thank you for your message! We will get back to you soon.");
  e.target.reset();
}

// Helper Functions
function downloadFile(data, fileName) {
  const link = document.createElement("a");
  link.href = data;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Initialize Swiper
const swiper = new Swiper(".mySwiper", {
  effect: "cards",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
});

// Animate elements on scroll
const observerOptions = {
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");
    }
  });
}, observerOptions);

document.querySelectorAll(".glass-card").forEach((card) => {
  observer.observe(card);
});
