import { fetchAPI } from "./request";

const CHAVE_LOCAL_USUARIO = 'usuario';

interface DadosCadastrar {
    nome: string;
    sobrenome: string;
    email: string;
    genero: string;
    dataNascimento: string;
    senha: string;
    senha_confirmation: string;
}

interface DadosEditar {
    nome?: string;
    sobrenome?: string;
    genero?: string;
    dataNascimento?: string;
}

export class Usuario {
    public id: number
    public nome: string
    public sobrenome: string
    public email: string
    // tem mais coisa mas por enquanto o front não precisa

    constructor(id: number, nome: string, sobrenome: string, email: string) {
        this.id = id;
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.email = email;
    }

    static fromApiObject(obj: any): Usuario {
        return new Usuario(obj.id, obj.nome, obj.sobrenome, obj.email);
    }

    static async cadastrar(dados: DadosCadastrar): Promise<Usuario> {
        const usuario = Usuario.fromApiObject(await fetchAPI('/usuario/cadastro', dados, 'POST'));
        usuario.salvarLocal();
        return usuario;
    }

    static async login(email: string, senha: string): Promise<Usuario> {
        const usuario = Usuario.fromApiObject(await fetchAPI('/usuario/login', { email, senha }, 'POST'));
        usuario.salvarLocal();
        return usuario;
    }

    static getLocal(): Usuario | null {
        const value = JSON.parse(localStorage.getItem(CHAVE_LOCAL_USUARIO) ?? "null");
        // FIXME: isso não vai ser uma boa ideia para a data de nascimento! (dataNascimento vs data_nascimento)
        return value ? Usuario.fromApiObject(value) : null;
    }

    salvarLocal() {
        localStorage.setItem(CHAVE_LOCAL_USUARIO, JSON.stringify(this));
    }

    async atualizar(): Promise<Usuario> {
        const usuario = Usuario.fromApiObject(await fetchAPI('/usuario/info', {}, 'GET'));
        
        Object.assign(this, usuario);

        this.salvarLocal();

        return this;
    }

    async editar(dados: DadosEditar): Promise<Usuario> {
        const usuario = Usuario.fromApiObject(await fetchAPI('/usuario/editar', dados, 'POST'));
        
        Object.assign(this, usuario);

        this.salvarLocal();

        return this;
    }

    async logout() {
        localStorage.removeItem(CHAVE_LOCAL_USUARIO);

        await fetchAPI('/usuario/logout', {}, 'POST');
    }
}
