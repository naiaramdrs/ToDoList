export interface Usuario {
    id: number,
    nome: string,
    sobrenome: string,
    // tem mais coisa mas por enquanto o front não precisa
}

const CHAVE_USUARIO = 'usuario';

export function verificarLogado(): boolean {
    if (localStorage.getItem(CHAVE_USUARIO) !== null) {
        try {
            JSON.parse(localStorage.getItem(CHAVE_USUARIO)!);
            return true;
        } catch (e) {}
    }
    // usuario em localStorage pode estar invalido, então o resete
    localStorage.removeItem(CHAVE_USUARIO);
    return false;
}

export function getUsuario(): Usuario | null {
    return JSON.parse(localStorage.getItem(CHAVE_USUARIO)!);
}

export function salvarUsuario(user: Usuario) {
    localStorage.setItem(CHAVE_USUARIO, JSON.stringify(user));
}