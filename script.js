form = document.getElementById('form');
const fname = document.getElementsByName('fname')[0];
const lname = document.getElementsByName('lname')[0];
const email = document.getElementsByName('email')[0];
const phone = document.getElementsByName('phone')[0];
const address = document.getElementsByName('address')[0];
const city = document.getElementsByName('city')[0];
const gender = document.getElementsByName('gender');
const languages = document.getElementsByName('language');
const dob = document.getElementsByName('dob')[0];
const data = [];
let editIndex = null;
let isEditing = false;
let lastGenderRadioButtonSelected = null;
const sortConfig = {
    fnameasc: { prop: "firstName", type: "string", order: "asc" },
    fnamedesc: { prop: "firstName", type: "string", order: "desc" },

    lnameasc: { prop: "lastName", type: "string", order: "asc" },
    lnamedesc: { prop: "lastName", type: "string", order: "desc" },

    ageasc: { prop: "dob", type: "date", order: "asc" },
    agedesc: { prop: "dob", type: "date", order: "desc" },

    cityasc: { prop: "city", type: "string", order: "asc" },
    citydesc: { prop: "city", type: "string", order: "desc" }
};
const resultBox = document.getElementById('result');

const setStatus = (element, error_msg = "") => {
    const inputBox = element.parentElement;
    const small = inputBox.querySelector('small');
    small.innerText = error_msg;
    inputBox.classList.toggle("error", error_msg !== "");
    inputBox.classList.toggle("success", error_msg === "");
};

const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};
function validateFname() {
    if (fname.value.trim() === '') {
        setStatus(fname, 'First name is required');
        return false;
    }
    else {
        setStatus(fname);
        return true;
    }
}

function validateLname() {
    if (lname.value.trim() === '') {
        setStatus(lname, 'Last name is required');
        return false;
    }
    else {
        setStatus(lname);
        return true;
    }
}
function validateEmail() {
    if (email.value.trim() === '') {
        setStatus(email, 'Email is required');
        return false;
    }
    else if (!isValidEmail(email.value.trim())) {
        setStatus(email, 'Valid email required');
        return false;
    }
    else {
        setStatus(email);
        return true;
    }
}
function validatePhone() {
    if (phone.value.trim() === '') {
        setStatus(phone, 'Phone required');
        return false;
    }
    else if (isNaN(phone.value)) {
        setStatus(phone, 'Phone should be numeric');
        return false;
    }
    else {
        setStatus(phone);
        return true;
    }
}

function validateAddress() {
    if (address.value.trim() === '') {
        setStatus(address, 'Required');
        return false;
    }
    else {
        setStatus(address);
        return true;
    }
}

function validateDOB() {
    if (dob.value === '') {
        setStatus(dob, 'Date of birth is required');
        return false;
    }
    else if (new Date(dob.value) >= new Date()) {
        setStatus(dob, 'DOB must be in the past');
        return false;
    }
    else if (new Date().getFullYear() - new Date(dob.value).getFullYear() > 100) {
        setStatus(dob, 'You must be less than 100 years old');
        return false;
    }
    else {
        setStatus(dob);
        return true;
    }
}

function validateCity() {
    if (city.value === '') {
        setStatus(city, 'Choose a city');
        return false;
    }
    else {
        setStatus(city);
        return true;
    }
}

function validateGender() {
    const genders = document.querySelectorAll('input[name="gender"]');
    let genderSelected = false;
    genders.forEach((g) => {
        if (g.checked) {
            genderSelected = true;
        }
    });
    if (genderSelected) {
        setStatus(gender[0]);
        return true;
    }
    else {
        setStatus(gender[0], 'Select gender');
        return false;
    }
}
function validateLanguage() {
    const checkboxes = document.querySelectorAll("input[name='language']");
    let langSelected = false;
    checkboxes.forEach((cb) => {
        if (cb.checked) {
            langSelected = true;
        }
    });
    if (langSelected) {
        setStatus(languages[0]);
        return true;
    }
    else {
        setStatus(languages[0], 'Choose at least one');
        return false;
    }

}

function toggleGenderRadioButtons(radio) {
    if (lastGenderRadioButtonSelected === radio) {
        radio.checked = false;
        lastGenderRadioButtonSelected = null;
    }
    else {
        lastGenderRadioButtonSelected = radio;
    }
    validateGender();
}

function validateFormDetails() {
    let isValid = false;
    let isFnameValid = validateFname();
    let isLnameValid = validateLname();
    let isEmailValid = validateEmail();
    let isPhoneValid = validatePhone();
    let isCityValid = validateCity();
    let isGenderValid = validateGender();
    let isDOBValid = validateDOB();
    let isAddressValid = validateAddress();
    let isLanguageValid = validateLanguage();
    if (isAddressValid && isCityValid && isFnameValid && isDOBValid && isEmailValid && isPhoneValid && isLanguageValid && isLnameValid && isGenderValid) {
        isValid = true;
    }
    return isValid;
}
function fetchData() {
    let selectedGender = '';
    for (let g of gender) {
        if (g.checked) {
            selectedGender = g.value;
            break;
        }
    }
    console.log("Gender:", selectedGender);

    let selectedLanguages = [];
    for (let l of languages) {
        if (l.checked) {
            selectedLanguages.push(l.value);
        }
    }
    console.log("Languages:", selectedLanguages.join(", "));

    let formData = {
        firstName: fname.value,
        lastName: lname.value,
        email: email.value,
        phone: phone.value,
        address: address.value,
        city: city.value,
        dob: dob.value,
        gender: selectedGender,
        languages: selectedLanguages
    };
    return formData;

}

