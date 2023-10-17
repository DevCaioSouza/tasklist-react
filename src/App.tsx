import { useEffect, useState } from 'react';

export default function App() {
  const [tasks, setTasks] = useState<string[]>([]);

  const [input, setInput] = useState('');
  const [editedTask, setEditedTask] = useState({
    enabled: false,
    task: '',
  });

  useEffect(() => {
    const savedTasks = localStorage.getItem('@cursoreact');

    console.log(savedTasks);
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  function addTask() {
    if (!input) {
      alert('Preencha o campo com uma nova tarefa');
      return;
    }

    if (editedTask.enabled) {
      handleSaveEdit();
      return;
    }

    setTasks((tarefas) => [...tarefas, input]);
    setInput('');

    localStorage.setItem('@cursoreact', JSON.stringify([...tasks, input]));
  }

  function handleSaveEdit() {
    const findTaskIndex = tasks.findIndex((task) => task === editedTask.task);
    const allTasks = [...tasks]; //forma correta de manipular useStates

    allTasks[findTaskIndex] = input; //Método usado p/ sobrescrever o valor do elemento no Array
    setTasks(allTasks); //Aqui é o tasks porém contendo a task editada

    setEditedTask({
      enabled: false,
      task: '',
    });

    setInput('');

    localStorage.setItem('@cursoreact', JSON.stringify(allTasks));
  }

  function deleteTask(item: string) {
    const removeTask = tasks.filter((task) => task !== item);
    setTasks(removeTask);

    localStorage.setItem('@cursoreact', JSON.stringify(removeTask));
  }

  function editTask(item: string) {
    setInput(item);
    setEditedTask({
      enabled: true,
      task: item,
    });
  }

  return (
    <div>
      <input
        placeholder="Digite uma tarefa nova"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={addTask}>
        {editedTask.enabled ? 'Confirmar edição' : 'Adicionar tarefa'}
      </button>
      {/* <button onClick={addTask}>Adicionar</button> */}
      <h1>Lista de tarefas: </h1> <hr /> <br />
      {tasks.map((item, index) => (
        <section key={item}>
          <span>
            {index + 1} :{item + '  '}
          </span>
          <button onClick={() => editTask(item)}>Editar tarefa</button>
          <button onClick={() => deleteTask(item)}>Excluir</button>
        </section>
      ))}
      <br /> <hr />
    </div>
  );
}
