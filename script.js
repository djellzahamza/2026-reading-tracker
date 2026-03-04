const goal = 25;

let books = JSON.parse(localStorage.getItem("books")) || [];

function saveBooks() {
    localStorage.setItem("books", JSON.stringify(books));
}

function addBook() {
    const title = document.getElementById("title").value;
    const duration = document.getElementById("duration").value;
    const month = document.getElementById("month").value;

    if (title === "" || duration === "" || month === "") {
        alert("Please fill all fields 💕");
        return;
    }

    const book = {
        title,
        duration,
        month
    };

    books.push(book);
    saveBooks();
    renderBooks();
    clearForm();
}

function editBook(index) {
    const newTitle = prompt("Edit book title:", books[index].title);
    if (newTitle && newTitle.trim() !== "") {
        books[index].title = newTitle.trim();
        saveBooks();
        renderBooks();
    }
}

function deleteBook(index) {
    if (confirm("Delete this book? 💔")) {
        books.splice(index, 1);
        saveBooks();
        renderBooks();
    }
}

function clearForm() {
    document.getElementById("title").value = "";
    document.getElementById("duration").value = "";
    document.getElementById("month").value = "";
}

function updateProgress(total) {
    const percent = Math.min((total / goal) * 100, 100);

    document.getElementById("progressFill").style.width = percent + "%";
    document.getElementById("progressText").textContent = `${total} / ${goal}`;
}

function renderBooks() {
    const bookList = document.getElementById("bookList");
    const monthlySummary = document.getElementById("monthlySummary");
    const yearTotal = document.getElementById("yearTotal");

    bookList.innerHTML = "";
    monthlySummary.innerHTML = "";

    let monthCounts = {};
    let total = books.length;

    books.forEach((book, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            ${book.title} - ${book.duration} - ${book.month}
            <button class="edit-btn" onclick="editBook(${index})">✏</button>
            <button class="delete-btn" onclick="deleteBook(${index})">🗑</button>
        `;

        bookList.appendChild(li);

        monthCounts[book.month] = (monthCounts[book.month] || 0) + 1;
    });

    for (let month in monthCounts) {
        const p = document.createElement("p");
        p.textContent = `${month}: ${monthCounts[month]} books`;
        monthlySummary.appendChild(p);
    }

    yearTotal.textContent = total;

    updateProgress(total);
}


renderBooks();