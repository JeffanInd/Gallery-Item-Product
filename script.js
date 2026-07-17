// ================= CLOCK =================
document.addEventListener("DOMContentLoaded", function () {
    function updateClock() {
        const now = new Date();

        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        document.getElementById("clock-time").textContent =
            `${hours}:${minutes}:${seconds}`;

        document.getElementById("clock-date").textContent =
            `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
    }

    setInterval(updateClock, 1000);
    updateClock();
});

// ================= DATA =================
const data = {
    "AB2-309606-MU": {
        vendor: "V309 H.N. Handicrafts",
        nama: "Organic Bowls With Ribbed Texture",
        kategori: "Home Accents",
        subkategori: "Tablescape",
        warna: "Gold",
        tier: "SHA",
        cbm: "0.085",
        hts: "7616.99.51.90",
        gambar: "https://6694454.app.netsuite.com/c.6694454/item-images/AB2-309606-MU_001.jpg",
        keterangan: "Organic Bowls With Ribbed Texture, Gold/Matte White"
    },
    "WT-RC679-SL": {
        vendor: "V63 Dcofrance & Edclaire",
        nama: "Square Capiz Shell Tray Set of-2",
        kategori: "Home Accents",
        subkategori: "Tablescape",
        warna: "Silver",
        tier: "Closeout",
        cbm: "0.0344",
        hts: "",
        gambar: "https://6694454.app.netsuite.com/c.6694454/item-images/WT-RC679-SL_001.jpg",
        keterangan: "Square Capiz Shell Tray Set of-2"
    }
};

// ================= ELEMENTS =================
const kodeSelector = document.getElementById("kodeSelector");
const kategoriSelector = document.getElementById("kategoriSelector");
const vendorSelector = document.getElementById("vendorSelector");
const itemDetail = document.getElementById("itemDetail");
const previousButton = document.getElementById("previousButton");
const nextButton = document.getElementById("nextButton");
const KodeSearch = document.getElementById("KodeSearch");

let filteredItems = [];
let currentIndex = 0;

// ================= DROPDOWN =================
function initDropdowns() {
    kategoriSelector.innerHTML = '<option value="">-- Select Category --</option>';
    kodeSelector.innerHTML = '<option value="">-- Select Code --</option>';
    vendorSelector.innerHTML = '<option value="">-- Select Vendor --</option>';

    Object.keys(data).forEach(key => {
        kodeSelector.innerHTML += `<option value="${key}">${key}</option>`;
    });

    [...new Set(Object.values(data).map(d => d.kategori))].forEach(cat => {
        kategoriSelector.innerHTML += `<option value="${cat}">${cat}</option>`;
    });

    [...new Set(Object.values(data).map(d => d.vendor))].forEach(v => {
        vendorSelector.innerHTML += `<option value="${v}">${v}</option>`;
    });
}

initDropdowns();

// ================= SHOW ITEM =================
function showItem(index) {
    if (index < 0 || index >= filteredItems.length) return;

    currentIndex = index;
    const key = filteredItems[index];
    const item = data[key];

    itemDetail.style.display = "block";
    itemDetail.innerHTML = `
        <div class="item-card">
            <div class="item-info">
                <div class="item-row"><span class="item-label">Vendor:</span> ${item.vendor}</div>
                <div class="item-row"><span class="item-label">Item Code:</span> ${key}</div>
                <div class="item-row"><span class="item-label">Item Name:</span> ${item.nama}</div>
                <div class="item-row"><span class="item-label">Category:</span> ${item.kategori}</div>
                <div class="item-row"><span class="item-label">Sub Category:</span> ${item.subkategori}</div>
                <div class="item-row"><span class="item-label">Color:</span> ${item.warna}</div>
                <div class="item-row"><span class="item-label">Tier:</span> ${item.tier}</div>
                <div class="item-row"><span class="item-label">CBM:</span> ${item.cbm}</div>
                <div class="item-row"><span class="item-label">HTS:</span> ${item.hts}</div>
                <div class="item-row"><span class="item-label">Description:</span><br>${item.keterangan}</div>
            </div>
            <div class="item-image-box">
                <img src="${item.gambar}" onclick="toggleZoom(this)">
            </div>
        </div>`;
}

// ================= EVENTS =================
kodeSelector.onchange = function () {
    if (!this.value) return;
    filteredItems = Object.keys(data);
    showItem(filteredItems.indexOf(this.value));
};

KodeSearch.oninput = function () {
    const term = this.value.trim().toUpperCase();
    filteredItems = Object.keys(data).filter(k => k.includes(term));
    if (filteredItems.length > 0) showItem(0);
};

previousButton.onclick = () => showItem(currentIndex - 1);
nextButton.onclick = () => showItem(currentIndex + 1);

// ================= ZOOM =================
const modal = document.getElementById("imageModal");
const zoomImg = document.getElementById("zoomImg");
const closeZoom = document.getElementById("closeZoom");

function toggleZoom(img) {
    modal.style.display = "flex";
    zoomImg.src = img.src;
}

closeZoom.onclick = () => modal.style.display = "none";
modal.onclick = () => modal.style.display = "none";

// ================= BACK =================
function backToApp1() {
    window.location.href = "https://boetepaythea-sudo.github.io/Inspection-App/";
}
