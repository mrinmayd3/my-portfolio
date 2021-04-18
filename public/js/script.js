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

form.addEventListener('submit', async function (e) {
    e.preventDefault();

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
});