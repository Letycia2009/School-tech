/* =========================================================
   LOGIN / CADASTRO - SCHOOL GAME APP
========================================================= */

const authForm = document.getElementById("authForm");

const backToStart = document.getElementById("backToStart");

const nameGroup = document.getElementById("nameGroup");
const nameInput = document.getElementById("nameInput");

const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");

const togglePassword =
    document.getElementById("togglePassword");

const authMessage =
    document.getElementById("authMessage");

const authButton =
    document.getElementById("authButton");

const authButtonText =
    document.getElementById("authButtonText");

const switchAuthMode =
    document.getElementById("switchAuthMode");

const loginTitle =
    document.getElementById("loginTitle");

const loginDescription =
    document.getElementById("loginDescription");

const switchText =
    document.getElementById("switchText");


// =========================================================
// ESTADO
// =========================================================

let isRegisterMode = false;


// =========================================================
// HASH DA SENHA
// =========================================================

async function hashPassword(password) {

    const encoder = new TextEncoder();

    const data = encoder.encode(password);

    const hashBuffer =
        await crypto.subtle.digest(
            "SHA-256",
            data
        );

    const hashArray =
        Array.from(
            new Uint8Array(hashBuffer)
        );

    return hashArray
        .map(byte =>
            byte
                .toString(16)
                .padStart(2, "0")
        )
        .join("");
}


// =========================================================
// USUÁRIOS
// =========================================================

function getUsers() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "schoolGameUsers"
            )
        ) || [];

    } catch {

        return [];

    }
}


function saveUsers(users) {

    localStorage.setItem(
        "schoolGameUsers",
        JSON.stringify(users)
    );

}


// =========================================================
// MENSAGENS
// =========================================================

function showMessage(
    message,
    type = "error"
) {

    authMessage.textContent = message;

    authMessage.className =
        "auth-message " + type;

}


function clearMessage() {

    authMessage.textContent = "";

    authMessage.className =
        "auth-message";

}


// =========================================================
// MOSTRAR / ESCONDER SENHA
// =========================================================

togglePassword.addEventListener(
    "click",
    () => {

        const isPassword =
            passwordInput.type === "password";

        passwordInput.type =
            isPassword
                ? "text"
                : "password";

        togglePassword.innerHTML =
            isPassword
                ? '<i class="fa-regular fa-eye-slash"></i>'
                : '<i class="fa-regular fa-eye"></i>';

    }
);


// =========================================================
// LOGIN / CADASTRO
// =========================================================

switchAuthMode.addEventListener(
    "click",
    () => {

        isRegisterMode =
            !isRegisterMode;

        clearMessage();

        authForm.reset();


        if (isRegisterMode) {

            // CADASTRO

            loginTitle.textContent =
                "Criar uma conta";

            loginDescription.textContent =
                "Cadastre-se para começar sua jornada.";

            nameGroup.classList.remove(
                "hidden"
            );

            nameInput.required = true;

            authButtonText.textContent =
                "Criar conta";

            switchText.textContent =
                "Já possui uma conta?";

            switchAuthMode.textContent =
                "Entrar";

            passwordInput.autocomplete =
                "new-password";

        } else {

            // LOGIN

            loginTitle.textContent =
                "Entrar na conta";

            loginDescription.textContent =
                "Entre com seu e-mail e senha para continuar.";

            nameGroup.classList.add(
                "hidden"
            );

            nameInput.required = false;

            authButtonText.textContent =
                "Entrar";

            switchText.textContent =
                "Ainda não possui uma conta?";

            switchAuthMode.textContent =
                "Criar conta";

            passwordInput.autocomplete =
                "current-password";
        }

    }
);


// =========================================================
// SUBMIT DO FORMULÁRIO
// =========================================================

authForm.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();

        clearMessage();


        const email =
            emailInput.value
                .trim()
                .toLowerCase();

        const password =
            passwordInput.value;


        // ---------------------------------------------
        // VALIDAR E-MAIL
        // ---------------------------------------------

        if (!email) {

            showMessage(
                "Digite seu e-mail."
            );

            emailInput.focus();

            return;
        }


        if (!emailInput.checkValidity()) {

            showMessage(
                "Digite um e-mail válido."
            );

            emailInput.focus();

            return;
        }


        // ---------------------------------------------
        // VALIDAR SENHA
        // ---------------------------------------------

        if (password.length < 6) {

            showMessage(
                "A senha precisa ter pelo menos 6 caracteres."
            );

            passwordInput.focus();

            return;
        }


        // ---------------------------------------------
        // LOADING
        // ---------------------------------------------

        authButton.classList.add(
            "loading"
        );

        authButtonText.textContent =
            isRegisterMode
                ? "Criando..."
                : "Entrando...";


        try {

            const users = getUsers();

            const passwordHash =
                await hashPassword(password);


            // =================================================
            // CADASTRO
            // =================================================

            if (isRegisterMode) {

                const name =
                    nameInput.value.trim();


                if (name.length < 2) {

                    showMessage(
                        "Digite seu nome completo."
                    );

                    nameInput.focus();

                    return;
                }


                const existingUser =
                    users.find(
                        user =>
                            user.email === email
                    );


                if (existingUser) {

                    showMessage(
                        "Este e-mail já está cadastrado."
                    );

                    return;
                }


                const newUser = {

                    id:
                        Date.now().toString(),

                    name,

                    email,

                    passwordHash,

                    xp: 0,

                    level: 1,

                    createdAt:
                        new Date().toISOString()

                };


                users.push(newUser);

                saveUsers(users);


                showMessage(
                    "Conta criada com sucesso!",
                    "success"
                );


                // Salva usuário logado

                localStorage.setItem(
                    "schoolGameCurrentUser",
                    JSON.stringify(newUser)
                );


                setTimeout(() => {

                    window.location.href =
                        "index.html";

                }, 700);


                return;
            }


            // =================================================
            // LOGIN
            // =================================================

            const user =
                users.find(
                    item =>
                        item.email === email
                );


            if (!user) {

                showMessage(
                    "E-mail ou senha incorretos."
                );

                return;
            }


            if (
                user.passwordHash !==
                passwordHash
            ) {

                showMessage(
                    "E-mail ou senha incorretos."
                );

                return;
            }


            // ---------------------------------------------
            // LOGIN CORRETO
            // ---------------------------------------------

            showMessage(
                "Login realizado! Entrando...",
                "success"
            );


            localStorage.setItem(
                "schoolGameCurrentUser",
                JSON.stringify(user)
            );


            setTimeout(() => {

                window.location.href =
                    "index.html";

            }, 700);


        } catch (error) {

            console.error(
                "Erro no sistema de login:",
                error
            );

            showMessage(
                "Não foi possível realizar o login."
            );

        } finally {

            authButton.classList.remove(
                "loading"
            );

            authButtonText.textContent =
                isRegisterMode
                    ? "Criar conta"
                    : "Entrar";

        }

    }
);


// =========================================================
// LIMPAR MENSAGEM AO DIGITAR
// =========================================================

[
    emailInput,
    passwordInput,
    nameInput
].forEach(input => {

    input.addEventListener(
        "input",
        () => {

            if (
                authMessage.textContent
            ) {

                clearMessage();

            }

        }
    );

});


// =========================================================
// BOTÃO VOLTAR
// =========================================================

backToStart.addEventListener(
    "click",
    () => {

        window.location.href =
            "index.html";

    }
);