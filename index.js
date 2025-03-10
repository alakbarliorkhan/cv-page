/* Dark/Light Mode */

const dayNight = document.querySelector('.day-night');
dayNight.addEventListener('click', () => {
  dayNight.querySelector('i').classList.toggle('fa-sun');
  dayNight.querySelector('i').classList.toggle('fa-moon');
  document.body.classList.toggle('dark');
});

window.addEventListener('load', () => {
  if (document.body.classList.contains('dark')) {
    dayNight.querySelector('i').classList.add('fa-sun');
  } else {
    dayNight.querySelector('i').classList.add('fa-moon');
  }
});

/* Typing Animation */

var typed = new Typed('.typing', {
  strings: [
    '',
    'Salesforce Enthusiast',
    'Marketing Automation Architect',
    'Full Stack Web Developer',
  ],
  typeSpeed: 100,
  Backspeed: 60,
  loop: true,
});

/* Update Years in IT and in Salesforce */

[...document.querySelectorAll('.it-exp')].forEach(
  (elem) => (elem.textContent = new Date().getFullYear() - 2015)
);
document.querySelector('.sf-exp').textContent = new Date().getFullYear() - 2019;

/* Changing Aside Active Link */

const nav = document.querySelector('.nav');
const navList = nav.querySelectorAll('li');
const totalNavList = navList.length;
const allSection = document.querySelectorAll('.section');
const totalSection = allSection.length;

for (let i = 0; i < totalNavList; i++) {
  const a = navList[i].querySelector('a');
  a.addEventListener('click', function () {
    removeBackSection();
    for (let j = 0; j < totalNavList; j++) {
      if (navList[j].querySelector('a').classList.contains('active')) {
        addBackSection(j); /*allSection[j].classList.add('back-section');*/
      }
      navList[j].querySelector('a').classList.remove('active');
    }
    this.classList.add('active');
    showSection(this);

    if (window.innerWidth < 1200) {
      asideSectionTogglerBtn();
    }
  });
}

function addBackSection(num) {
  allSection[num].classList.add('back-section');
}

function removeBackSection() {
  for (let i = 0; i < totalSection; i++) {
    allSection[i].classList.remove('back-section');
  }
}

function showSection(element) {
  for (let i = 0; i < totalSection; i++) {
    allSection[i].classList.remove('active');
  }

  const target = element.getAttribute('href').split('#')[1];
  document.querySelector('#' + target).classList.add('active');
}

function updateNav(element) {
  for (let i = 0; i < totalNavList; i++) {
    navList[i].querySelector('a').classList.remove('active');
    const target = element.getAttribute('href').split('#')[1];
    if (target === navList[i].querySelector('a').getAttribute('href').split('#')[1]) {
      navList[i].querySelector('a').classList.add('active');
    }
  }
}

/* Activating Mobile Menu */

const navTogglerBtn = document.querySelector('.nav-toggler');
const aside = document.querySelector('.aside');

navTogglerBtn.addEventListener('click', () => {
  asideSectionTogglerBtn();
});

function asideSectionTogglerBtn() {
  aside.classList.toggle('open');
  navTogglerBtn.classList.toggle('open');
  for (let i = 0; i < totalSection; i++) {
    allSection[i].classList.toggle('open');
  }
}

/* Email Send */
(function () {
  emailjs.init({
    publicKey: '7OliewRN911CEQFFQ',
  });
})();

document.getElementById('submit-btn').addEventListener('click', submitForm);

function submitForm(event) {
  event.preventDefault();

  const name = document.getElementById('contact-name');
  const email = document.getElementById('contact-email');
  const subject = document.getElementById('contact-subject');
  const message = document.getElementById('message');
  const errorMsg = document.querySelector('.error-message');

  errorMsg.style.display = 'none';

  if (validateForm(name, email, subject, message)) {
    event.target.removeEventListener('click', submitForm);
    event.target.innerText = 'Sending...';
    name.disabled = true;
    email.disabled = true;
    subject.disabled = true;
    message.disabled = true;

    var templateParams = {
      name: name.value,
      email: email.value,
      subject: subject.value,
      message: message.value,
    };

    emailjs
      .send('service_fkfn1ht', 'template_3dxczut', templateParams)
      .then(
        (response) => {
          name.value = '';
          email.value = '';
          subject.value = '';
          message.value = '';
          event.target.innerText = 'Sent!';
        },
        (error) => {
          event.target.innerText = 'Send Failed!';
          errorMsg.style.display = 'block';
        }
      )
      .finally(() => {
        setTimeout(() => {
          event.target.innerText = 'Send Message';
          event.target.addEventListener('click', submitForm);
          name.disabled = false;
          email.disabled = false;
          subject.disabled = false;
          message.disabled = false;
        }, 5000);
      });
  }
}

function validateForm(...elems) {
  let formValid = true;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  elems.forEach((elem) => {
    if (
      !elem.value ||
      elem.value.trim() === '' ||
      elem.value.trim().length < 3 ||
      (elem.type === 'email' && !emailRegex.test(elem.value))
    ) {
      elem.classList.add('error');
      formValid = false;
    } else {
      elem.classList.remove('error');
    }
  });

  return formValid;
}
