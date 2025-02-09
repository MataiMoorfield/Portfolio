function handleForm(event) {
    event.preventDefault();

    grecaptcha.ready(function() {
      grecaptcha.execute('YOUR_SITE_KEY', {action: 'homepage'}).then(function(token) {
        let form = document.getElementById('contact-form');
        let tokenInput = document.createElement('input');
        tokenInput.type = 'hidden';
        tokenInput.name = 'g-recaptcha-response';
        tokenInput.value = token;
        form.appendChild(tokenInput);

        form.submit();

      });
    });
    return false;
  }