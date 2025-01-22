// بيانات تسجيل الدخول للأدمن
const adminCredentials = {
  username: "admin",
  password: "admin123"
};

// المنتجات (يتم تخزينها محليًا)
let products = JSON.parse(localStorage.getItem("products")) || [];

// عناصر الصفحة
const loginPage = document.getElementById("loginPage");
const adminPanel = document.getElementById("adminPanel");
const loginForm = document.getElementById("loginForm");
const addProductForm = document.getElementById("addProductForm");
const productItems = document.getElementById("productItems");
const logoutButton = document.getElementById("logoutButton");

// عرض صفحة تسجيل الدخول
function showLoginPage() {
  loginPage.classList.remove("hidden");
  adminPanel.classList.add("hidden");
}

// عرض لوحة التحكم
function showAdminPanel() {
  loginPage.classList.add("hidden");
  adminPanel.classList.remove("hidden");
  renderProducts();
}

// التحقق من تسجيل الدخول
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("adminUsername").value;
  const password = document.getElementById("adminPassword").value;

  if (username === adminCredentials.username && password === adminCredentials.password) {
    showAdminPanel();
  } else {
    alert("اسم المستخدم أو كلمة المرور غير صحيحة.");
  }
});

// إضافة منتج جديد
addProductForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("productName").value;
  const age = document.getElementById("productAge").value;
  const price = document.getElementById("productPrice").value;
  const image = document.getElementById("productImage").value;

  const newProduct = { name, age, price, image };
  products.push(newProduct);
  localStorage.setItem("products", JSON.stringify(products));

  addProductForm.reset();
  renderProducts();
});

// عرض قائمة المنتجات
function renderProducts() {
  productItems.innerHTML = "";

  products.forEach((product, index) => {
    const listItem = document.createElement("li");

    listItem.innerHTML = `
      <div>
        <img src="${product.image}" alt="${product.name}">
        <strong>${product.name}</strong>
        <p>العمر: ${product.age} أشهر | السعر: ${product.price} ريال</p>
      </div>
      <button onclick="deleteProduct(${index})">حذف</button>
    `;

    productItems.appendChild(listItem);
  });
}

// حذف منتج
function deleteProduct(index) {
  products.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(products));
  renderProducts();
}

// تسجيل الخروج
logoutButton.addEventListener("click", () => {
  showLoginPage();
});

// تحميل البيانات عند بدء التشغيل
document.addEventListener("DOMContentLoaded", () => {
  showLoginPage();
});
