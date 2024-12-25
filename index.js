const inputElm = document.querySelector('.form-control');

const formElm = document.querySelector('.input-group');
formElm.addEventListener('submit', (e) => {
  e.preventDefault();
  const newTask = document.querySelector('.form-control');
  const taskList = document.querySelector('.list-group');
  if (newTask.value !== '') {
    taskList.innerHTML += `
    <li class="list-group-item d-flex gap-2 align-items-center">
      <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
      <p style="margin-right: auto; margin-bottom: 0">${newTask.value}</p>
      <button type="button" class="btn btn-warning">Delete</button>
    </li>
  `;
  }
  newTask.value = '';
});
