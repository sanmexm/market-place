const contactUsValidateFirstName = (postData) => {
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

const contactUsValidateLastName = (postData) => {
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

const contactUsValidateEmailAddress = (postData) => {
    const errors = [];
    let isValid  = true;
    const emailRegex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
    // validate Email Address
    if (postData === '') {
        errors.push('');
        isValid = true;
    } else if (!emailRegex.test(postData)) {
        errors.push('invalid email address');
        isValid = false;
    }
    return { isValid, errors };
}

const contactUsValidateMessage = (postData) => {
    const errors = [];
    let isValid  = true;
    // validate description
    if(postData === ''){
      errors.push('');
      isValid = true;
    }else if(postData.length < 4){
      errors.push('Message must be at least 4 characters');
      isValid = false;
    }
    return { isValid, errors };
}

export {
    contactUsValidateFirstName,
    contactUsValidateLastName,
    contactUsValidateEmailAddress,
    contactUsValidateMessage,
}