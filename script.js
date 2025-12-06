// المتغيرات لربط عناصر HTML
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// ===================================
// 1. دالة إضافة مهمة جديدة (Add Task)
// يتم استدعاؤها بالنقر على زر "إضافة" في HTML
// ===================================
function addTask() {
    // التحقق من أن حقل الإدخال ليس فارغاً
    if (inputBox.value === '') {
        alert("يجب عليك كتابة مهمة ما!");
        return; // إيقاف الدالة
    } 
    
    // إنشاء عنصر قائمة جديد (<li>)
    let li = document.createElement("li");
    li.innerHTML = inputBox.value; // وضع نص المهمة داخله
    
    // إضافته إلى القائمة غير المرتبة (<ul>)
    listContainer.appendChild(li);
    
    // إنشاء زر الحذف (\times) كـ <span>
    let span = document.createElement("span");
    span.innerHTML = "\u00d7"; // رمز (X) لزر الحذف
    li.appendChild(span);
    
    // مسح حقل الإدخال بعد الإضافة
    inputBox.value = "";
    
    // حفظ القائمة المحدثة في Local Storage
    saveData();
}

// ===================================
// 2. معالجة النقر على عناصر القائمة (تحديد كمكتملة أو حذف)
// ===================================
listContainer.addEventListener("click", function(e) {
    // إذا كان النقر على عنصر المهمة نفسه (<li>)
    if (e.target.tagName === "LI") {
        // تبديل حالة "checked" (لتطبيق تنسيق خط يتوسط النص)
        e.target.classList.toggle("checked");
        saveData(); // حفظ الحالة المحدثة
    } 
    // إذا كان النقر على زر الحذف (<span>)
    else if (e.target.tagName === "SPAN") {
        // إزالة العنصر الأب (<li>) بالكامل من القائمة
        e.target.parentElement.remove();
        saveData(); // حفظ التغيير (الحذف)
    }
}, false); // تعيين false يضمن أن الحدث ينتقل من الداخل إلى الخارج

// ===================================
// 3. إدارة التخزين المحلي (Local Storage)
// ===================================

// دالة حفظ البيانات
function saveData() {
    // تخزين محتوى القائمة بالكامل كنص في Local Storage
    localStorage.setItem("data", listContainer.innerHTML);
}

// دالة إظهار البيانات المحفوظة (تحميل المهام عند فتح التطبيق)
function showTask() {
    // تحميل البيانات من Local Storage وتعيينها كمحتوى للقائمة
    listContainer.innerHTML = localStorage.getItem("data");
}

// استدعاء دالة العرض عند تحميل الصفحة لأول مرة
showTask();