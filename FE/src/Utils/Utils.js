

export function isUrlMatching(url, routes) {
    for (const pattern of routes) {
      const escapedPattern = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  
      const regex = new RegExp('^' + escapedPattern.replace(/:[^\s/]+/g, '([^/]+)') + '$');
      if (regex.test(url))
        return true;
    }
    return false;
  }

export const extractAxiosError = (ex) => {

   
    if (ex.response?.data?.msg != null) {
        return ex.response?.data?.msg;
    }
    if (ex?.errors != null && ex?.errors.length != 0) {
        const err = ex.errors[0];
        return `Expected ${err.expected} in ${err.path.join('.')} but received ${err.received}`
    }
    if (ex.response?.data != null && ex.response?.data?.length != 0 && ex.response?.data[0]?.message != null) {
        return ex.response?.data[0]?.message;
    }
    return ex?.message;
}