        // MANIPULAÇÃO BANCO DE DADOS

// Cria/limpa a base de dados 
function createDatabase() {
    localStorage.setItem('db_client', '[]')
    return JSON.parse(localStorage.getItem('db_client'))
}

// Função que retorna o array da base de dados (Object)
function getDatabase() {
    return JSON.parse(localStorage.getItem('db_client')) || createDatabase()
}

// Troca a base de dados atual pela base de dados passada no argumento
function setDatabase(obj) {
    localStorage.setItem('db_client', JSON.stringify(obj))
}


        // ITEMS

// Remove o item no banco de dados correspondente ao ID
function removeItem(id) {
    let db_client = getDatabase()
    db_client.splice(id,1)
    setDatabase(db_client)
}

// Recebe o objeto pronto, e adiciona ele a base de dados
function registerItem(item) {
    let db_client = getDatabase()
    let novo_item = newTodoItem(item, db_client) // object
    db_client.unshift(novo_item) // array
    setDatabase(db_client)
}

// Atualiza item no banco de dados
// Troca o item referenciado no i, pelo novo objeto passado no argumento
function updateItem(item, i) {
    let db_client = getDatabase()
    db_client[i] = newTodoItem(item, db_client, i)
    setDatabase(db_client)
}

    // 

// Retorna um objeto novo, com informações do DOM. Se o ID não for passado, ele define o 'active' como true
// Essa função é chamada no botão de salvar, serve tanto para salvar novo item, como para salvar alterações nesse item, por isso o ID dinâmico
// ID passado no argumento, sofre uma alteração caso não seja encontrado um item no banco de dados com esse ID, recebendo true por padão
const newValue = (new_value, id) => {
    let db_client = getDatabase()
    id = db_client?.[id]?.active ?? true
    return {
        name: new_value,
        active: id,
        details: ''
    }
}

// Adiciona a chave id ao objeto passado no argumento
// Retorna objeto pronto para ser adicionado a base de dados
const newTodoItem = ({name, active, details}, db_client,  idx) => {
    let ind = idx ?? db_client.length
    return {
        id: ++ind,
        name,
        active,
        details,
    }
}