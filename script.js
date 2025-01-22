// تخزين البيانات في LocalStorage
const defaultCats = [
  { name: "لوسي", age: 3, price: 150, image: "cat1.jpg" },
  { name: "ماكس", age: 5, price: 200, image: "cat2.jpg" }
];

function getCats() {
  const cats = JSON.parse(localStorage.getItem("cats"));
  return cats || defaultCats;
}

function saveCats(cats) {
  localStorage.setItem("cats", JSON.stringify(cats));
}

// عرض القطط في الصفحة الرئيسية
function renderStore() {
  const catsContainer = document.getElementById("catsContainer");
  catsContainer.innerHTML = "";
  const cats = getCats();
  cats.forEach(cat => {
    const card = document.createElement("div");
    card.className = "cat-card";
    card.innerHTML = `
      <img src="${cat.image}" alt="قطة">
      <h3>${cat.name}</h3>
      <p>العمر: ${cat.age} شهور</p>
      <p>السعر: ${cat.price} ريال</p>
      <button>شراء الآن</button>
    `;
    catsContainer.appendChild(card);
  });
}

// عرض القطط في لوحة التحكم
function renderAdmin() {
  const adminCatsList = document.getElementById("adminCatsList");
  adminCatsList.innerHTML = "";
  const cats = getCats();
  cats.forEach((cat, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      ${cat.name} - العمر: ${cat.age} شهور - السعر: ${cat.price} ريال
      <button onclick="deleteCat(${index})">حذف</button>
    `;
    adminCatsList.appendChild(listItem);
  });
}

// إضافة قطة جديدة
document.getElementById("addCatForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("catName").value;
  const age = parseInt(document.getElementById("catAge").value);
  const price = parseFloat(document.getElementById("catPrice").value);
  const image = document.getElementById("catImage").value;

  const cats = getCats();
  cats.push({ name, age, price, image });
  saveCats(cats);

  renderAdmin();
  renderStore();

  e.target.reset();
});

// حذف قطة
function deleteCat(index) {
  const cats = getCats();
  cats.splice(index, 1);
  saveCats(cats);

  renderAdmin();
  renderStore();
}

// التنقل بين الصفحات
function showStore() {
  document.getElementById("storePage").classList.remove("hidden");
  document.getElementById("adminPage").classList.add("hidden");
}

function showAdminPanel() {
  document.getElementById("storePage").classList.add("hidden");
  document.getElementById("adminPage").classList.remove("hidden");
}

// تهيئة البيانات عند التحميل
document.addEventListener("DOMContentLoaded", () => {
  renderStore();
  renderAdmin();
});