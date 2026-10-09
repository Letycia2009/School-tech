/* ==========================================
   SCHOOL GAME APP
   Sistema principal + OFFLINE
   + CONFIGURAÇÕES
   + MODO CLARO / ESCURO
========================================== */


/* ==========================================
   ELEMENTOS
========================================== */

const startScreen = document.getElementById("startScreen");
const mainScreen = document.getElementById("mainScreen");

const startButton = document.getElementById("startButton");
const continueButton = document.getElementById("continueButton");

const offlineBanner = document.getElementById("offlineBanner");

const connectionDot = document.getElementById("connectionDot");
const connectionText = document.getElementById("connectionText");

const mainConnectionDot =
    document.getElementById("mainConnectionDot");

const mainConnectionText =
    document.getElementById("mainConnectionText");

const xpValue =
    document.getElementById("xpValue");

const levelValue =
    document.getElementById("levelValue");

const questionInput =
    document.getElementById("questionInput");

const questionButton =
    document.getElementById("questionButton");

const modal =
    document.getElementById("modal");

const modalContent =
    document.getElementById("modalContent");

const closeModal =
    document.getElementById("closeModal");

const toast =
    document.getElementById("toast");

const toastMessage =
    document.getElementById("toastMessage");


/* ==========================================
   ESTADO DO JOGADOR
========================================== */

let player = {

    xp:
        Number(
            localStorage.getItem("schoolGameXP")
        ) || 0

};


/* ==========================================
   SALVAR PROGRESSO
========================================== */

function savePlayer() {

    localStorage.setItem(
        "schoolGameXP",
        player.xp
    );

}


/* ==========================================
   NÍVEL
========================================== */

function calculateLevel(xp) {

    return Math.floor(xp / 100) + 1;

}


/* ==========================================
   ATUALIZAR XP
========================================== */

function updatePlayerUI() {

    const level =
        calculateLevel(player.xp);


    xpValue.textContent =
        `${player.xp} XP`;


    levelValue.textContent =
        level;


    savePlayer();

}


/* ==========================================
   ADICIONAR XP
========================================== */

function addXP(amount) {

    const oldLevel =
        calculateLevel(player.xp);


    player.xp += amount;


    const newLevel =
        calculateLevel(player.xp);


    updatePlayerUI();


    showToast(
        `+${amount} XP conquistado!`
    );


    if (newLevel > oldLevel) {

        setTimeout(() => {

            showToast(
                `🎉 Parabéns! Você chegou ao nível ${newLevel}!`
            );

        }, 1200);

    }

}


function checkLoggedUser() {

    const savedUser = localStorage.getItem("schoolGameCurrentUser");

    // Se não existe usuário logado, permanece na tela inicial
    if (!savedUser) {
        return;
    }

    try {

        const user = JSON.parse(savedUser);

        // Esconde a tela inicial
        if (startScreen) {
            startScreen.classList.add("hidden");
        }

        // Mostra o conteúdo interno
        if (mainScreen) {
            mainScreen.classList.remove("hidden");
        }

        console.log("Usuário logado:", user.name);

    } catch (error) {

        console.error(
            "Erro ao carregar usuário:",
            error
        );

        localStorage.removeItem("schoolGameCurrentUser");

    }
}

/* ==========================================
   TELA INICIAL
========================================== */

if (startButton) {
    startButton.addEventListener("click", () => {
        window.location.href = "login.html";
    });
}


continueButton.addEventListener(
    "click",
    () => {

        document
            .querySelector(".menu-section")
            .scrollIntoView({

                behavior: "smooth"

            });

    }
);


/* ==========================================
   STATUS DA INTERNET
========================================== */

function updateConnectionStatus() {

    const online =
        navigator.onLine;


    if (online) {

        /* Tela inicial */

        connectionText.textContent =
            "Conectado à internet";


        connectionDot.classList.remove(
            "offline"
        );


        /* Tela principal */

        mainConnectionText.textContent =
            "Online";


        mainConnectionDot.classList.remove(
            "offline"
        );


        /* Banner */

        offlineBanner.classList.remove(
            "show"
        );

    }

    else {

        /* Tela inicial */

        connectionText.textContent =
            "Modo offline";


        connectionDot.classList.add(
            "offline"
        );


        /* Tela principal */

        mainConnectionText.textContent =
            "Offline";


        mainConnectionDot.classList.add(
            "offline"
        );


        /* Banner */

        offlineBanner.classList.add(
            "show"
        );

    }

}


