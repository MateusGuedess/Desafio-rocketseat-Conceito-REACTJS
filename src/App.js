import React, { useState, useEffect } from "react";

import "./styles.css";

import api from './services/api'

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('/repositories')
    .then(response => {
      setRepositories(response.data)
      console.log(response.data)
    })
  }, [])

  async function handleAddRepository() {
    // TODO
    const response = await api.post('/repositories', {
      title: `Desafio front ${Date.now()}`,
      url: "https://github.com/Rocketseat/bootcamp-gostack-desafios/tree/master/desafio-conceitos-nodejs",
      techs: ["Node.JS", "React"]
    })
    const repositorie = response.data
    setRepositories([...repositories, repositorie])


  }

  async function handleRemoveRepository(id) {
    // TODO
    const response = await api.delete(`/repositories/${id}`)

    const index = repositories.findIndex( repositorie => repositorie.id === id)
    console.log(index)
    setRepositories([...repositories.slice(0, index), ...repositories.slice(index + 1)])
    console.log(repositories)
  }
  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map( repositorie => 
          <li key={repositorie.id}>
            {repositorie.title}

            <button onClick={() => handleRemoveRepository(repositorie.id)}>
              Remover
            </button>
          </li>
          )
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
