function onSignIn(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token

    axios.post('http://localhost:3000/user/login', {
            token: id_token
        })
        .then(response => {
            localStorage.setItem('token', response.data)
        })
        .catch(err => {
            console.log(err)
        })

    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });

    axios.post('http://localhost:3000/user/logout')
        .then(response => {
            localStorage.removeItem('token')
            $('.soundtrack').empty()
            $('.message').empty()
            $('.message').append(
                `
                <p>${JSON.stringify(response.data)}</p>
                `
            )
        })
        .catch(err => {
            console.log(err)
        })
}