/* ==========================================
   DETECTAR QUANDO PERDE INTERNET
========================================== */

window.addEventListener(
    "offline",
    updateConnectionStatus
);


/* ==========================================
   DETECTAR QUANDO INTERNET VOLTA
========================================== */

window.addEventListener(
    "online",
    () => {

        updateConnectionStatus();


        showToast(
            "🟢 Conexão restaurada!"
        );

    }
);


/* ==========================================
   MODAL
========================================== */

function openModal(content) {

    modalContent.innerHTML =
        content;


    modal.classList.remove(
        "hidden"
    );


    document.body.style.overflow =
        "hidden";

}


function closeModalFunction() {

    modal.classList.add(
        "hidden"
    );


    document.body.style.overflow =
        "";

}


closeModal.addEventListener(
    "click",
    closeModalFunction
);


document
    .querySelector(".modal-overlay")
    .addEventListener(
        "click",
        closeModalFunction
    );


/* ==========================================
   MATÉRIAS
========================================== */

function openSubjects() {

    openModal(`

        <h2>

            <i class="fa-solid fa-book-open"></i>

            Matérias

        </h2>


        <p>

            Escolha uma matéria para começar
            sua jornada de aprendizado.

        </p>


        <div class="modal-list">


            <div class="modal-item">
                📐 Matemática
            </div>


            <div class="modal-item">
                🧪 Química
            </div>


            <div class="modal-item">
                ⚛️ Física
            </div>


            <div class="modal-item">
                🧬 Biologia
            </div>


            <div class="modal-item">
                📚 Português
            </div>


            <div class="modal-item">
                🌎 Geografia
            </div>


            <div class="modal-item">
                🏛️ História
            </div>


            <div class="modal-item">
                🇪🇸 Espanhol
            </div>


        </div>

    `);

}


/* ==========================================
   SECRETARIA
========================================== */

function openSecretary() {

    openModal(`

        <h2>

            <i class="fa-solid fa-building-columns"></i>

            Secretaria

        </h2>


        <p>

            Consulte as principais informações
            da escola.

        </p>


        <div class="modal-list">


            <div class="modal-item">

                🕐 Segunda a sexta<br>

                08h00 às 17h00

            </div>


            <div class="modal-item">

                📞 Contato<br>

                Secretaria

            </div>


            <div class="modal-item">

                📍 Localização<br>

                Escola

            </div>


            <div class="modal-item">

                📋 Atendimento<br>

                Informações escolares

            </div>


        </div>

    `);

}


/* ==========================================
   SOBRE
========================================== */

function openAbout() {

    openModal(`

        <h2>

            <i class="fa-solid fa-circle-info"></i>

            Sobre o School Game

        </h2>


        <p>

            O School Game App é um projeto desenvolvido
            para tornar o aprendizado mais interativo,
            divertido e acessível aos alunos.

        </p>


        <br>


        <p>

            Aqui você pode explorar matérias,
            responder perguntas, participar de desafios
            e conquistar XP.

        </p>


        <br>


        <p>

            <strong>
                Conquiste, evolua e aprenda!
            </strong>

        </p>

    `);

}


/* ==========================================
   CONFIGURAÇÕES
========================================== */

