import { useState } from 'react';

export default function App() {
  const [tasks, setTasks] = useState([
    'Estudar react',
    'Estudar Node',
    'Estudar InfoSEC',
  ]);

  const [input, setInput] = useState('');

  function addTask() {
    if (!input) {
      alert('Preencha o campo com uma nova tarefa');
      return;
    }

    setTasks((tarefas) => [...tarefas, input]);
    setInput('');
  }

  function deleteTask(item: string) {
    const removeTask = tasks.filter((task) => task !== item);
    setTasks(removeTask);
  }

  function editTask(item: string) {
    alert(item);


    /*
    pra editar precisa: 

    -criar um novo input pra receber o novo texto
    -enviar o valor do novo texto para a tarefa (no mesmo índice da anterior)
    
    */
  }

  return (
    <div>
      <input
        placeholder="Digite uma tarefa nova"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={addTask}>Adicionar</button>
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
