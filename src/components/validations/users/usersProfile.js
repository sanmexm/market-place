const usersValidateSelectedFile = (postData) => {
    const errors = [];
    let isValid  = true;

    // validate selected file
    if (postData === '') {
        errors.push('');
        isValid = true;
    }
    return { isValid, errors };
}

const usersValidateFirstName = (postData) => {
    const errors = [];
    let isValid  = true;

    // validate first Name
    if (postData === '') {
        errors.push('');
        isValid = true;
    } else if (postData.length < 2) {
        errors.push('first name must be at least 2 letters');
        isValid = false;
    } else if (!/^[a-zA-Z]+$/.test(postData)) {
        errors.push('first name must contain only letters');
        isValid = false;
    }
    return { isValid, errors };
}

const usersValidateMiddleName = (postData) => {
    const errors = [];
    let isValid  = true;

    // validate last Name
    if (postData === '') {
        errors.push('');
        isValid = true;
    } else if (postData.length < 2) {
        errors.push('middle name must be at least 2 letters');
        isValid = false;
    } else if (!/^[a-zA-Z]+$/.test(postData)) {
        errors.push('middle name must contain only letters');
        isValid = false;
    }
    return { isValid, errors };
}

const usersValidateLastName = (postData) => {
    const errors = [];
    let isValid  = true;

    // validate last Name
    if (postData === '') {
        errors.push('');
        isValid = true;
    } else if (postData.length < 2) {
        errors.push('last name must be at least 2 letters');
        isValid = false;
    } else if (!/^[a-zA-Z]+$/.test(postData)) {
        errors.push('last name must contain only letters');
        isValid = false;
    }
    return { isValid, errors };
}

const usersValidateDateOfBirth = (postData) => {
    const errors = [];
    let isValid  = true;
    if (postData === '') {
        errors.push('');
        isValid = true;
    } else if(!postData){
        errors.push('Please select your date of birth');
        isValid = false;
    }
    return { isValid, errors };
}

const usersValidateSex = (postData) => {
    const errors = [];
    let isValid  = true;
    if (postData === '') {
        errors.push('');
        isValid = true;
    } else if(!postData){
        errors.push('Please select your gender');
        isValid = false;
    }
    return { isValid, errors };
}

const usersValidatePrimaryPhone = (postData) => {
    const errors = [];
    let isValid  = true;
    // validate password
    const phoneRegex = /\d{3}-\d{3}-\d{4}/;
    if(postData === ''){
      errors.push('');
      isValid = true;
    }else if (!phoneRegex.test(postData)) {
      errors.push('Invalid primary phone, Phone format must - 044-456-7890');
      isValid = false;
    }else if(postData.includes(" ")) {
      errors.push('primary cannot have spaces');
      isValid = false;
    }
    return { isValid, errors };
}

const usersValidateUsername = (postData, getAllUsers) => {
    const errors = [];
    let isValid  = true;
    // validate username
    if(postData === ''){
        errors.push('');
        isValid = true;
    } else if (Array.isArray(getAllUsers) && getAllUsers.map(user => user.username).includes(postData)) {
    // } else if(getAllUsers.map(user => user.username).includes(postData)){
        errors.push('user already exist');
        isValid = false;
    } else if (postData.length <= 6) {
        errors.push('username must be at least 6 characters long');
        isValid = false;
    }
    return { isValid, errors };
}

const usersValidateEmailAddress = (postData, getAllUsers) => {
    const errors     = [];
    let isValid      = true;
    const emailRegex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;

    if (postData === '') {
        errors.push('');
        isValid = true;
    } else if (Array.isArray(getAllUsers) && getAllUsers.map(user => user.emailAddress).includes(postData)) {
    // } else if (getAllUsers.map(user => user.emailAddress).includes(postData)) {
        errors.push('email address already exist');
        isValid = false;
    } else if (!emailRegex.test(postData)) {
        errors.push('invalid email address');
        isValid = false;
    }
    return { isValid, errors };
}

const usersValidateCategory = (postData) => {
    const errors = [];
    let isValid  = true;
    if (postData === '') {
        errors.push('');
        isValid = true;
    } else if(!postData){
        errors.push('Please select a category');
        isValid = false;
    }
    return { isValid, errors };
}

const usersValidateCountry = (postData) => {
    const errors = [];
    let isValid  = true;
    if (postData === '') {
        errors.push('');
        isValid = true;
    } else if(!postData){
        errors.push('Please select your country');
        isValid = false;
    }
    return { isValid, errors };
}

const usersValidateCountryState = (postData) => {
    const errors = [];
    let isValid  = true;
    if (postData === '') {
        errors.push('');
        isValid = true;
    } else if(!postData){
        errors.push('Please select your state');
        isValid = false;
    }
    return { isValid, errors };
}

const usersValidatePassword = (postData) => {
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

const usersValidateConfirmPassword = (postData) => {
    // the confirm password function should connect from the postData since you're comparing two fields
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
    usersValidateSelectedFile,
    usersValidateFirstName,
    usersValidateMiddleName,
    usersValidateLastName,
    usersValidateDateOfBirth,
    usersValidateSex,
    usersValidatePrimaryPhone,
    usersValidateUsername,
    usersValidateEmailAddress,
    usersValidateCategory,
    usersValidateCountry,
    usersValidateCountryState,
    usersValidatePassword,
    usersValidateConfirmPassword,
}