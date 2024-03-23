const userValidateUsername = (postData) => {
    const errors = [];
    let isValid  = true;
    // validate username
    if(postData === ''){
        errors.push('');
        isValid = true;
    }
    return { isValid, errors };
}

const userValidatePassword = (postData) => {
    const errors = [];
    let isValid  = true;
    // validate password
    if(postData === ''){
      errors.push('');
      isValid = true;
    }
    return { isValid, errors };
}

export{
    userValidateUsername,
    userValidatePassword
}
