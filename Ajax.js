const getAPI = (name) => {
  return new Promise((resolve, reject) => {
    const ajax = new XMLHttpRequest();
    
    ajax.open("GET", "https://restcountries.eu/rest/v2/name/" + name);
    ajax.responseType = "json";
    ajax.send();

    ajax.addEventListener("readystatechange", () => {
      if (ajax.readyState === 4) {
        if (ajax.status === 200) return resolve(ajax.response);
        return reject("Nada encontrado");
      }
    });
  });
};
