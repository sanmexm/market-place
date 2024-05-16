const profileValidateSelectedFile = (postData) => {
    const errors = [];
    let isValid  = true;

    // validate selected file
    if (postData === '') {
        errors.push('');
        isValid = true;
    }
    return { isValid, errors };
}

const profileValidatePrimaryPhone = (postData) => {
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
      errors.push('Phone Number cannot have spaces');
      isValid = false;
    }
    return { isValid, errors };
}

const profileValidateDateOfBirth = (postData) => {
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

const profileValidateSex = (postData) => {
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

const profileValidateCategory = (postData) => {
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

const profileValidateLocation = (postData) => {
    const errors = [];
    let isValid  = true;
    if (postData === '') {
        errors.push('');
        isValid = true;
    } else if(!postData){
        errors.push('Please select your location');
        isValid = false;
    }
    return { isValid, errors };
}

export {
    profileValidateSelectedFile,
    profileValidatePrimaryPhone,
    profileValidateDateOfBirth,
    profileValidateSex,
    profileValidateCategory,
    profileValidateLocation,
}