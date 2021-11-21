document.getElementById('signupBtn').addEventListener('click', e => {
    const username = document.getElementById('username').value,
      password = document.getElementById('password').value;
      password2 = document.getElementById('password2').value;
    if(password != password2) {
        status('error', 'Passwords do not match.');
    } else {
        fetch('/webapp/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            }, 
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(response => response.json())
        .then(json => {
            if(json.error) {
                status('error', `ERROR: ${json.error}`);
            } else {
                status('ok', 'Successfully signed up.');
            }
        });
    }
});

function status(status, msg) {
    document.getElementById('msg').innerHTML = `<span class='${status}'>${msg}</span>`;
}
