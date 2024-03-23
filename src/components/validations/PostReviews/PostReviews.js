const userValidateReview = (postData) => {
    const errors = [];
    let isValid  = true;
    // validate description
    if(postData === ''){
      errors.push('');
      isValid = true;
    }else if(postData.length < 3){
      errors.push('Review must be at least 3 characters');
      isValid = false;
    }
    return { isValid, errors };
}

export {
    userValidateReview
}