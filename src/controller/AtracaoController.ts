import { Request, Response } from "express";
import { Atracao } from "../model/Atracao";
import { Habitat } from "../model/Habitat";
class AtracaoController extends Atracao {
    public async todos(req: Request, res: Response): Promise<Response> {
        try {
            const atracoes = JSON.stringify(await Atracao.listarAtracoes());
            return res.status(200).json(atracoes);
        } catch (error) {
            console.log(`Erro ao acessar o modelo: ${error}`);
            return res.status(400).json(`Erro ao acessar as informações`);
        }
    }
    public async novo(req: Request, res: Response) {
        try {
            const { nomeAtracao, idHabitat } = req.body;
            const novaAtracao = new Atracao(nomeAtracao);

            let result = false;

            if (idHabitat != undefined) {
                result = await Atracao.cadastrarAtracao(novaAtracao, idHabitat);
            } else {
                result = await Atracao.cadastrarAtracao(novaAtracao);
            }
            if (result) {
                return res.status(200).json('Atração cadastrado com sucesso');
            } else {
                return res.status(400).json('Não foi possível cadastrar a atração no banco de dados');
            }
        } catch (error) {
            console.log(`Erro ao cadastrar modelo: ${error}`);
            return res.status(400).json('Não foi possível cadastrar o atração no banco de dados');
        }
    }
    public async remover(req: Request, res: Response) {
        try {
            const idatracao = parseInt(req.query.idatracao as string);

            const resultado = await Atracao.removerAtracao(idatracao);
            
            if(resultado) {
                return res.status(200).json('Atração removida com sucesso');
            } else {
                return res.status(401).json('Erro ao remover atração');
            }
        } catch (error) {
            console.log(`Erro ao acessar modelo: ${error}`);
            return res.status(400).json("Erro ao remover Atração, consule os logs no servidor");
        }
    }
    public async atualizar(req: Request, res: Response) {
        try {
            const idAtracao = parseInt(req.params.idAtracao);
    const { nomeAtracao, idHabitat } = req.body;

    // Criar nova instância de Atracao
    const novaAtracao = new Atracao(nomeAtracao);

    try {
        // Se idHabitat estiver presente na requisição, configurar o habitat da nova atração
        if (idHabitat) {
            const habitat = new Habitat(''); // Aqui você precisa criar uma instância de Habitat com os dados corretos
            novaAtracao.setHabitatAtracao(habitat);
        }

        // Chamar método de atualização da atração
        const result = await Atracao.atualizarAtracao(novaAtracao, idAtracao);

        // Verificar resultado da atualização
        if (result) {
            return res.status(200).json('Atração atualizada com sucesso');
        } else {
            return res.status(400).json('Não foi possível atualizar a atração no banco de dados');
        }
    } catch (error) {
        console.log('Erro ao atualizar atração:', error);
        return res.status(400).json('Erro interno ao atualizar atração');
    }
        } catch (error) {
            console.log(`Erro ao atualizar modelo: ${error}`);
            return res.status(400).json("Erro ao atualizar ave");
        }
    }
}
export default AtracaoController;