function openSettings() {

    const currentTheme =
        localStorage.getItem(
            "schoolGameTheme"
        ) || "light";


    openModal(`

        <h2>

            <i class="fa-solid fa-gear"></i>

            Configurações

        </h2>


        <p>

            Personalize a aparência do
            School Game escolhendo o tema
            que você prefere.

        </p>


        <div class="settings-options">


            <!-- MODO CLARO -->

            <button
                class="theme-option ${
                    currentTheme === "light"
                        ? "active"
                        : ""
                }"
                data-theme="light"
            >

                <div class="theme-option-icon">

                    <i class="fa-solid fa-sun"></i>

                </div>


                <div class="theme-option-text">

                    <strong>
                        Modo claro
                    </strong>


                    <small>
                        Visual claro e confortável.
                    </small>

                </div>


                <div class="theme-check">

                    <i class="fa-solid fa-check"></i>

                </div>

            </button>



            <!-- MODO ESCURO -->

            <button
                class="theme-option ${
                    currentTheme === "dark"
                        ? "active"
                        : ""
                }"
                data-theme="dark"
            >

                <div class="theme-option-icon">

                    <i class="fa-solid fa-moon"></i>

                </div>


                <div class="theme-option-text">

                    <strong>
                        Modo escuro
                    </strong>


                    <small>
                        Visual escuro para ambientes
                        com pouca luz.
                    </small>

                </div>


                <div class="theme-check">

                    <i class="fa-solid fa-check"></i>

                </div>

            </button>


        </div>

    `);


    /* ======================================
       BOTÕES DE TEMA
    ======================================= */

    document
        .querySelectorAll(".theme-option")
        .forEach(option => {

            option.addEventListener(
                "click",
                () => {

                    const theme =
                        option.dataset.theme;


                    setTheme(theme);


                    document
                        .querySelectorAll(
                            ".theme-option"
                        )
                        .forEach(item => {

                            item.classList.remove(
                                "active"
                            );

                        });


                    option.classList.add(
                        "active"
                    );

                }
            );

        });

}


/* ==========================================
   ALTERAR TEMA
========================================== */

function setTheme(theme) {

    if (theme === "dark") {

        document.body.classList.add(
            "dark-mode"
        );


        localStorage.setItem(
            "schoolGameTheme",
            "dark"
        );


        showToast(
            "🌙 Modo escuro ativado!"
        );

    }

    else {

        document.body.classList.remove(
            "dark-mode"
        );


        localStorage.setItem(
            "schoolGameTheme",
            "light"
        );


        showToast(
            "☀️ Modo claro ativado!"
        );

    }

}


/* ==========================================
   CARREGAR TEMA SALVO
========================================== */

function loadSavedTheme() {

    const savedTheme =
        localStorage.getItem(
            "schoolGameTheme"
        );


    if (savedTheme === "dark") {

        document.body.classList.add(
            "dark-mode"
        );

    }

    else {

        document.body.classList.remove(
            "dark-mode"
        );

    }

}


/* ==========================================
   BOTÕES DO MENU
========================================== */

document
    .querySelectorAll(".menu-card")
    .forEach(card => {

        card.addEventListener(
            "click",
            () => {

                const section =
                    card.dataset.section;


                if (
                    section === "subjects"
                ) {

                    openSubjects();

                }


                else if (
                    section === "secretary"
                ) {

                    openSecretary();

                }


                else if (
                    section === "about"
                ) {

                    openAbout();

                }


                else if (
                    section === "settings"
                ) {

                    openSettings();

                }

            }
        );

    });


/* ==========================================
   MINI GAMES
========================================== */

document
    .querySelectorAll(".game-card")
    .forEach(game => {

        game.addEventListener(
            "click",
            () => {

                const gameType =
                    game.dataset.game;


                if (
                    gameType === "quiz"
                ) {

                    openQuiz();

                }


                if (
                    gameType === "memory"
                ) {

                    openMemory();

                }


                if (
                    gameType === "challenge"
                ) {

                    openChallenge();

                }

            }
        );

    });


/* ==========================================
   QUIZ
========================================== */

function openQuiz() {

    openModal(`

        <h2>

            <i class="fa-solid fa-circle-question"></i>

            Quiz

        </h2>


        <p>

            Qual linguagem é usada para
            estilizar páginas da internet?

        </p>


        <div class="modal-list">


            <button
                class="modal-item quiz-option"
                data-answer="false"
            >
                JavaScript
            </button>


            <button
                class="modal-item quiz-option"
                data-answer="true"
            >
                CSS
            </button>


            <button
                class="modal-item quiz-option"
                data-answer="false"
            >
                SQL
            </button>


            <button
                class="modal-item quiz-option"
                data-answer="false"
            >
                Python
            </button>


        </div>

    `);


    document
        .querySelectorAll(".quiz-option")
        .forEach(option => {

            option.addEventListener(
                "click",
                () => {

                    if (
                        option.dataset.answer ===
                        "true"
                    ) {

                        addXP(20);


                        closeModalFunction();

                    }

                    else {

                        showToast(
                            "❌ Resposta incorreta!"
                        );

                    }

                }
            );

        });

}