function renderTable(x = data) {
    const tbody = document.getElementById("tableBody");
    tbody.innerHTML = "";

    if (data.length === 0) {
        resultBox.style.display = "none";
    } else {
        resultBox.style.display = "block";
    }

    x.forEach((item, index) => {
        const row = `
            <tr>
                <td>${item.firstName}</td>
                <td>${item.lastName}</td>
                <td>${item.email}</td>
                <td>${item.phone}</td>
                <td>${item.gender}</td>
                <td>${item.dob}</td>
                <td>${item.languages.join(", ")}</td>
                <td>${item.address}</td>
                <td>${item.city}</td>
                <td>
                    <button class="editbtn" onclick="editEntry(${index})">Edit</button>
                    <button class="dbtn" onclick="deleteEntry(${index})">Delete</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function deleteEntry(i) {
    data.splice(i, 1);
    renderTable();
}

function editEntry(i) {
    editIndex = i;
    isEditing = true;
    const item = data[i];
    console.log(item);
    fname.value = item.firstName;
    lname.value = item.lastName;
    email.value = item.email;
    phone.value = item.phone;
    dob.value = item.dob;
    address.value = item.address;
    city.value = item.city;

    const genders = document.querySelectorAll('input[name="gender"]');
    genders.forEach((g) => {
        if (g.value === item.gender) {
            g.checked = true;
        }
    });

    const checkboxes = document.querySelectorAll("input[name='language']");
    const savedLangs = item.languages;
    checkboxes.forEach(cb => {
        if (savedLangs.includes(cb.value)) cb.checked = true;
    });

    const btns = document.querySelectorAll(".editbtn");
    btns.forEach((b) => {
        b.disabled = true;
    })
    const dbtns = document.querySelectorAll(".dbtn");
    dbtns.forEach((d) => {
        d.disabled = true;
    })

    const submit = document.getElementById("submit");
    submit.value = "Update";
}
function sortData(key) {
    const { prop, type, order } = sortConfig[key];
    const copy = [...data];
    copy.sort((a, b) => {
        let x = a[prop];
        let y = b[prop];
        if (type === "string") {
            return order === "asc" ?
                x.localeCompare(y) :
                y.localeCompare(x);
        }
        if (type === "date") {
            return order === "asc" ?
                new Date(x) - new Date(y)
                : new Date(y) - new Date(x);
        }
    });
    renderTable(copy);
}

function sortBy() {
    const key = document.getElementById("sortby").value;
    sortData(key);

}

function filterBy() {

    let filterdata = [];
    let cityfilter = [];
    let genderfilter = [];
    const citycheckbtns = document.querySelectorAll("input[name='filter-city']");
    citycheckbtns.forEach((c) => {
        if (c.checked) {
            cityfilter.push(c.value);
        }
    });
    console.log(cityfilter);
    const gendercheckbtns = document.querySelectorAll("input[name='filter-gender']");
    gendercheckbtns.forEach((g) => {
        if (g.checked) {
            genderfilter.push(g.value);
        }
    });

    data.forEach((obj) => {
        const cityMatch = cityfilter.length === 0 || cityfilter.includes(obj.city);
        const genderMatch = genderfilter.length === 0 || genderfilter.includes(obj.gender);

        if (cityMatch && genderMatch) {
            filterdata.push(obj);
        }
    });
    renderTable(filterdata);
    // const filtercont = document.getElementById("filter-container");
    // filtercont.style.display='none';
}
function handleFormSubmit(e) {
    e.preventDefault();
    const isFormValid = validateFormDetails();
    if (!isFormValid) {
        alert("Please correct the errors in the form.")
    }
    else {
        const details = fetchData();
        if (!isEditing) {
            data.push(details);
            form.reset();
            alert("Form submitted successfully ");
        }
        else {
            data.splice(editIndex, 1, details);
            isEditing = false;
            document.getElementById("submit").value = "Register";
            alert("All Changes Saved");
            form.reset();
        }
    }
    renderTable();
    resetForm();

}
function resetForm() {
    document.querySelectorAll(".editbtn").forEach(b => b.disabled = false);
    document.querySelectorAll(".dbtn").forEach(b => b.disabled = false);
    const inputBoxes = form.querySelectorAll('.input-box');
    inputBoxes.forEach(box => {
        box.classList.remove('success');
    });
}
function resetfilter(){
    const citycheckbtns = document.querySelectorAll("input[name='filter-city']");
    citycheckbtns.forEach((c) => {
        if (c.checked) {
            c.checked = false;
        }
    });
    const gendercheckbtns = document.querySelectorAll("input[name='filter-gender']");
    gendercheckbtns.forEach((g) => {
        if (g.checked) {
            g.checked = false;
        }
    });
    renderTable();
}
const f = document.getElementById("filter-container");
function showFilter() {
    document.getElementById("filter-container").style.display = "block";
    document.getElementById("filter-backdrop").style.display = "block";
}

function hideFilter() {
    document.getElementById("filter-container").style.display = "none";
    document.getElementById("filter-backdrop").style.display = "none";
}
document.getElementById("filter-backdrop").onclick = hideFilter;
