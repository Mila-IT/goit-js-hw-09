const feedbackForm = document.querySelector('.feedback-form');

checkInputStart();

feedbackForm.addEventListener('input', fieldUserInfo);
feedbackForm.addEventListener('submit', sendUserInfo);

function fieldUserInfo() {
    const formData = {
        email: (feedbackForm.elements.email.value).trim(),
        message: (feedbackForm.elements.message.value).trim(),
    }

    localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

function sendUserInfo(event) {
    event.preventDefault();

    const email = (feedbackForm.elements.email.value).trim();
    const message = (feedbackForm.elements.message.value).trim();


    if (!email || !message) {
        alert('Please, fill in all fields before sending!');
        return;
    }

    const userInfo = { email: email, message: message };
    console.log(userInfo);

    feedbackForm.reset();
    localStorage.clear();
}

function checkInputStart() {
    const localInfo = JSON.parse(localStorage.getItem("feedback-form-state")) ?? {};

    feedbackForm.elements.email.value = localInfo.email || '';
    feedbackForm.elements.message.value = localInfo.message || '';
}