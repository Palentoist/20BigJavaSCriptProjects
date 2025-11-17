const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    statusEl.textContent = '';
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';

    const data = {
        service: form.service.value,
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        phone: form.phone.value.trim(),
        subject: form.subject.value.trim(),
        message: form.message.value.trim()
    };

    if (!data.service || !data.name || !data.email || !data.message) {
        statusEl.textContent = 'Please fill in all required fields.';
        statusEl.style.background = '#f8d7da';
        statusEl.style.color = '#721c24';
        statusEl.style.border = '1px solid #f5c6cb';
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Submit <i class="fas fa-arrow-right"></i>';
        return;
    }

    try {
        // Simulate API call - replace with actual endpoint
        await new Promise(r => setTimeout(r, 1200));

        statusEl.textContent = 'Thank you! Your message has been submitted successfully. We will contact you soon.';
        statusEl.style.background = '#d4edda';
        statusEl.style.color = '#155724';
        statusEl.style.border = '1px solid #c3e6cb';
        form.reset();
    } catch (err) {
        console.error(err);
        statusEl.textContent = 'Something went wrong. Please try again later.';
        statusEl.style.background = '#f8d7da';
        statusEl.style.color = '#721c24';
        statusEl.style.border = '1px solid #f5c6cb';
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Submit <i class="fas fa-arrow-right"></i>';
    }
});