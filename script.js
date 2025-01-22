// تخزين بيانات المستخدمين
const users = [
  { username: "admin", password: "admin123", role: "admin" }, // بيانات الإدمن
  { username: "user1", password: "user123", role: "user" } // بيانات مستخدم عادي
];

const defaultCats = [
  { name: "لوسي", age: 3, price: 150, image: "cat1.jpg" },
  { name: "ماكس", age: 5, price: 200, image: "cat2.jpg" }
];

// دالة تسجيل الدخول
document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const user = users.find(user => user.username === username && user.password === password);
  if (user) {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    if (user.role === "admin") {
      showAdminPage();
    } else {
      showStorePage();
    }
  } else {
    alert("اسم المستخدم أو كلمة المرور غير صحيحة.");
  }
});

// دالة إنشاء حساب
document.getElementById("registerForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const newUsername = document.getElementById("newUsername").value;
  const newPassword = document.getElementById("newPassword").value;

  // إضافة الحساب الجديد
  users.push({ username: newUsername, password: newPassword, role: "user" });
  alert("تم إنشاء الحساب بنجاح!");
  showLoginPage();
});

// دالة إظهار صفحة المتجر
function showStorePage() {
  document.getElementById("loginPage").classList.add("hidden");
  document.getElementById("registerPage").classList.add("hidden");
  document.getElementById("storePage").classList.remove("hidden");
  renderStore();
}

// دالة إظهار لوحة التحكم (للإدمن فقط)
function showAdminPage() {
  document.getElementById("loginPage").classList.add("hidden");
  document.getElementById("registerPage").classList.add("hidden");
  document.getElementById("adminPage").classList.remove("hidden");
  renderAdmin();
}

// دالة إظهار صفحة التسجيل
function showRegisterPage() {
  document.getElementById("loginPage").classList.add("hidden");
  document.getElementById("registerPage").classList.remove("hidden");
}

// دالة إظهار صفحة تسجيل الدخول
function showLoginPage() {
  document.getElementById("loginPage").classList.remove("hidden");
  document.getElementById("registerPage").classList.add("hidden");
}

// دالة إغلاق الجلسة
function logout() {
  localStorage.removeItem("loggedInUser");
  showLoginPage();
}

// دالة عرض القطط في المتجر
function renderStore() {
  const catsContainer = document.getElementById("catsContainer");
  catsContainer.innerHTML = "";
  const cats = defaultCats;
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

// دالة عرض القطط في لوحة الإدارة
function renderAdmin() {
  const adminCatsList = document.getElementById("adminCatsList");
  adminCatsList.innerHTML = "";
  const cats = defaultCats;
  cats.forEach((cat, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      ${cat.name} - العمر: ${cat.age} شهور - السعر: ${cat.price} ريال
      <button onclick="deleteCat(${index})">حذف</button>
    `;
    adminCatsList.appendChild(listItem);
  });
}

// دالة حذف قطة
function deleteCat(index) {
  defaultCats.splice(index, 1);
  renderAdmin();
  renderStore();
}

// تهيئة الصفحة عند تحميلها
document.addEventListener("DOMContentLoaded", function() {
  if (localStorage.getItem("loggedInUser")) {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user.role === "admin") {
      showAdminPage();
    } else {
      showStorePage();
    }
  } else {
    showLoginPage();
  }
});