/* ==========================================
   JOGO DA MEMÓRIA
========================================== */

function openMemory() {

    openModal(`

        <h2>

            <i class="fa-solid fa-brain"></i>

            Memória

        </h2>


        <p>

            Mini game de memória disponível
            mesmo sem internet!

        </p>


        <div class="modal-list">


            <div class="modal-item">
                🧠 Memorize
            </div>


            <div class="modal-item">
                ⭐ Encontre
            </div>


        </div>


        <button
            id="memoryStart"
            class="primary-button"
            style="margin-top:20px;"
        >

            Começar

        </button>

    `);


    document
        .getElementById("memoryStart")
        .addEventListener(
            "click",
            () => {

                addXP(10);


                closeModalFunction();


                showToast(
                    "🧠 Desafio concluído!"
                );

            }
        );

}


/* ==========================================
   DESAFIO
========================================== */

function openChallenge() {

    openModal(`

        <h2>

            <i class="fa-solid fa-trophy"></i>

            Desafio

        </h2>


        <p>

            Complete uma atividade e conquiste
            30 XP para subir de nível.

        </p>


        <button
            id="completeChallenge"
            class="primary-button"
            style="margin-top:20px;"
        >

            Concluir desafio

        </button>

    `);


    document
        .getElementById("completeChallenge")
        .addEventListener(
            "click",
            () => {

                addXP(30);


                closeModalFunction();

            }
        );

}


/* ==========================================
   SISTEMA DE PERGUNTAS
========================================== */

if (questionButton) {

    questionButton.addEventListener(
        "click",
        askQuestion
    );

}


if (questionInput) {

    questionInput.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter"
            ) {

                askQuestion();

            }

        }
    );

}


function askQuestion() {

    const question =
        questionInput.value.trim();


    if (!question) {

        showToast(
            "Digite uma pergunta primeiro."
        );


        return;

    }


    /* ======================================
       MODO OFFLINE
    ======================================= */

    if (!navigator.onLine) {

        openModal(`

            <h2>

                <i class="fa-solid fa-wifi"></i>

                Você está offline

            </h2>


            <p>

                Essa função precisa de internet
                para consultar a inteligência artificial.

            </p>


            <br>


            <p>

                Você ainda pode utilizar as matérias,
                mini games e outras partes do aplicativo
                que estão disponíveis offline.

            </p>

        `);


        return;

    }


    /*
        Aqui futuramente podemos conectar
        a sua API/IA.
    */


    openModal(`

        <h2>

            <i class="fa-solid fa-robot"></i>

            Sua pergunta

        </h2>


        <p>

            <strong>
                ${escapeHTML(question)}
            </strong>

        </p>


        <br>


        <p>

            A conexão com a inteligência artificial
            está disponível. Agora podemos conectar
            esta área à API que você estiver usando.

        </p>

    `);


    questionInput.value = "";

}


/* ==========================================
   SEGURANÇA DO TEXTO
========================================== */

function escapeHTML(text) {

    const div =
        document.createElement("div");


    div.textContent =
        text;


    return div.innerHTML;

}


/* ==========================================
   TOAST
========================================== */

let toastTimeout;


function showToast(message) {

    if (!toast || !toastMessage) {
        return;
    }


    toastMessage.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimeout
    );


    toastTimeout =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2500
        );

}


/* ==========================================
   SERVICE WORKER
========================================== */

if (
    "serviceWorker" in navigator
) {

    window.addEventListener(
        "load",
        () => {

            navigator.serviceWorker
                .register(
                    "./service-worker.js"
                )

                .then(
                    () => {

                        console.log(
                            "Service Worker registrado com sucesso."
                        );

                    }
                )

                .catch(
                    error => {

                        console.error(
                            "Erro ao registrar Service Worker:",
                            error
                        );

                    }
                );

        }
    );

}


/* ==========================================
   INICIALIZAÇÃO
========================================== */

loadSavedTheme();

updatePlayerUI();

updateConnectionStatus();

checkLoggedUser();

