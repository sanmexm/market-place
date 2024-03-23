const userValidateEmailAddress = (postData, getAllUsers) => {
    const errors     = [];
    let isValid      = true;
    const emailRegex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;

    if (postData === '') {
      errors.push('');
      isValid = true;
    } else if (!emailRegex.test(postData)) {
      errors.push('Invalid email address');
      isValid = false;
    } else if (!Array.isArray(!getAllUsers) && !getAllUsers.map(user => user.emailAddress).includes(postData)) {
    // } else if (!getAllUsers.map(user => user.emailAddress).includes(postData)) {
      errors.push('Email address does not exist');
      isValid = false;
    }
    return { isValid, errors };
}

const userValidatePassword = (postData) => {
    const errors = [];
    let isValid  = true;
    // validate password
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,}$/;
    if(postData === ''){
      errors.push('');
      isValid = true;
    }else if (!passwordRegex.test(postData)) {
      errors.push('Password must be at least 8 characters long, must contain one capital letter and one number');
      isValid = false;
    }else if(postData.includes(" ")) {
      errors.push('Password cannot have spaces');
      isValid = false;
    }
    return { isValid, errors };
}

const userValidateConfirmPassword = (postData) => {
    // the confirm password function should connect from the postData since your'e comparing two fields
    const errors = [];
    let isValid  = true;
    // validate confirm password
    if (postData.password !== postData.confirmPassword) {
      errors.push('Passwords do not match');
      isValid = false;
    }
    return { isValid, errors };
}

export {
    userValidateEmailAddress,
    userValidatePassword,
    userValidateConfirmPassword,
}