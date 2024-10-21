export const generateQueryString = (searchParams: any) => {
    Object.keys(searchParams).forEach((key) => {
      if (searchParams[key] === "" || searchParams[key] === undefined) {
        delete searchParams[key];
      }
    });
  
    let queryString = "?" + new URLSearchParams(searchParams).toString();
  
    return queryString.slice(1);
  };