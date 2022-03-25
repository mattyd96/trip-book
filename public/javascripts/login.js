const signupForm = document.getElementById("signup-form");
const loginForm = document.getElementById("login-form");

const handleErrors = err => {
    //get error message divs
    const emailErr = document.querySelector('#email-error');
    const passErr = document.querySelector('#password-error');
    const usernameErr = document.querySelector('#username-error');

    // remove any existing error messages
    emailErr.classList.add('hidden');
    passErr.classList.add('hidden');
    usernameErr.classList.add('hidden');

    // get errorlist constructed on backend
    const errors = err.errorList;

    // loop through each error and update view
    errors.forEach(error => {
        if(error === 'email') {
            emailErr.textContent = 'Please enter a valid email';
            emailErr.classList.remove('hidden');
        }
        if(error === 'password') {
            passErr.textContent = 'Please enter a password over 8 characters long';
            passErr.classList.remove('hidden');
        }
        if(error === 'username') {
          usernameErr.textContent = 'Please enter a username';
          usernameErr.classList.remove('hidden');
        }
        if(error === 'username exists') { 
            usernameErr.textContent = 'This username is taken';
            usernameErr.classList.remove('hidden');
        }
        if(error === 'email exists') {
            emailErr.textContent = 'There is already an account with this email';
            emailErr.classList.remove('hidden');
        }
    });
};

// display login error
const handleLoginErrors = err => {
  const loginErr = document.querySelector('#login-error');

  loginErr.classList.add('hidden');

  if(err.errorList[0] === 'login') {
    loginErr.classList.remove('hidden');
  }
}

// sign up user
const signup = async (event) => {
  event.preventDefault();

  // get info
  const username = document.getElementById("signup-username").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  try {
    // create user
    const response = await fetch("/user/signup", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    // on success reload homepage
    if (response.ok) {
      document.location.replace('/')
    } else {
      // display login errors
      const error = await response.json();
      handleErrors(error);
    }

  } catch (err) {
    console.log(err);
  }
};

// login user
const login = async (event) => {
  event.preventDefault();

  // get info
  const id = document.getElementById("login-id").value;
  const password = document.getElementById("login-password").value;

  try{
    // try login
    const response = await fetch("/user/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ id, password }),
    });

    // go to home on success or display errrors
    if (response.ok) {
      document.location.replace('/')
    } else {
      const error = await response.json();
      handleLoginErrors(error);
    }

  } catch (err) {
    console.log(err);
  }
};

if(signupForm) {signupForm.addEventListener("submit", signup);}
if(loginForm) {loginForm.addEventListener("submit", login);}
