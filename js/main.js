var bookmarkName = document.getElementById('bookmarkName')
var siteUrl = document.getElementById('siteUrl')
var sbmtButton = document.getElementById('sbmtButton')
var bookmarksList;
var tableContent = document.getElementById('tableContent')


if (localStorage.getItem('bmList') != null) {
    bookmarksList = JSON.parse(localStorage.getItem('bmList'))
    display(bookmarksList)
}
else {
    bookmarksList = []
}

sbmtButton.onclick = function () {
    addURL()
    display(bookmarksList)
}

function display(bookmarksList) {
    var content = '';
    for (i = 0; i < bookmarksList.length; i++) {
        content += `<tr>
            <td>${i + 1}</td>
            <td>${bookmarksList[i].bmName}</td>
            <td>
                <button class="btn visit-btn" id="visitBtn" onclick="window.open('${bookmarksList[i].siteUrl}')"><i class="fa-solid fa-eye pe-2"></i>Visit</button>
            </td>
            <td><button class="btn btn-danger delete-btn" id="deleteBtn" onclick="deleteUrl(${i})"><i class="fa-solid fa-trash pe-2"></i>Delete</button></td>
        </tr>`

    }
    tableContent.innerHTML = content
}
function addURL() {
    if (Validation(bookmarkName) && Validation(siteUrl)) {
        var bookmarkObj = {
            bmName: bookmarkName.value,
            siteUrl: siteUrl.value,
        }
        bookmarksList.push(bookmarkObj)
        localStorage.setItem('bmList', JSON.stringify(bookmarksList))
    }
    else {
        window.alert("Please enter valid data:\nSite Name must contain at least 3 characters \nSite URL must be a valid one")
    }
}
function deleteUrl(index) {
    bookmarksList.splice(index, 1)
    localStorage.setItem('bmList', JSON.stringify(bookmarksList))
    display(bookmarksList)
}

function Validation(ele) {
    var Regex = {
        bookmarkName: /^[\w]{3,}/,
        siteUrl: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/
    };
    if (Regex[ele.id].test(ele.value)) {
        ele.classList.add('is-valid')
        ele.classList.remove('is-invalid')

        return true
    }
    else {
        ele.classList.add('is-invalid')
        ele.classList.remove('is-valid')

        return false
    }
}