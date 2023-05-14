export const validaNome = (name: any) => {
    const letras = /[^a-zà-ú]/gi;
    let saida = "";
  
    if (letras.test(name)) saida = "Seu nome deve ter apenas letras";
    else if (name.length < 3) saida = "Seu nome deve ter pelo menos 3 letras";
    else if (name.length > 100)
      saida = "Seu nome deve ter no máximo 100 letras";
  
    return saida;
  };
  
  export const validaEmail = (email: any) => {
    const letras = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  
    return letras.test(email) ? "" : "Email inválido!";
  };
  
  export const validaSenha = (password: any) => {
    let saida = "";
  
    if (password.length < 6)
      saida = "Sua senha deve ter pelo menos 6 caracteres";
    else if (password.length > 15)
      saida = "Sua senha deve ter no máximo 15 caracteres";
  
    return saida;
  };