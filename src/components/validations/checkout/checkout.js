const checkoutValidateFirstName = (postData) => {
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

const checkoutValidateLastName = (postData) => {
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

const checkoutValidateEmailAddress = (postData) => {
    const errors     = [];
    let isValid      = true;
    const emailRegex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;

    if (postData === '') {
        errors.push('');
        isValid = true;
    } else if (!emailRegex.test(postData)) {
        errors.push('invalid email address');
        isValid = false;
    }
    return { isValid, errors };
}

const checkoutValidatePhoneNumber = (postData) => {
    const errors = [];
    let isValid  = true;
    // validate password
    const phoneRegex = /\d{3}-\d{3}-\d{4}/;
    if(postData === ''){
      errors.push('');
      isValid = true;
    }else if (!phoneRegex.test(postData)) {
      errors.push('Invalid primary phone, Phone format must - 011-233-4567');
      isValid = false;
    }else if(postData.includes(" ")) {
      errors.push('Phone number cannot have spaces');
      isValid = false;
    }
    return { isValid, errors };
}

const checkoutValidateAddress = (postData) => {
    const errors = [];
    let isValid  = true;
    if (postData === '') {
        errors.push('');
        isValid = true;
    } else if(!postData){
        errors.push('Please enter your address');
        isValid = false;
    }
    return { isValid, errors };
}

const checkoutValidateCity = (postData) => {
    const errors = [];
    let isValid  = true;

    // validate last Name
    if (postData === '') {
        errors.push('');
        isValid = true;
    } else if (postData.length < 2) {
        errors.push('last name must be at least 2 letters');
        isValid = false;
    }
    return { isValid, errors };
}

const checkoutValidateCountryState = (postData) => {
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

const checkoutValidateCountry = (postData) => {
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

export {
    checkoutValidateFirstName,
    checkoutValidateLastName,
    checkoutValidateEmailAddress,
    checkoutValidatePhoneNumber,
    checkoutValidateAddress,
    checkoutValidateCity,
    checkoutValidateCountryState,
    checkoutValidateCountry,
}

