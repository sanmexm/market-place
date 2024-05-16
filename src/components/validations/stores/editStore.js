const postValidateSelectedFile = (postData) => {
    const errors = [];
    let isValid  = true;

    // validate selected file
    if (postData === '') {
        errors.push('');
        isValid = true;
    }
    return { isValid, errors };
}

const postValidateCoverFile = (postData) => {
    const errors = [];
    let isValid  = true;

    // validate selected file
    if (postData === '') {
        errors.push('');
        isValid = true;
    }
    return { isValid, errors };
}

const postValidateName = (postData, getAllStores) => {
    const errors = [];
    let isValid  = true;
    const nameRegex = /^[A-Za-z\s]+$/;

    // validate title
    if (postData === '') {
        errors.push('');
        isValid = true;
    } else if (Array.isArray(getAllStores) && getAllStores.map(store => store.name).includes(postData)) {
        errors.push('store name already exist');
        isValid = false;
    } else if (postData.length < 2) {
        errors.push('name must be at least 2 letters');
        isValid = false;
    } else if (!nameRegex.test(postData)) {
        errors.push('name must contain only letters');
        isValid = false;
    } else if(postData.length > 50) {
        errors.push('name must not be more than 50 letters');
        isValid = false;
    }
    return { isValid, errors };
}

const postValidateTitle = (postData) => {
    const errors = [];
    let isValid  = true;
    const titleRegex = /^[A-Za-z\s]+$/;

    // validate title
    if (postData === '') {
        errors.push('');
        isValid = true;
    } else if (postData.length < 2) {
        errors.push('title must be at least 2 letters');
        isValid = false;
    } else if (!titleRegex.test(postData)) {
        errors.push('title must contain only letters');
        isValid = false;
    } else if(postData.length > 100) {
        errors.push('title must not be more than 100 letters');
        isValid = false;
    }
    return { isValid, errors };
}


const postValidateDescription = (postData) => {
    const errors = [];
    let isValid  = true;

    //validate description
    if (postData === '') {
        errors.push('');
        isValid = true;
    } else if (postData.length < 2) {
        errors.push('description must be at least 2 words');
        isValid = false;
    } else if(postData.length > 500) {
        errors.push('description must not be more than 500 words');
        isValid = false;
    }
    return { isValid, errors };
}


export {
    postValidateName,
    postValidateTitle,
    postValidateDescription,
    postValidateSelectedFile,
    postValidateCoverFile,
}