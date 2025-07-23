// Terminal commands and data
const commands = {
    help: {
        description: 'List all available commands',
        action: () => `\
Available commands:<br>
<span class="command">about</span> - About Me<br>
<span class="command">projects</span> - My Projects<br>
<span class="command">skills</span> - My Skills<br>
<span class="command">contact</span> - Contact Info<br>
<span class="command">clear</span> - Clear the terminal<br>
<span class="command">help</span> - Show this help message<br>`
    },
    about: {
        description: 'About Me',
        action: () => `\
<div class="command-output info-output">
    <strong>Allwin</strong> - Full Stack Developer<br>
    <br>
    Passionate about building scalable web applications and interactive user experiences.<br>
    <br>
    <strong>Education:</strong> B.Tech Artificial Intelligence and Data Science<br>
    <strong>College:</strong> KIT - Kalaignar Karunanidhi Institute of Technology<br>
    <strong>Location:</strong> India<br>
    <strong>Interests:</strong> Web Development, Open Source, UI/UX, Cloud, AI<br>
</div>`
    },
    projects: {
        description: 'Showcase of my projects',
        action: () => `\
<div class="project-grid">
    <div class="project-card">
        <div class="project-title">Portfolio Terminal</div>
        <div class="project-description">This interactive terminal-style portfolio built with HTML, CSS, and JS.</div>
        <div class="project-tech">HTML, CSS, JavaScript</div>
    </div>
    <div class="project-card">
        <div class="project-title"><a href="https://github.com/ALLWINALLWI/NEXT-MEET" class="contact-link" target="_blank">NEXT-MEET</a></div>
        <div class="project-description">A dynamic event platform built with Django, upgraded from static to full-stack. Demonstrates scalable app design and sets the stage for features like authentication and real-time updates.</div>
        <div class="project-tech">Django, Python, HTML, CSS</div>
    </div>
    <div class="project-card">
        <div class="project-title"><a href="https://github.com/ALLWINALLWI/Drums-player-using-motion-detection" class="contact-link" target="_blank">Python Virtual Drums</a></div>
        <div class="project-description">A fun, touchless musical instrument using real-time hand tracking and sound. Strengthened my skills in OpenCV, video processing, and multimedia integration.</div>
        <div class="project-tech">Python, OpenCV</div>
    </div>
</div>`
    },
    skills: {
        description: 'List of my skills',
        action: () => `\
<div class="skill-category">
    <div class="skill-title">Frontend</div>
    <div class="skill-list">
        <span class="skill-item">HTML</span>
        <span class="skill-item">CSS</span>
        <span class="skill-item">JavaScript</span>
        <span class="skill-item">React</span>
        <span class="skill-item">Figma</span>
        <span class="skill-item">Canva</span>
    </div>
</div>
<div class="skill-category">
    <div class="skill-title">Backend & Programming</div>
    <div class="skill-list">
        <span class="skill-item">Python</span>
        <span class="skill-item">Node.js</span>
        <span class="skill-item">SQL</span>
    </div>
</div>
<div class="skill-category">
    <div class="skill-title">Productivity</div>
    <div class="skill-list">
        <span class="skill-item">Excel</span>
        <span class="skill-item">Google Sheets</span>
        <span class="skill-item">Git</span>
    </div>
</div>`
    },
    contact: {
        description: 'Contact Information',
        action: () => `\
<div class="contact-info">
    <div class="contact-item"><span class="contact-icon">📧</span> <a class="contact-link" href="mailto:kit26.ad07@gmail.com">kit26.ad07@gmail.com</a></div>
    <div class="contact-item"><span class="contact-icon">💼</span> <a class="contact-link" href="https://www.linkedin.com/in/allwin-t-604561371?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank">linkedin.com/in/allwin-t-604561371</a></div>
    <div class="contact-item"><span class="contact-icon">🐙</span> <a class="contact-link" href="https://github.com/ALLWINALLWI" target="_blank">github.com/ALLWINALLWI</a></div>
</div>`
    },
    clear: {
        description: 'Clear the terminal',
        action: () => ''
    }
};

const output = document.getElementById('output');
const input = document.getElementById('command-input');
const modal = document.getElementById('easter-egg-modal');
const matrixText = document.querySelector('.matrix-text');

let commandHistory = [];
let historyIndex = -1;
let isRemote = false;
let localPrompt = 'allwin@portfolio:~$';
let remotePrompt = 'allwin@remote:~$';
let currentPrompt = localPrompt;

function setPrompt() {
    currentPrompt = isRemote ? remotePrompt : localPrompt;
    // Update all prompt spans in the input and output
    document.querySelectorAll('.prompt').forEach(span => span.textContent = currentPrompt);
}

function printOutput(html, isError = false) {
    const div = document.createElement('div');
    div.className = 'command-output' + (isError ? ' error-output' : '');
    div.innerHTML = html;
    output.appendChild(div);
    output.scrollTop = output.scrollHeight;
}

