 export const validaEmail = (email: any) => {
    const letras = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  
    return letras.test(email) ? "" : "Email inválido!";
  };
  
  export const validaSenha = (password: any) => {
    let saida = "";
  
    if (password.length < 6)
      saida = "Sua senha deve ter pelo menos 6 caracteres";
    else if (password.length > 10)
      saida = "Sua senha deve ter no máximo 15 caracteres";

    return saida;
  };
