import axios from 'axios';

    const API_URL = 'https://strapi.sdaoudi.ovh/api/tasks';
    const API_TOKEN = '24355a76bb4288aa78cf1b2731855ddf3d67f395ea45e3aabab6ace4d8ef8bc1be03ebab710a8db0c017671663b8f26682c029acd52b00b38abedb0078e4ac53e1b96a816db70faec20918324894aeda4381c75804566d5df4dec6a9772195b7480ff7a1a53f6d9231844f57366251b0b51a437b4677707f88cdbbdf2e377d05';

    const api = axios.create({
      baseURL: API_URL,
      headers: {
        Authorization: `Bearer ${API_TOKEN}`
      }
    });

    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    async function fetchTasks() {
      try {
        const response = await api.get();
        renderTasks(response.data.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des tâches:', error);
      }
    }

    async function addTask(description) {
      try {
        await api.post('', {
          data: {
            description,
            done: false
          }
        });
        fetchTasks();
      } catch (error) {
        console.error('Erreur lors de l\'ajout de la tâche:', error);
      }
    }

    async function toggleTask(documentId, done, description) {
      try {
        await api.put(`/${documentId}`, {
          data: {
            description,
            done: !done
          }
        });
        fetchTasks();
      } catch (error) {
        console.error('Erreur lors de la modification de la tâche:', error);
      }
    }

    function renderTasks(tasks) {
      if (!Array.isArray(tasks)) {
        console.error('Les tâches ne sont pas un tableau:', tasks);
        return;
      }

      taskList.innerHTML = tasks.map(task => {
        if (!task || !task.documentId) {
          console.error('Tâche invalide:', task);
          return '';
        }

        return `
          <li class="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <input
                type="checkbox"
                ${task.done ? 'checked' : ''}
                onchange="window.toggleTask('${task.documentId}', ${task.done}, '${task.description.replace(/'/g, "\\'")}')"
                class="w-5 h-5 text-primary rounded border-primary focus:ring-primary"
              />
              <span class="${task.done ? 'line-through text-gray-500' : 'text-gray-700'}">
                ${task.description || 'Tâche sans description'}
              </span>
            </div>
          </li>
        `;
      }).join('');
    }

    if (taskForm && taskInput && taskList) {
      taskForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const description = taskInput.value.trim();
        if (description) {
          await addTask(description);
          taskInput.value = '';
        }
      });

      window.toggleTask = toggleTask;
      fetchTasks();
    } else {
      console.error('Éléments HTML non trouvés');
    }
