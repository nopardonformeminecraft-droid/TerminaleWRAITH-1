document.addEventListener('DOMContentLoaded', function() {
    // Elementi DOM
    const loginScreen = document.getElementById('login-screen');
    const transitionScreen = document.getElementById('transition-screen');
    const mainScreen = document.getElementById('main-screen');
    const loginPassword = document.getElementById('login-password');
    const loginBtn = document.getElementById('login-btn');
    const loginError = document.getElementById('login-error');
    const logoutBtn = document.getElementById('logout-btn');
    const menuItems = document.querySelectorAll('.menu-item');
    const activityScreens = document.querySelectorAll('.activity-screen');
    
    // Elementi per il protocollo di emergenza
    const emergencyScreen = document.getElementById('emergency-screen');
    const lockScreen = document.getElementById('lock-screen');
    const emergencyMessage = document.getElementById('emergency-message');
    const countdownElement = document.getElementById('countdown');
    const emergencyProgress = document.getElementById('emergency-progress');
    const destructionAnimation = document.getElementById('destruction-animation');
    const lockScreenTime = document.getElementById('lock-screen-time');
    const lockScreenDate = document.getElementById('lock-screen-date');
    
    // Password di accesso (modificabile nel codice)
    const ACCESS_PASSWORD = "darknet2023";
    
    // Elementi per il terminale principale
    const terminalOutput = document.getElementById('terminal-output');
    const commandInput = document.getElementById('command-input');
    
    // Elementi per il GPS tracking MODIFICATO
    const phoneNumbersInput = document.getElementById('phone-numbers');
    const startGpsTrackingBtn = document.getElementById('start-gps-tracking');
    const gpsTerminalOutput = document.getElementById('gps-terminal-output');
    const gpsResultsContainer = document.getElementById('gps-results-container');
    
    // Elementi per le telecamere
    const startCameraHackBtn = document.getElementById('start-camera-hack');
    const cameraTerminalOutput = document.getElementById('camera-terminal-output');
    const camerasGrid = document.getElementById('cameras-grid');
    
    // Elementi per i jammer MODIFICATI
    const jammer1ActivateBtn = document.getElementById('jammer1-activate');
    const jammer1DeactivateBtn = document.getElementById('jammer1-deactivate');
    const jammer1Status = document.getElementById('jammer1-status');
    
    const jammer2ActivateBtn = document.getElementById('jammer2-activate');
    const jammer2DeactivateBtn = document.getElementById('jammer2-deactivate');
    const jammer2Status = document.getElementById('jammer2-status');
    
    const jammerTerminalOutput = document.getElementById('jammer-terminal-output');
    
    // Variabili di stato MODIFICATE
    let isLoggedIn = false;
    let gpsTrackingInProgress = false;
    let cameraHackInProgress = false;
    let jammer1Active = false;
    let jammer2Active = false;
    
    // Variabili per il protocollo di emergenza
    let emergencySequenceActive = false;
    
    // Posizioni GPS predefinite (modificabili nel codice)
    const gpsLocations = [
        { 
            coords: "45.4642, 9.1900", 
            address: "Piazza del Duomo, 20122 Milano MI", 
            accuracy: "± 15 metri",
            city: "Milano"
        },
        { 
            coords: "41.9028, 12.4964", 
            address: "Piazza di Spagna, 00187 Roma RM", 
            accuracy: "± 20 metri",
            city: "Roma"
        },
        { 
            coords: "45.4386, 12.3271", 
            address: "Piazza San Marco, 30124 Venezia VE", 
            accuracy: "± 25 metri",
            city: "Venezia"
        },
        { 
            coords: "40.8518, 14.2681", 
            address: "Piazza del Plebiscito, 80132 Napoli NA", 
            accuracy: "± 18 metri",
            city: "Napoli"
        },
        { 
            coords: "44.4056, 8.9463", 
            address: "Piazza De Ferrari, 16121 Genova GE", 
            accuracy: "± 22 metri",
            city: "Genova"
        },
        { 
            coords: "43.7793, 11.2463", 
            address: "Piazza della Signoria, 50122 Firenze FI", 
            accuracy: "± 17 metri",
            city: "Firenze"
        },
        { 
            coords: "45.0703, 7.6869", 
            address: "Piazza Castello, 10121 Torino TO", 
            accuracy: "± 19 metri",
            city: "Torino"
        },
        { 
            coords: "44.4939, 11.3426", 
            address: "Piazza Maggiore, 40124 Bologna BO", 
            accuracy: "± 21 metri",
            city: "Bologna"
        }
    ];
    
    // Inizializza l'applicazione
    initApp();
    
    // Funzione di inizializzazione
    function initApp() {
        // Configura gli event listener
        setupEventListeners();
        
        // Crea effetto Matrix in background
        createMatrixEffect();
        
        // Inizializza il terminale principale
        initTerminal();
        
        // Configura lo scroll per tutti i terminali
        setupTerminalScroll();
        
        // Focus sull'input della password al caricamento
        loginPassword.focus();
    }
    
    // Configura tutti gli event listener
    function setupEventListeners() {
        // Login
        loginBtn.addEventListener('click', handleLogin);
        loginPassword.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleLogin();
            }
        });
        
        // Logout
        logoutBtn.addEventListener('click', handleLogout);
        
        // Menu laterale
        menuItems.forEach(item => {
            item.addEventListener('click', function() {
                // Rimuovi la classe active da tutti gli elementi del menu
                menuItems.forEach(i => i.classList.remove('active'));
                // Aggiungi la classe active all'elemento cliccato
                this.classList.add('active');
                
                // Nascondi tutte le schermate
                activityScreens.forEach(screen => {
                    screen.classList.remove('active');
                });
                
                // Mostra la schermata corrispondente
                const screenId = this.getAttribute('data-screen') + '-screen';
                document.getElementById(screenId).classList.add('active');
                
                // Focus sull'input del terminale se siamo nel terminale
                if (screenId === 'terminal-screen') {
                    setTimeout(() => {
                        commandInput.focus();
                    }, 100);
                }
            });
        });
        
        // GPS Tracking MODIFICATO
        startGpsTrackingBtn.addEventListener('click', startMultipleGpsTracking);
        phoneNumbersInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && e.ctrlKey) {
                startMultipleGpsTracking();
            }
        });
        
        // Camera Hack
        startCameraHackBtn.addEventListener('click', startCameraHack);
        
        // Jammer Controls MODIFICATI
        jammer1ActivateBtn.addEventListener('click', () => activateJammer(1, true));
        jammer1DeactivateBtn.addEventListener('click', () => activateJammer(1, false));
        
        jammer2ActivateBtn.addEventListener('click', () => activateJammer(2, true));
        jammer2DeactivateBtn.addEventListener('click', () => activateJammer(2, false));
        
        // Sblocco schermata
        lockScreen.addEventListener('click', function() {
            // Mostra la schermata di login standard
            lockScreen.classList.remove('active');
            loginScreen.style.display = 'flex';
            loginScreen.classList.remove('fade-out');
            
            // Resetta tutto
            resetAllActivities();
        });
    }
    
    // Configura lo scroll per i terminali
    function setupTerminalScroll() {
        // Assicura che tutti i terminali siano scrollabili
        const terminalOutputs = [
            terminalOutput,
            gpsTerminalOutput,
            cameraTerminalOutput,
            jammerTerminalOutput
        ];
        
        terminalOutputs.forEach(output => {
            if (output) {
                output.addEventListener('wheel', function(e) {
                    // Permette lo scrolling verticale
                    const delta = e.deltaY || e.detail || e.wheelDelta;
                    this.scrollTop += delta > 0 ? 30 : -30;
                    e.preventDefault();
                });
            }
        });
    }
    
    // Gestione login con animazione
    function handleLogin() {
        const password = loginPassword.value.trim();
        
        if (password === ACCESS_PASSWORD) {
            // Login riuscito - Avvia animazione di transizione
            loginError.style.display = 'none';
            
            // Aggiungi effetto di dissolvenza al login
            loginScreen.classList.add('fade-out');
            
            // Mostra la schermata di transizione
            setTimeout(() => {
                transitionScreen.classList.add('active');
            }, 500);
            
            // Dopo l'animazione di transizione, mostra la schermata principale
            setTimeout(() => {
                transitionScreen.classList.remove('active');
                mainScreen.style.display = 'flex';
                isLoggedIn = true;
                
                // Aggiorna il nome utente nel terminale
                document.getElementById('terminal-user').textContent = 'root';
                document.getElementById('session-user').textContent = 'root';
                
                // Mostra messaggio di benvenuto nel terminale con animazione
                setTimeout(() => {
                    showWelcomeSequence();
                }, 500);
                
                // Focus sull'input del terminale dopo l'animazione
                setTimeout(() => {
                    commandInput.focus();
                }, 3000);
            }, 2500); // Tempo totale dell'animazione di transizione
        } else {
            // Login fallito con animazione
            loginError.style.display = 'block';
            loginPassword.value = '';
            loginPassword.focus();
            
            // Aggiungi animazione di scuotimento al container di login
            const loginContainer = document.querySelector('.login-container');
            loginContainer.classList.add('shake');
            setTimeout(() => {
                loginContainer.classList.remove('shake');
            }, 500);
        }
    }
    
    // Mostra sequenza di benvenuto animata
    function showWelcomeSequence() {
        const welcomeMessages = [
            { text: "SISTEMA DI CONTROLLO HACKER v2.0", type: "info", delay: 100 },
            { text: "======================================", type: "info", delay: 300 },
            { text: "", type: "output", delay: 500 },
            { text: "Accesso autorizzato. Benvenuto, root.", type: "success", delay: 700 },
            { text: "Sessione criptata attiva. Tutte le operazioni sono anonime.", type: "info", delay: 1000 },
            { text: "", type: "output", delay: 1300 },
            { text: "Selezionare un'attività dal menu laterale per iniziare.", type: "info", delay: 1600 },
            { text: "", type: "output", delay: 1900 }
        ];
        
        let totalDelay = 0;
        welcomeMessages.forEach(message => {
            totalDelay += message.delay;
            setTimeout(() => {
                addTerminalOutput(message.text, message.type);
            }, totalDelay);
        });
    }
    
    // Gestione logout con animazione inversa
    function handleLogout() {
        // Aggiungi animazione di uscita
        mainScreen.style.animation = 'fadeOut 1s forwards';
        
        setTimeout(() => {
            isLoggedIn = false;
            mainScreen.style.display = 'none';
            mainScreen.style.animation = '';
            
            // Reset della schermata di login
            loginScreen.classList.remove('fade-out');
            loginScreen.style.display = 'flex';
            loginPassword.value = '';
            loginPassword.focus();
            loginError.style.display = 'none';
            
            // Resetta tutte le attività
            resetAllActivities();
        }, 1000);
    }
    
    // Inizializza il terminale principale
    function initTerminal() {
        let history = [];
        let historyIndex = -1;
        
        // Comandi disponibili (AGGIUNTO: ashfall purge)
        const commands = {
            help: "Mostra tutti i comandi disponibili",
            clear: "Pulisce lo schermo del terminale",
            about: "Informazioni su questo sistema",
            date: "Mostra data e ora attuali",
            sysinfo: "Mostra informazioni di sistema",
            status: "Mostra lo stato delle attività",
            reboot: "Riavvia il terminale",
            ashfall_purge: "Attiva il protocollo di emergenza"
        };
        
        // Aggiungi evento per l'input dei comandi
        commandInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                const command = commandInput.value.trim();
                if (command) {
                    processTerminalCommand(command);
                    history.push(command);
                    historyIndex = history.length;
                    commandInput.value = '';
                }
                // Aggiungi riga vuota dopo l'esecuzione del comando
                addTerminalOutput("", "output");
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (history.length > 0) {
                    if (historyIndex > 0) historyIndex--;
                    commandInput.value = history[historyIndex] || '';
                }
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (history.length > 0) {
                    if (historyIndex < history.length - 1) historyIndex++;
                    commandInput.value = history[historyIndex] || '';
                } else {
                    commandInput.value = '';
                }
            } else if (e.key === 'Tab') {
                e.preventDefault();
                // Autocompletamento comandi
                const input = commandInput.value.trim();
                const matches = Object.keys(commands).filter(cmd => 
                    cmd.startsWith(input)
                );
                if (matches.length === 1) {
                    commandInput.value = matches[0];
                }
            }
        });
        
        // Focus sull'input al click sul terminale
        terminalOutput.addEventListener('click', function() {
            commandInput.focus();
        });
    }
    
    // Processa i comandi del terminale
    function processTerminalCommand(cmd) {
        // Aggiungi il comando all'output
        addTerminalOutput(`root@hacker-control:~# ${cmd}`, "command");
        
        // Estrai comando e argomenti
        const parts = cmd.split(' ');
        const command = parts[0].toLowerCase();
        const args = parts.slice(1);
        
        // Esegui il comando appropriato
        switch(command) {
            case 'help':
                showTerminalHelp();
                break;
            case 'clear':
                clearTerminalOutput();
                break;
            case 'about':
                showAboutInfo();
                break;
            case 'date':
                showCurrentDate();
                break;
            case 'sysinfo':
                showSystemInfo();
                break;
            case 'status':
                showActivitiesStatus();
                break;
            case 'reboot':
                rebootTerminal();
                break;
            case 'ashfall_purge': // COMANDO SEGRETO PER EMERGENZA
                activateEmergencyProtocol();
                break;
            default:
                addTerminalOutput(`Comando non trovato: ${command}. Digita 'help' per la lista dei comandi.`, "error");
        }
    }
    
    // Aggiunge output al terminale con animazione
    function addTerminalOutput(text, type = "output") {
        const line = document.createElement('div');
        line.className = `terminal-line ${type}`;
        
        if (type === "command") {
            line.innerHTML = `<span class="prompt">root@hacker-control:~#</span> <span class="command">${text.replace('root@hacker-control:~# ', '')}</span>`;
        } else {
            line.textContent = text;
        }
        
        terminalOutput.appendChild(line);
        
        // Animazione per la nuova linea
        setTimeout(() => {
            line.style.animation = 'fadeInUp 0.5s forwards';
        }, 10);
        
        // Scroll automatico verso il basso
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
    
    // Pulisce l'output del terminale
    function clearTerminalOutput() {
        terminalOutput.innerHTML = '';
    }
    
    // Mostra aiuto nel terminale
    function showTerminalHelp() {
        addTerminalOutput("COMANDI DISPONIBILI:", "info");
        addTerminalOutput("==================", "info");
        Object.keys(commands).forEach(cmd => {
            addTerminalOutput(`${cmd.padEnd(15)} - ${commands[cmd]}`, "output");
        });
    }
    
    // Mostra informazioni sul sistema
    function showAboutInfo() {
        const aboutText = [
            "SISTEMA DI CONTROLLO HACKER v2.0",
            "================================",
            "Piattaforma integrata per operazioni di sicurezza avanzata",
            "Funzioni disponibili:",
            "1. Rintracciamento GPS remoto (multiplo)",
            "2. Accesso a feed di telecamere di sorveglianza",
            "3. Controllo remoto di 2 dispositivi jammer",
            "",
            "© 2023 DarkNet Security. Tutti i diritti riservati."
        ];
        
        aboutText.forEach(line => addTerminalOutput(line, "info"));
    }
    
    // Mostra data e ora correntis
    function showCurrentDate() {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        addTerminalOutput(now.toLocaleDateString('it-IT', options), "output");
    }
    
    // Mostra informazioni di sistema
    function showSystemInfo() {
        const sysInfo = [
            "INFORMAZIONI DI SISTEMA:",
            "========================",
            "OS: Linux HackerOS 5.15.0",
            "Kernel: 5.15.0-76-generic",
            "Architettura: x86_64",
            "CPU: Intel Core i9-13900K (24 cores)",
            "RAM: 32GB DDR5",
            "Storage: 2TB NVMe SSD",
            "Connessione: VPN criptata attiva",
            "Indirizzo IP: 192.168.1.78 (spoofed)",
            "Proxy: TOR + 3 hop criptati",
            "Jammer attivi: " + (jammer1Active ? "1" : "0") + (jammer2Active ? ", 2" : "")
        ];
        
        sysInfo.forEach(line => addTerminalOutput(line, "output"));
    }
    
    // Mostra stato delle attività MODIFICATO
    function showActivitiesStatus() {
        const status = [
            "STATO ATTIVITÀ:",
            "================",
            `Rintracciamento GPS: ${gpsTrackingInProgress ? "IN CORSO" : "INATTIVO"}`,
            `Hackeraggio telecamere: ${cameraHackInProgress ? "IN CORSO" : "INATTIVO"}`,
            `Jammer 1: ${jammer1Active ? "ATTIVO" : "INATTIVO"}`,
            `Jammer 2: ${jammer2Active ? "ATTIVO" : "INATTIVO"}`,
            `Sessione: ATTIVA (root)`,
            `Sicurezza: LIVELLO MASSIMO`
        ];
        
        status.forEach(line => addTerminalOutput(line, "output"));
    }
    
    // Riavvia il terminale
    function rebootTerminal() {
        addTerminalOutput("Riavvio del sistema in corso...", "warning");
        
        setTimeout(() => {
            clearTerminalOutput();
            addTerminalOutput("SISTEMA DI CONTROLLO HACKER v2.0", "info");
            addTerminalOutput("======================================", "info");
            addTerminalOutput("Sistema riavviato con successo.", "success");
            addTerminalOutput("", "output");
        }, 1500);
    }
    
    // Rintracciamento GPS MULTIPLO MODIFICATO
    function startMultipleGpsTracking() {
        const inputText = phoneNumbersInput.value.trim();
        
        if (!inputText) {
            addGpsOutput("Errore: Inserire almeno un numero di telefono valido.", "error");
            return;
        }
        
        if (gpsTrackingInProgress) {
            addGpsOutput("Un rintracciamento è già in corso. Attendere il completamento.", "error");
            return;
        }
        
        gpsTrackingInProgress = true;
        
        // Pulisci l'output precedente
        gpsTerminalOutput.innerHTML = '';
        gpsResultsContainer.innerHTML = '';
        
        // Dividi i numeri di telefono
        const phoneNumbers = inputText.split('\n')
            .map(num => num.trim())
            .filter(num => num.length > 0);
        
        if (phoneNumbers.length === 0) {
            addGpsOutput("Errore: Nessun numero di telefono valido trovato.", "error");
            gpsTrackingInProgress = false;
            return;
        }
        
        addGpsOutput(`Avvio rintracciamento GPS per ${phoneNumbers.length} numeri...`, "info");
        
        // Simula il processo di rintracciamento per ogni numero
        phoneNumbers.forEach((phoneNumber, index) => {
            setTimeout(() => {
                trackSingleNumber(phoneNumber, index, phoneNumbers.length);
            }, index * 1000);
        });
        
        // Dopo aver avviato tutti i tracking
        setTimeout(() => {
            gpsTrackingInProgress = false;
        }, phoneNumbers.length * 1000 + 5000);
    }
    
    // Traccia un singolo numero
    function trackSingleNumber(phoneNumber, index, total) {
        addGpsOutput(`[${index + 1}/${total}] Tracciamento numero: ${phoneNumber}`, "warning");
        
        setTimeout(() => {
            addGpsOutput(`[${index + 1}/${total}] Connessione al satellite GPS...`, "warning");
            
            setTimeout(() => {
                addGpsOutput(`[${index + 1}/${total}] Sistema di spoofing attivato...`, "warning");
                
                setTimeout(() => {
                    addGpsOutput(`[${index + 1}/${total}] Bypass dei protocolli di sicurezza cellulare...`, "warning");
                    
                    setTimeout(() => {
                        addGpsOutput(`[${index + 1}/${total}] Triangolazione del segnale in corso...`, "warning");
                        
                        setTimeout(() => {
                            addGpsOutput(`[${index + 1}/${total}] Posizione acquisita con successo!`, "success");
                            
                            // Mostra il risultato per questo numero
                            showGpsResult(phoneNumber, index);
                            
                            // Scrolla automaticamente al risultato
                            setTimeout(() => {
                                gpsTerminalOutput.scrollTop = gpsTerminalOutput.scrollHeight;
                            }, 100);
                        }, 2000);
                    }, 2000);
                }, 2000);
            }, 2000);
        }, 1500);
    }
    
    // Aggiunge output al terminale GPS
    function addGpsOutput(text, type = "output") {
        const line = document.createElement('div');
        line.className = `terminal-line ${type}`;
        line.textContent = text;
        gpsTerminalOutput.appendChild(line);
        gpsTerminalOutput.scrollTop = gpsTerminalOutput.scrollHeight;
    }
    
    // Mostra il risultato del GPS per un singolo numero
    function showGpsResult(phoneNumber, index) {
        // Seleziona una posizione casuale dall'array
        const locationIndex = index % gpsLocations.length;
        const location = gpsLocations[locationIndex];
        
        // Crea un elemento risultato
        const resultElement = document.createElement('div');
        resultElement.className = 'gps-result';
        resultElement.id = `gps-result-${index}`;
        
        // Genera ID univoco per il marker
        const markerId = `map-marker-${index}`;
        
        // Aggiorna il timestamp
        const now = new Date();
        const timeString = now.toLocaleTimeString('it-IT');
        const dateString = now.toLocaleDateString('it-IT');
        
        // Posizione casuale per il marker
        const markerTop = 20 + Math.random() * 60;
        const markerLeft = 20 + Math.random() * 60;
        
        resultElement.innerHTML = `
            <h3><i class="fas fa-location-dot"></i> POSIZIONE TROVATA #${index + 1}</h3>
            <p><strong>Numero tracciato:</strong> <span class="tracked-number">${phoneNumber}</span></p>
            <p><strong>Città:</strong> <span class="gps-city">${location.city}</span></p>
            <p><strong>Coordinate:</strong> <span class="gps-coordinates">${location.coords}</span></p>
            <p><strong>Indirizzo approssimativo:</strong> <span class="gps-address">${location.address}</span></p>
            <p><strong>Precisione:</strong> <span class="gps-accuracy">${location.accuracy}</span></p>
            <p><strong>Ultimo aggiornamento:</strong> <span class="gps-timestamp">${dateString} ${timeString}</span></p>
            
            <div class="map-placeholder">
                <div class="map-marker" id="${markerId}" style="top: ${markerTop}%; left: ${markerLeft}%;"></div>
            </div>
        `;
        
        gpsResultsContainer.appendChild(resultElement);
        resultElement.style.display = 'block';
    }
    
    // Hackeraggio telecamere
    function startCameraHack() {
        if (cameraHackInProgress) {
            addCameraOutput("Un processo di hackeraggio è già in corso. Attendere il completamento.", "error");
            return;
        }
        
        cameraHackInProgress = true;
        
        // Pulisci l'output precedente
        cameraTerminalOutput.innerHTML = '';
        camerasGrid.style.display = 'none';
        camerasGrid.innerHTML = '';
        
        // Simula il processo di hackeraggio
        addCameraOutput("Avvio hackeraggio telecamere di sorveglianza...", "info");
        
        setTimeout(() => {
            addCameraOutput("Scansione reti Wi-Fi vicine...", "warning");
            
            setTimeout(() => {
                addCameraOutput("Trovate 4 reti con dispositivi di sorveglianza...", "warning");
                
                setTimeout(() => {
                    addCameraOutput("Forzando l'accesso ai sistemi di sicurezza...", "warning");
                    
                    setTimeout(() => {
                        addCameraOutput("Bypass autenticazione...", "warning");
                        
                        setTimeout(() => {
                            addCameraOutput("Accesso consentito. Stream disponibile.", "success");
                            cameraHackInProgress = false;
                            
                            // Mostra le telecamere
                            showCameraFeeds();
                            
                            // Scrolla automaticamente alle telecamere
                            setTimeout(() => {
                                cameraTerminalOutput.scrollTop = cameraTerminalOutput.scrollHeight;
                            }, 100);
                        }, 2000);
                    }, 2000);
                }, 2000);
            }, 2000);
        }, 1500);
    }
    
    // Aggiunge output al terminale delle telecamere
    function addCameraOutput(text, type = "output") {
        const line = document.createElement('div');
        line.className = `terminal-line ${type}`;
        line.textContent = text;
        cameraTerminalOutput.appendChild(line);
        cameraTerminalOutput.scrollTop = cameraTerminalOutput.scrollHeight;
    }
    
    // Mostra i feed delle telecamere
    function showCameraFeeds() {
        // Immagini delle telecamere (modificabili nel codice)
        const cameras = [
            { 
                name: "Camera Ingresso Principale", 
                image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                status: "ATTIVA"
            },
            { 
                name: "Camera Interna - Corridoio", 
                image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                status: "ATTIVA"
            },
            { 
                name: "Camera Esterna - Parcheggio", 
                image: "https://images.unsplash.com/photo-1579546929662-711aa81148cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                status: "ATTIVA"
            },
            { 
                name: "Camera Sicurezza - Uffici", 
                image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                status: "ATTIVA"
            }
        ];
        
        // Crea gli elementi delle telecamere
        cameras.forEach((camera, index) => {
            const cameraElement = document.createElement('div');
            cameraElement.className = 'camera-feed';
            
            cameraElement.innerHTML = `
                <h3><i class="fas fa-video"></i> ${camera.name}</h3>
                <div class="camera-image">
                    <img src="${camera.image}" alt="${camera.name}">
                </div>
                <div class="camera-status">${camera.status}</div>
            `;
            
            camerasGrid.appendChild(cameraElement);
        });
        
        // Mostra la griglia
        camerasGrid.style.display = 'grid';
    }
    
    // Controllo jammer MODIFICATO per 2 jammer
    function activateJammer(jammerNumber, activate) {
        // Pulisci l'output precedente
        jammerTerminalOutput.innerHTML = '';
        
        if (activate) {
            // Attiva il jammer
            addJammerOutput(`Connessione al dispositivo jammer ${jammerNumber}...`, "info");
            
            setTimeout(() => {
                addJammerOutput(`Invio comando di attivazione al jammer ${jammerNumber}...`, "warning");
                
                setTimeout(() => {
                    addJammerOutput(`Jammer ${jammerNumber} attivato con successo.`, "success");
                    
                    // Aggiorna lo stato
                    if (jammerNumber === 1) {
                        jammer1Active = true;
                        jammer1ActivateBtn.classList.add('active');
                        jammer1DeactivateBtn.classList.remove('active');
                        showJammerStatus(1, true);
                    } else {
                        jammer2Active = true;
                        jammer2ActivateBtn.classList.add('active');
                        jammer2DeactivateBtn.classList.remove('active');
                        showJammerStatus(2, true);
                    }
                    
                    // Scrolla automaticamente allo stato
                    setTimeout(() => {
                        jammerTerminalOutput.scrollTop = jammerTerminalOutput.scrollHeight;
                    }, 100);
                }, 1500);
            }, 1500);
        } else {
            // Disattiva il jammer
            addJammerOutput(`Connessione al dispositivo jammer ${jammerNumber}...`, "info");
            
            setTimeout(() => {
                addJammerOutput(`Invio comando di disattivazione al jammer ${jammerNumber}...`, "warning");
                
                setTimeout(() => {
                    addJammerOutput(`Jammer ${jammerNumber} disattivato con successo.`, "success");
                    
                    // Aggiorna lo stato
                    if (jammerNumber === 1) {
                        jammer1Active = false;
                        jammer1ActivateBtn.classList.remove('active');
                        jammer1DeactivateBtn.classList.add('active');
                        showJammerStatus(1, false);
                    } else {
                        jammer2Active = false;
                        jammer2ActivateBtn.classList.remove('active');
                        jammer2DeactivateBtn.classList.add('active');
                        showJammerStatus(2, false);
                    }
                    
                    // Scrolla automaticamente allo stato
                    setTimeout(() => {
                        jammerTerminalOutput.scrollTop = jammerTerminalOutput.scrollHeight;
                    }, 100);
                }, 1500);
            }, 1500);
        }
    }
    
    // Aggiunge output al terminale del jammer
    function addJammerOutput(text, type = "output") {
        const line = document.createElement('div');
        line.className = `terminal-line ${type}`;
        line.textContent = text;
        jammerTerminalOutput.appendChild(line);
        jammerTerminalOutput.scrollTop = jammerTerminalOutput.scrollHeight;
    }
    
    // Mostra lo stato del jammer MODIFICATO
    function showJammerStatus(jammerNumber, active) {
        let jammerStatusElement;
        if (jammerNumber === 1) {
            jammerStatusElement = jammer1Status;
        } else {
            jammerStatusElement = jammer2Status;
        }
        
        jammerStatusElement.innerHTML = '';
        
        if (active) {
            const statusHTML = `
                <h4><i class="fas fa-wifi"></i> JAMMER ${jammerNumber} ATTIVO</h4>
                <p><strong>Stato:</strong> <span style="color:#0f0;">ATTIVO</span></p>
                <p><strong>Portata:</strong> ${jammerNumber === 1 ? "500 metri" : "750 metri"}</p>
                <p><strong>Frequenze bloccate:</strong> GPS, GSM, 3G/4G, Wi-Fi${jammerNumber === 2 ? ", Bluetooth" : ""}</p>
                <p><strong>Tempo di attività:</strong> ${jammerNumber === 1 ? "12:45:23" : "08:32:17"}</p>
                <p><strong>Batteria:</strong> ${jammerNumber === 1 ? "78%" : "92%"}</p>
                <p><strong>Posizione:</strong> ${jammerNumber === 1 ? "Zona Nord - Torre 1" : "Zona Sud - Torre 2"}</p>
                <p><strong>Avviso:</strong> Tutti i segnali radio nell'area sono disturbati.</p>
            `;
            jammerStatusElement.innerHTML = statusHTML;
        } else {
            const statusHTML = `
                <h4><i class="fas fa-wifi"></i> JAMMER ${jammerNumber} DISATTIVATO</h4>
                <p><strong>Stato:</strong> <span style="color:#f00;">DISATTIVATO</span></p>
                <p><strong>Portata:</strong> 0 metri</p>
                <p><strong>Frequenze bloccate:</strong> Nessuna</p>
                <p><strong>Ultima attivazione:</strong> ${jammerNumber === 1 ? "2 ore fa" : "5 ore fa"}</p>
                <p><strong>Batteria:</strong> ${jammerNumber === 1 ? "92%" : "85%"}</p>
                <p><strong>Posizione:</strong> ${jammerNumber === 1 ? "Zona Nord - Torre 1" : "Zona Sud - Torre 2"}</p>
                <p><strong>Avviso:</strong> Segnali radio operativi normalmente.</p>
            `;
            jammerStatusElement.innerHTML = statusHTML;
        }
        
        jammerStatusElement.style.display = 'block';
    }
    
    // Attiva il protocollo di emergenza
    function activateEmergencyProtocol() {
        if (emergencySequenceActive) return;
        
        emergencySequenceActive = true;
        
        // Mostra avviso nel terminale
        addTerminalOutput("ATTIVAZIONE PROTOCOLLO DI EMERGENZA...", "error");
        addTerminalOutput("Sistema di autodistruzione attivato.", "error");
        addTerminalOutput("Tutti i dati verranno cancellati...", "error");
        
        // Nascondi tutto dopo breve attesa
        setTimeout(() => {
            loginScreen.style.display = 'none';
            mainScreen.style.display = 'none';
            
            // Mostra schermata di emergenza
            emergencyScreen.classList.add('active');
            createChips();
            
            // Fase 1: Cancellazione crittografica dei log e chiavi
            emergencyMessage.textContent = "FASE 1: Cancellazione crittografica in corso...";
            let countdown = 5;
            
            const countdownInterval = setInterval(() => {
                countdownElement.textContent = countdown;
                emergencyProgress.style.width = `${(5 - countdown) * 20}%`;
                
                // Effetti visivi durante la cancellazione
                if (countdown < 5) {
                    // Crea scintille casuali
                    for (let i = 0; i < 3; i++) {
                        createSpark(
                            Math.random() * 300,
                            Math.random() * 300
                        );
                    }
                }
                
                if (countdown === 3) {
                    emergencyMessage.textContent = "FASE 1: Cancellazione crittografica in corso...";
                    simulateDataDestruction();
                }
                
                if (countdown === 0) {
                    clearInterval(countdownInterval);
                    startPhase2();
                }
                
                countdown--;
            }, 1000);
        }, 1000);
    }
    
    // Aggiungi chip all'animazione di distruzione
    function createChips() {
        destructionAnimation.innerHTML = '<div class="circuit-board"></div>';
        
        const chipTypes = ['FPGA', 'GPS', 'WIFI', 'GSM', 'CPU', 'RAM', 'MODEM', 'CRYPTO'];
        const chipCount = 8;
        
        for (let i = 0; i < chipCount; i++) {
            const chip = document.createElement('div');
            chip.className = 'chip';
            chip.textContent = chipTypes[i];
            chip.style.top = `${20 + (i % 4) * 70}px`;
            chip.style.left = `${20 + Math.floor(i / 4) * 130}px`;
            destructionAnimation.appendChild(chip);
        }
    }
    
    // Crea effetto scintille
    function createSpark(x, y) {
        const spark = document.createElement('div');
        spark.className = 'spark';
        spark.style.left = `${x}px`;
        spark.style.top = `${y}px`;
        
        // Direzione casuale
        const angle = Math.random() * Math.PI * 2;
        const distance = 50 + Math.random() * 100;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        spark.style.setProperty('--tx', `${tx}px`);
        spark.style.setProperty('--ty', `${ty}px`);
        
        destructionAnimation.appendChild(spark);
        
        // Rimuovi dopo l'animazione
        setTimeout(() => spark.remove(), 500);
    }
    
    // Simula distruzione dati
    function simulateDataDestruction() {
        const messages = [
            "Cancellazione log di sistema...",
            "Distruzione chiavi crittografiche...",
            "Sovrascrittura memoria flash...",
            "Eliminazione tracce di accesso...",
            "Pulizia cache operativa..."
        ];
        
        let messageIndex = 0;
        const messageInterval = setInterval(() => {
            if (messageIndex < messages.length) {
                emergencyMessage.textContent = `FASE 1: ${messages[messageIndex]}`;
                messageIndex++;
            } else {
                clearInterval(messageInterval);
            }
        }, 300);
    }
    
    // Fase 2: Impulso di sovratensione
    function startPhase2() {
        emergencyMessage.textContent = "FASE 2: Attivazione impulso di sovratensione...";
        countdownElement.textContent = "3";
        
        let phase2Countdown = 3;
        const phase2Interval = setInterval(() => {
            countdownElement.textContent = phase2Countdown;
            emergencyProgress.style.width = `${50 + (3 - phase2Countdown) * 16.7}%`;
            
            // Effetti di sovratensione più intensi
            if (phase2Countdown < 3) {
                // Brucia i chip
                const chips = document.querySelectorAll('.chip');
                chips[3 - phase2Countdown - 1]?.classList.add('burning');
                
                // Più scintille
                for (let i = 0; i < 10; i++) {
                    createSpark(
                        Math.random() * 300,
                        Math.random() * 300
                    );
                }
            }
            
            if (phase2Countdown === 0) {
                clearInterval(phase2Interval);
                
                // Brucia tutti i chip rimanenti
                document.querySelectorAll('.chip').forEach(chip => {
                    if (!chip.classList.contains('burning')) {
                        chip.classList.add('burning');
                    }
                });
                
                setTimeout(startPhase3, 1000);
            }
            
            phase2Countdown--;
        }, 1000);
    }
    
    // Fase 3: Ripristino schermo standard
    function startPhase3() {
        emergencyMessage.textContent = "FASE 3: Ripristino configurazione standard...";
        countdownElement.textContent = "COMPLETATO";
        emergencyProgress.style.width = "100%";
        
        // Effetto finale
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                createSpark(
                    Math.random() * 300,
                    Math.random() * 300
                );
            }, i * 50);
        }
        
        setTimeout(() => {
            // Nascondi schermata di emergenza
            emergencyScreen.classList.remove('active');
            
            // Mostra schermata di blocco standard
            lockScreen.classList.add('active');
            updateLockScreenTime();
            
            // Aggiorna l'ora in tempo reale
            setInterval(updateLockScreenTime, 60000); // Ogni minuto
            
            // Resetta lo stato di emergenza dopo un po'
            setTimeout(() => {
                emergencySequenceActive = false;
            }, 5000);
        }, 2000);
    }
    
    // Aggiorna schermata di blocco con ora corrente
    function updateLockScreenTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('it-IT', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        const dateString = now.toLocaleDateString('it-IT', { 
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        lockScreenTime.textContent = timeString;
        lockScreenDate.textContent = dateString;
    }
    
    // Resetta tutte le attività MODIFICATO
    function resetAllActivities() {
        gpsTrackingInProgress = false;
        cameraHackInProgress = false;
        jammer1Active = false;
        jammer2Active = false;
        
        // Resetta le interfacce
        phoneNumbersInput.value = '';
        gpsTerminalOutput.innerHTML = '';
        gpsResultsContainer.innerHTML = '';
        cameraTerminalOutput.innerHTML = '';
        camerasGrid.style.display = 'none';
        camerasGrid.innerHTML = '';
        jammerTerminalOutput.innerHTML = '';
        jammer1Status.style.display = 'none';
        jammer2Status.style.display = 'none';
        jammer1ActivateBtn.classList.remove('active');
        jammer1DeactivateBtn.classList.remove('active');
        jammer2ActivateBtn.classList.remove('active');
        jammer2DeactivateBtn.classList.remove('active');
        
        // Pulisci il terminale principale
        terminalOutput.innerHTML = '';
        
        // Resetta il menu al terminale
        menuItems.forEach(item => item.classList.remove('active'));
        document.querySelector('.menu-item[data-screen="terminal"]').classList.add('active');
        
        activityScreens.forEach(screen => screen.classList.remove('active'));
        document.getElementById('terminal-screen').classList.add('active');
        
        // Reset emergenza
        emergencySequenceActive = false;
        
        // Reset schermate
        emergencyScreen.classList.remove('active');
        lockScreen.classList.remove('active');
    }
    
    // Crea effetto Matrix in background
    function createMatrixEffect() {
        const canvas = document.createElement('canvas');
        const matrixBg = document.getElementById('matrix-bg');
        matrixBg.appendChild(canvas);
        const ctx = canvas.getContext('2d');
        
        // Imposta dimensioni canvas
        canvas.width = matrixBg.clientWidth;
        canvas.height = matrixBg.clientHeight;
        
        // Adatta le dimensioni al ridimensionamento della finestra
        window.addEventListener('resize', function() {
            canvas.width = matrixBg.clientWidth;
            canvas.height = matrixBg.clientHeight;
        });
        
        // Caratteri per l'effetto Matrix
        const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
        const charArray = chars.split("");
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = [];
        
        // Inizializza le gocce
        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }
        
        // Funzione di disegno
        function drawMatrix() {
            // Sfondo semitrasparente per effetto scia
            ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Colore dei caratteri
            ctx.fillStyle = "#0f0";
            ctx.font = `${fontSize}px monospace`;
            
            // Disegna i caratteri
            for (let i = 0; i < drops.length; i++) {
                const text = charArray[Math.floor(Math.random() * charArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                // Fa ricadere le gocce
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        
        // Avvia l'animazione
        setInterval(drawMatrix, 35);
    }
    
    // Comandi disponibili per il terminale principale
    const commands = {
        help: "Mostra tutti i comandi disponibili",
        clear: "Pulisce lo schermo del terminale",
        about: "Informazioni su questo sistema",
        date: "Mostra data e ora attuali",
        sysinfo: "Mostra informazioni di sistema",
        status: "Mostra lo stato delle attività",
        reboot: "Riavvia il terminale",
    };
});
