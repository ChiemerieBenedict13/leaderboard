document.addEventListener('DOMContentLoaded', function () {

  getData((data) => {
    loadInterns(data);
  })

});

function sortEvent() {
  const elem = document.querySelector('.sort');
  elem.addEventListener('click', function () {
    getData(function (data) {
      sortInterns(data)
    })
  });
};

sortEvent();

const getData = async (callback) => {
  try {
    const data = await fetch('users.json');
    const response = await data.json();
    callback(response);
  } catch (e) {
    callback({
      error: 'Unable to load interns'
    })
  }
}

function sortInterns(data) {
  data.sort(function (a, b) {
    return b.points - a.points;
  });

  loadInterns(data);
}

function loadInterns(data) {
  let elem = document.querySelector('.interns tbody');
  let html = '';
  let position = 3;

  let filterData = data.filter((val) => {
    if ((val.name && val.slackid && val.email && val.points) !== undefined) {
      return val;
    }
  });


  filterData.forEach(val => {
    html += `
       <tr>
            <th scope="row">${++position}</th>
            <td class="name">${val.name}</td>
            <td>${val.slackid}</td>
            <td>${val.email}</td>
            <td class="point"> <span class="digit">${val.points}</span><span>Points</span></td>
            <td><i class="fa fa-share-alt" aria-hidden="true"></i></td>
          </tr>
          <tr class="breaker"></tr>
`;
  });

  elem.innerHTML = html;
};
