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
const resultBox = document.getElementById('result');
const sortConfig = {
    fnameasc:  { prop: "firstName", type: "string", order: "asc" },
    fnamedesc: { prop: "firstName", type: "string", order: "desc" },

    lnameasc:  { prop: "lastName", type: "string", order: "asc" },
    lnamedesc: { prop: "lastName", type: "string", order: "desc" },

    ageasc:    { prop: "dob", type: "date", order: "asc" },
    agedesc:   { prop: "dob", type: "date", order: "desc" },

    cityasc:   { prop: "city", type: "string", order: "asc" },
    citydesc:  { prop: "city", type: "string", order: "desc" }
};
form.addEventListener('submit', (e) => {
    e.preventDefault();
    addEntry();
});

// combine these two functions into one
const setError = (element, message) => {
    const inputBox = element.parentElement;
    const small = inputBox.querySelector('small');
    small.innerText = message;
    inputBox.classList.add('error');
    inputBox.classList.remove('success');
};

const setSuccess = (element) => {
    const inputBox = element.parentElement;
    const small = inputBox.querySelector('small');
    small.innerText = '';
    inputBox.classList.add('success');
    inputBox.classList.remove('error');
};

const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};
function validateFname() {
    if (fname.value.trim() === '') {
        setError(fname, 'First name is required');
        return false;
    }
    else {
        setSuccess(fname);
        return true;
    }
}

function validateLname() {
    if (lname.value.trim() === '') {
        setError(lname, 'Last name is required');
        return false;
    }
    else {
        setSuccess(lname);
        return true;
    }
}
function validateEmail() {
    if (email.value.trim() === '') {
        setError(email, 'Email is required');
        return false;
    }
    else if (!isValidEmail(email.value.trim())) {
        setError(email, 'Valid email required');
        return false;
    }
    else {
        setSuccess(email);
        return true;
    }
}
function validatePhone() {
    if (phone.value.trim() === '') {
        setError(phone, 'Phone required');
        return false;
    }
    else if(isNaN(phone.value)){
        setError(phone, 'Phone should be numeric');
        return false;
    }
    else {
        setSuccess(phone);
        return true;
    }
}

function validateAddress() {
    if (address.value.trim() === '') {
        setError(address, 'Required');
        return false;
    }
    else {
        setSuccess(address);
        return true;
    }
}

function validateDOB() {
    if (dob.value === '') {
        setError(dob, 'Date of birth is required');
        return false;
    }
    else if (new Date(dob.value) >= new Date()) {
        setError(dob, 'DOB must be in the past');
        return false;
    }
    else if (new Date().getFullYear() - new Date(dob.value).getFullYear() > 100) {
        setError(dob, 'You must be less than 100 years old');
        return false;
    }
    else {
        setSuccess(dob);
        return true;
    }
}

function validateCity() {
    if (city.value === '') {
        setError(city, 'Choose a city');
        return false;
    }
    else {
        setSuccess(city);
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
        setSuccess(gender[0]);
        return true;
    }
    else {
        setError(gender[0], 'Select gender');
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
        setSuccess(languages[0]);
        return true;
    }
    else {
        setError(languages[0], 'Choose at least one');
        return false;
    }

}

let lastGenderRadioButtonSelected = null;
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

// make a single function of validation and also improve the alert conditions and remove uncessary if conditions
// Also validating form should only validate and not update anything
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
    if(isAddressValid && isCityValid && isFnameValid && isDOBValid && isEmailValid && isPhoneValid && isLanguageValid && isLnameValid && isGenderValid){
        isValid = true;
    }
    if (isValid) alert("Form Submitted Successfully!");
    if (isValid) {
        console.log("First Name:", fname.value);
        console.log("Last Name:", lname.value);
        console.log("Email:", email.value);
        console.log("Phone:", phone.value);
        console.log("Address:", address.value);
        console.log("City:", city.value);
        console.log("DOB:", dob.value);

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
        form.reset();
        const inputBoxes = form.querySelectorAll('.input-box');
        inputBoxes.forEach(box => {
            box.classList.remove('success');
        });
        return formData;

    }

    if (!isValid) {
        alert("Please correct the errors in the form.");
    };
}
// push data only if it is validated
function addEntry(){
    const details = validateFormDetails();
    data.push(details);
    renderTable();
}
// add default value for params here
function renderTableHelper(x){
    const tbody = document.getElementById("tableBody");
        tbody.innerHTML = "";
        if (x.length == 0) {
            resultBox.style.display = 'none';
        }
        else {
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
                <button class ="editbtn" onclick="editEntry(${index})">Edit</button>
                <button class = "dbtn" onclick="deleteEntry(${index})">Delete</button>
            </td>
        </tr>
        `;
            tbody.innerHTML += row;  //good
        });
}

// convert this to a single function
function renderTable(x) {
    if (x) {
        renderTableHelper(x);
    }
    else {
        renderTableHelper(data);
    }
}
// rename params to be more readable
function deleteEntry(i) {
    data.splice(i, 1);
    renderTable();
}
// keep variables at the top
let editIndex = null;

function editEntry(i) {
    editIndex = i;
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
    const languages = item.languages;
    checkboxes.forEach((cb) => {
        if (languages.includes(cb.value)) {
            cb.checked = true;
        }
    });

    // data.splice(i, 1);
    // renderTable();
    const btns = document.querySelectorAll(".editbtn");
    btns.forEach((b) => {
        b.disabled = true;
    })
    const dbtns = document.querySelectorAll(".dbtn");
    dbtns.forEach((d)=>{
        d.disabled = true;
    })

    const submit = document.getElementById("submit");
    const newSubmit = submit.cloneNode(true);
    submit.parentNode.replaceChild(newSubmit, submit);

    // remove eventListner and create a function for it
    newSubmit.addEventListener("click", function (e) {
        e.preventDefault();
        const details = validateFormDetails();
        if (details) {
            data.splice(i, 1, details);
            renderTable();
            newSubmit.parentNode.replaceChild(submit,newSubmit);
        }
    });
}


function filterBy(){

    let filterdata = [];
    let cityfilter = [];
    let genderfilter = [];
    const citycheckbtns = document.querySelectorAll("input[name='filter-city']");
    citycheckbtns.forEach((c)=>{
        if(c.checked){
            cityfilter.push(c.value);
        }
    });
    console.log(cityfilter);
    const gendercheckbtns = document.querySelectorAll("input[name='filter-gender']");
    gendercheckbtns.forEach((g)=>{
        if(g.checked){
            genderfilter.push(g.value);
        }
    });
    
    data.forEach((obj)=>{
        if(cityfilter.includes(obj.city)){
            filterdata.push(obj);
        }
        if(genderfilter.includes(obj.gender)){
            filterdata.push(obj);
        }
    });
    if(filterdata.length===0){
        renderTable();
        return ;
    }
    renderTable(filterdata);
    // const filtercont = document.getElementById("filter-container");
    // filtercont.style.display='none';
}