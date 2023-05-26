import { fetchAPI } from "./request";
import Config from '../config';

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
    public fotoPerfil: string
    // tem mais coisa mas por enquanto o front não precisa

    constructor(id: number, dados: { nome: string, sobrenome: string, email: string, fotoPerfil: string }) {
        this.id = id;
        this.nome = dados.nome;
        this.sobrenome = dados.sobrenome;
        this.email = dados.email;
        this.fotoPerfil = dados.fotoPerfil;
    }

    static fromApiObject(obj: any): Usuario {
        return new Usuario(obj.id, { ...obj, fotoPerfil: Config.API_URL + obj.foto_perfil.url.replace(/^\/api/, '') });
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
        if (!value) return null;
        return new Usuario(value.id, value);
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

    async uploadFoto(foto: File) {
        const dados = await fetchAPI('/usuario/upload_foto', { foto }, 'FORM');
        
        this.fotoPerfil = Config.API_URL + dados.url.replace(/^\/api/, '')

        this.salvarLocal()
    }
}
