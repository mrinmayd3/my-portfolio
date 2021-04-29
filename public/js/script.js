// for localStorage save
let themeValue = localStorage.getItem('themeValue');

if (themeValue == null) {
    setTheme('blue');
} else {
    setTheme(themeValue);
}

let theme = document.getElementsByClassName('theme-dot');

for (i = 0; i < theme.length; i++) {
    theme[i].addEventListener('click', function () {
        let mode = this.dataset.mode;
        // console.log(mode);
        setTheme(mode);
    });
}

function setTheme(mode) {

    if (mode == 'blue') {
        document.getElementById('theme-style').href = '/css/style.css'
    }

    if (mode == 'light') {
        document.getElementById('theme-style').href = '/css/light.css'
    }

    if (mode == 'green') {
        document.getElementById('theme-style').href = '/css/green.css'
    }

    if (mode == 'purple') {
        document.getElementById('theme-style').href = '/css/purple.css'
    }

    localStorage.setItem('themeValue', mode);
}

// send 
const form = document.querySelector('#contact-form');
const successMsg = document.querySelector('#s-msg');


const senderName = document.getElementById('name');
const subject = document.getElementById('subject');
const email = document.getElementById('email');
const message = document.getElementById('message');

let isNameCorrect = false;
let isSubjectCorrect = false;
let isEmailCorrect = false;
let isMessageCorrect = false;

form.addEventListener('submit', async function (e) {
    e.preventDefault();


    // check input for validation
    checkInputs();

    if (isNameCorrect && isSubjectCorrect && isEmailCorrect && isMessageCorrect) {
        const name = form.name.value;
        const subject = form.subject.value;
        const email = form.email.value;
        const message = form.message.value;

        const btn = document.querySelector('#submit-btn');
        btn.innerHTML = 'sending...';

        try {
            const res = await fetch('/send', {
                method: 'POST',
                body: JSON.stringify({ name, subject, email, message }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            // console.log(data.msg);

            if (data.msg) {
                form.name.value = '';
                form.subject.value = '';
                form.email.value = '';
                form.message.value = '';

                const formControl = document.querySelectorAll('.form-control');
                formControl.forEach(fc => {
                    fc.className = 'form-control';
                });

                btn.innerHTML = '<i class="far fa-paper-plane"></i> Send';
                successMsg.classList.add('success-msg');
                successMsg.innerHTML = '<p><i class="far fa-check-circle"></i> Successfully Send</p>';

                setTimeout(() => {
                    successMsg.classList.remove('success-msg');
                    successMsg.innerHTML = '';
                }, 3000);
            }

        } catch (e) {
            console.log(e);
        }
    }
});


onChangeInput(senderName);
onChangeInput(subject);
onChangeInput(email);
onChangeInput(message);

// helper functions
function checkInputs() {
    // get the values from the form inputs
    const nameValue = senderName.value.trim();
    const subjectValue = subject.value.trim();
    const emailValue = email.value.trim();
    const messageValue = message.value.trim();

    if (nameValue === '') {
        // show error
        // add error class
        isNameCorrect = false;
        setError(senderName, 'Name can not be blank');
    } else if (nameValue.length < 3) {
        isNameCorrect = false;
        setError(senderName, 'Please enter at least 3 characters');
    } else {
        // add success class
        isNameCorrect = true;
        setSuccess(senderName);
    }

    if (subjectValue === '') {
        isSubjectCorrect = false;
        setError(subject, 'Subject can not be blank');
    } else if (subjectValue.length < 5) {
        isSubjectCorrect = false;
        setError(subject, 'Please enter at least 5 characters');
    } else {
        isSubjectCorrect = true;
        setSuccess(subject);
    }

    if (messageValue === '') {
        isMessageCorrect = false;
        setError(message, 'Message can not be blank');
    } else if (messageValue.length < 10) {
        isMessageCorrect = false;
        setError(message, 'Please enter at least 10 characters');
    } else {
        isMessageCorrect = true;
        setSuccess(message);
    }

    if (emailValue === '') {
        isEmailCorrect = false;
        setError(email, 'Email can not be blank');
    } else if (!isEmail(emailValue)) {
        isEmailCorrect = false;
        setError(email, 'Email is not valid');
    } else {
        isEmailCorrect = true;
        setSuccess(email);
    }


}

function setError(input, msg) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');

    // add error class and message
    small.innerText = msg;
    formControl.className = 'form-control error';
}

function setSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function isEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function onChangeInput(input) {
    input.addEventListener('input', () => {
        const formControl = input.parentElement;
        formControl.className = 'form-control';
    })
}