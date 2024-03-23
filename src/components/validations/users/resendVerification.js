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

export {
    userValidateEmailAddress,
}