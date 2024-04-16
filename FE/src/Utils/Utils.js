



export const extractAxiosError = (ex) => {

   
    if (ex.response?.data?.msg != null) {
        return ex.response?.data?.msg;
    }
    if (ex?.errors != null && ex?.errors.length != 0) {
        const err = ex.errors[0];
        return `Expected ${err.expected} in ${err.path.join('.')} but received ${err.received}`
    }
    if (ex.response?.data != null && ex.response?.data?.length != 0) {
        return ex.response?.data[0].message;
    }
    return ex?.message;
}