function printPromptedCommand(cmd) {
    printOutput(`<span class="prompt">${currentPrompt}</span> ${cmd}`);
}

function handleCommand(inputCmd) {
    const fullCmd = inputCmd.trim();
    if (fullCmd === '') return;
    // Print the command as entered
    printPromptedCommand(fullCmd);

    // Command chaining: split by &&, ;, or |
    const chainRegex = /\s*(?:&&|;|\|)\s*/g;
    const commandsToRun = fullCmd.split(chainRegex);
    let chainIndex = 0;

    function runNextCommand() {
        if (chainIndex >= commandsToRun.length) return;
        const cmd = commandsToRun[chainIndex].trim().toLowerCase();
        chainIndex++;
        // SSH simulation
        if (/^ssh\s+allwin@portfolio/.test(cmd)) {
            printOutput('Connecting to allwin@portfolio...', false);
            setTimeout(() => {
                isRemote = true;
                setPrompt();
                printOutput('<span class="success-output">Welcome to Allwin\'s remote portfolio!<br>Type <span class="command">exit</span> to disconnect.</span>');
                runNextCommand();
            }, 1200);
        } else if (cmd === 'exit' && isRemote) {
            printOutput('Disconnecting...', false);
            setTimeout(() => {
                isRemote = false;
                setPrompt();
                printOutput('<span class="info-output">Returned to local terminal.</span>');
                runNextCommand();
            }, 800);
        } else if (cmd === 'install') {
            showProgressBar('Installing dependencies...', () => {
                printOutput('<span class="success-output">Install complete!</span>');
                runNextCommand();
            });
        } else if (commands[cmd]) {
            if (cmd === 'clear') {
                output.innerHTML = '';
                runNextCommand();
                return;
            }
            printOutput(commands[cmd].action());
            runNextCommand();
        } else if (cmd) {
            printOutput(`Command not found: <span class="command">${cmd}</span><br>Type <span class="command">help</span> to see available commands.`, true);
            runNextCommand();
        }
    }
    runNextCommand();
}

function showProgressBar(message, callback) {
    const div = document.createElement('div');
    div.className = 'command-output info-output';
    div.innerHTML = `${message}<br><div class="progress-bar-bg"><div class="progress-bar-fill"></div></div>`;
    output.appendChild(div);
    output.scrollTop = output.scrollHeight;
    const fill = div.querySelector('.progress-bar-fill');
    let percent = 0;
    const interval = setInterval(() => {
        percent += Math.random() * 20;
        if (percent > 100) percent = 100;
        fill.style.width = percent + '%';
        if (percent >= 100) {
            clearInterval(interval);
            setTimeout(callback, 400);
        }
    }, 200);
}

input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        if (input.value.trim() !== '') {
            commandHistory.push(input.value);
            historyIndex = commandHistory.length;
        }
        handleCommand(input.value);
        input.value = '';
    } else if (e.key === 'ArrowUp') {
        if (commandHistory.length > 0 && historyIndex > 0) {
            historyIndex--;
            input.value = commandHistory[historyIndex];
            setTimeout(() => input.setSelectionRange(input.value.length, input.value.length), 0);
        } else if (commandHistory.length > 0 && historyIndex === 0) {
            input.value = commandHistory[0];
            setTimeout(() => input.setSelectionRange(input.value.length, input.value.length), 0);
        }
        e.preventDefault();
    } else if (e.key === 'ArrowDown') {
        if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
            historyIndex++;
            input.value = commandHistory[historyIndex];
            setTimeout(() => input.setSelectionRange(input.value.length, input.value.length), 0);
        } else if (historyIndex >= commandHistory.length - 1) {
            historyIndex = commandHistory.length;
            input.value = '';
        }
        e.preventDefault();
    }
});

// Keep input focused
window.addEventListener('click', () => input.focus());
window.addEventListener('keydown', () => input.focus());

// Copy feature: click output to copy
output.addEventListener('click', function(e) {
    let target = e.target;
    // If user clicks inside a command-output block, copy its text
    while (target && !target.classList.contains('command-output')) {
        target = target.parentElement;
    }
    if (target && target.classList.contains('command-output')) {
        const text = target.innerText;
        navigator.clipboard.writeText(text).then(() => {
            // Show a temporary tooltip/message
            const oldBg = target.style.backgroundColor;
            target.style.backgroundColor = '#0096ff';
            target.style.color = '#fff';
            target.setAttribute('data-copied', 'Copied!');
            setTimeout(() => {
                target.style.backgroundColor = '';
                target.style.color = '';
                target.removeAttribute('data-copied');
            }, 700);
        });
    }
});

// Paste feature: highlight input on paste
input.addEventListener('paste', function(e) {
    input.style.backgroundColor = '#2222ff33';
    setTimeout(() => {
        input.style.backgroundColor = '';
    }, 300);
});

// Initial focus
input.focus(); 