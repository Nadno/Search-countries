export default function myFetch(URL) {
  return new Promise(function(resolve, reject) {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", () => {
      const requestOk = xhr.readyState === 4 && xhr.status === 200;
      const requestNotOk = xhr.readyState === 4;

      if (requestOk) {
        return resolve({
          data: xhr.response,
          status: xhr.status,
          json() {
            try {
              return JSON.parse(this.data);
            } catch (err) {
              throw new Error("Não foi possível converter a resposta em Objeto")
            }
          },
        });
      }

      if (requestNotOk) reject(`(status code: ${xhr.status}). Ocorreu um erro ao efetuar a requisição.`)
    })

    xhr.open("GET", URL);
    xhr.send();
  });
};