import express from 'express';
import cors from 'cors';
import { Ave } from './model/Ave';
import { Habitat } from './model/Habitat';
import { Atracao } from './model/Atracao';
import { DatabaseModel } from './model/DatabaseModel';
import AveController from './controller/AveController';
import AtracaoController from './controller/AtracaoController';
import HabitatController from './controller/HabitatController';
const aveController = new AveController('', 0, '', 0);
const atracaoController = new AtracaoController('');
const habitatController = new HabitatController('');
const server = express();
const port = 3000;

server.use(express.json());
server.use(cors());

// Rota padrão para testes (NÃO USAR EM AMBIENTE PRODUÇÃO)
server.get('/', (req, res) => {
    res.send('Hello World!');
});

server.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log(`Informações: ${username} - ${password}`);
});

server.get('/atracoes', atracaoController.todos);
server.post('/novo/atracao', atracaoController.novo);
server.delete('/remover/atracao', atracaoController.remover);
server.put('/atualizar/atracao/:idAtracao', atracaoController.atualizar);

server.get('/listar-aves', aveController.todos);
server.post('/novo/ave',  aveController.novo);
server.delete('/remover/animal', aveController.remover);
server.put('/atualizar/animal', aveController.atualizar);

server.get('/habitats', habitatController.todos);
server.post('/novo/habitat',  habitatController.novo);
server.delete('/remover/habitat', habitatController.remover);
server.put('/atualizar/habitat', habitatController.atualizar);

new DatabaseModel().testeConexao().then((resbd) => {
    if(resbd) {
        server.listen(port, () => {
            console.info(`Servidor executando no endereço http://localhost:${port}/`);
        })
    } else {
        console.log(`Não foi possível conectar ao banco de dados`);
    }
})