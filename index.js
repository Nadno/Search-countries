const search = document.getElementById('search');
const searchInput = document.getElementById('country');
const searchSelectRegion = document.querySelector('.search__select__region');
const dataList = document.getElementById('founded__countries');

let waitToGetValue = 0;

const parseJson = (res) => {
  try {
    return res.json();
  } catch {
    return null;
  }
};

searchInput.addEventListener('keypress', ({ target }) => {
  if (waitToGetValue) clearTimeout(waitToGetValue);
  
  waitToGetValue = setTimeout(searchForNames, 1000);

  function searchForNames() {
    waitToGetValue = 0;
    fetch(`https://restcountries.eu/rest/v2/name/${target.value}`)
      .then(parseJson)
      .then(res => {
        dataList.innerHTML = '';
        res.forEach(country=> {
          const option = document.createElement('option');
          option.value = country.name;
          dataList.appendChild(option);
        });
      })
      .catch(console.log)
  };
});

search.onsubmit = (event) => {
  event.preventDefault();
};