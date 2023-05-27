import { fetchAPI } from "./request";

export class Tarefa {
    public id: number;
    public nome: string;
    public concluida: boolean;
    public data: Date;

    constructor(id: number, nome: string, data: Date) {
        this.id = id;
        this.nome = nome;
        this.concluida = false;
        this.data = data;
    }

    static fromApiObject(obj: any): Tarefa {
        const tarefa = new Tarefa(obj.id, obj.nome, new Date(obj.data));
        tarefa.concluida = obj.concluida;
        return tarefa;
    }

    dataFormatada() {
        return this.data.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    }

    static async fetchAll(): Promise<Tarefa[]> {
        const data = await fetchAPI('/tarefas', {}, 'GET')
        return data.map(this.fromApiObject)
    }

    async deletar() {
        await fetchAPI(`/tarefas/${this.id}`, {}, 'DELETE');
    }

    async atualizar() {
        await fetchAPI(`/tarefas/${this.id}`, {
            nome: this.nome,
            concluida: this.concluida,
            data: this.data.toISOString(),
        }, 'PUT')
    }
    
    static async criar(nome: string, data: Date): Promise<Tarefa> {
        const tarefa = Tarefa.fromApiObject(await fetchAPI('/tarefas', {
            nome, data: data.toISOString()
        }, 'POST'));

        return tarefa;
    }
    
}