const sb = supabase.createClient(
  'https://gssgupvgpomnwedgnmci.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdzc2d1cHZncG9tbndlZGdubWNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUxNTQ0MjUsImV4cCI6MjA1MDczMDQyNX0.vs_0FX2O37Gf-FKniEqG_JJFxNqJ2aNGr8dCuZLUUgA',
);

const formElm = document.querySelector('.input-group');
const newTask = document.querySelector('.form-control');
const taskList = document.querySelector('.list-group');

formElm.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (newTask.value !== '') {
    await sb
      .from('task')
      .insert({ created_at: new Date(), task: newTask.value });

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

sb.from('task')
  .select()
  .then(({ data, error }) => {
    if (error) {
      console.error(error);
      return;
    }

    for (const task of data) {
      taskList.innerHTML += `
        <li class="list-group-item d-flex gap-2 align-items-center">
          <input class="form-check-input" type="checkbox" ${
            task.done === true ? 'checked' : ''
          } id="flexCheckDefault">
          <p style="margin-right: auto; margin-bottom: 0">${task.task}</p>
          <button type="button" class="btn btn-warning">Delete</button>
        </li>
      `;
    }

    const checkboxList = document.querySelectorAll('.form-check-input');
    for (let i = 0; i < checkboxList.length; i++) {
      checkboxList[i].addEventListener('change', async (e) => {
        const { error } = await sb
          .from('task')
          .update({ done: e.target.checked })
          .eq('id', data[i].id);
        if (error) console.error(error);
      });
    }
  });
