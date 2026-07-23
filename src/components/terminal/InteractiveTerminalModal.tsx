import React, { useState, useEffect, useRef } from "react";
import { Terminal as TerminalIcon, X, Minimize2, Maximize2, CornerDownLeft } from "lucide-react";
import { projects } from "@/data/projects";
import { blogPosts } from "@/data/blogs";
import { certifications } from "@/data/certifications";
import { toolsAndFrameworks, languagesAndTech, securityExpertise } from "@/data/skills";
import { achievements } from "@/data/achievements";
import { getRandomTerminalBanner } from "@/components/AsciiArt";

interface InteractiveTerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandOutput {
  id: number;
  command: string;
  output: React.ReactNode;
}

export const InteractiveTerminalModal: React.FC<InteractiveTerminalModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<CommandOutput[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isMaximized, setIsMaximized] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      if (history.length === 0) {
        showWelcomeBanner();
      }
    }
  }, [isOpen]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  if (!isOpen) return null;

  /** Builds a banner output node using a freshly-picked random ASCII art */
  const buildBannerOutput = (): React.ReactNode => (
    <div className="space-y-2 text-xs md:text-sm">
      <pre className="text-cyber-green font-mono leading-none overflow-x-auto max-w-full text-[0.4rem] sm:text-[0.55rem] md:text-xs lg:text-sm">
        {getRandomTerminalBanner()}
      </pre>
      <p className="text-cyber-blue font-bold">
        Interactive Security Shell v2.5 [cyb3ritic OS]
      </p>
      <p className="text-gray-400">
        Type <span className="text-cyber-green font-bold">"help"</span> to view all available commands or{" "}
        <span className="text-cyber-purple font-bold font-mono">"cv"</span> to download resume.
      </p>
    </div>
  );

  /** Shows the initial welcome banner — replaces history on first open */
  const showWelcomeBanner = () => {
    const welcomeOutput: CommandOutput = {
      id: Date.now(),
      command: "",
      output: buildBannerOutput(),
    };
    setHistory([welcomeOutput]);
  };

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    // Add to command history
    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    let responseNode: React.ReactNode;

    switch (trimmed) {
      case "help":
        responseNode = (
          <div className="space-y-1 text-sm">
            <p className="text-cyber-green font-bold">Available Commands:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1 text-xs md:text-sm">
              <div><span className="text-cyber-blue font-mono font-bold">whoami / about</span> - Security researcher profile</div>
              <div><span className="text-cyber-blue font-mono font-bold">skills</span> - Tools, languages & expertise</div>
              <div><span className="text-cyber-blue font-mono font-bold">projects</span> - View offensive & security projects</div>
              <div><span className="text-cyber-blue font-mono font-bold">blogs</span> - HackTheBox & TryHackMe writeups</div>
              <div><span className="text-cyber-blue font-mono font-bold">certs</span> - Verified certifications</div>
              <div><span className="text-cyber-blue font-mono font-bold">achievements</span> - CTF rank & bug bounty stats</div>
              <div><span className="text-cyber-blue font-mono font-bold">contact</span> - Email & social channels</div>
              <div><span className="text-cyber-blue font-mono font-bold">cv / resume</span> - Download official PDF CV</div>
              <div><span className="text-cyber-blue font-mono font-bold">banner</span> - Display cyb3ritic banner</div>
              <div><span className="text-cyber-blue font-mono font-bold">clear</span> - Clear terminal output</div>
              <div><span className="text-cyber-blue font-mono font-bold">date</span> - Print system timestamp</div>
              <div><span className="text-cyber-blue font-mono font-bold">exit / quit</span> - Close terminal window</div>
            </div>
          </div>
        );
        break;

      case "whoami":
      case "about":
        responseNode = (
          <div className="space-y-2 text-sm text-gray-300">
            <p className="text-cyber-green font-bold">&gt; USER: cyb3ritic (Samip Aanand Shah)</p>
            <p className="text-cyber-blue">&gt; ROLE: Ethical Hacker & Security Researcher</p>
            <p>&gt; LOCATION: Nepal</p>
            <p>&gt; BIO: Dedicated cybersecurity researcher specializing in web application penetration testing, vulnerability analysis, and tool development. Dedicated to responsible disclosure and continuous learning.</p>
          </div>
        );
        break;

      case "skills":
        responseNode = (
          <div className="space-y-3 text-sm">
            <div>
              <span className="text-cyber-blue font-bold">🛠 Tools & Frameworks:</span>
              <p className="text-gray-300">{toolsAndFrameworks.map((t) => t.name).join(" • ")}</p>
            </div>
            <div>
              <span className="text-cyber-green font-bold">💻 Languages:</span>
              <p className="text-gray-300">{languagesAndTech.map((l) => l.name).join(" • ")}</p>
            </div>
            <div>
              <span className="text-cyber-purple font-bold">🛡 Security Domains:</span>
              <p className="text-gray-300">{securityExpertise.map((s) => s.name).join(" • ")}</p>
            </div>
          </div>
        );
        break;

      case "projects":
        responseNode = (
          <div className="space-y-2 text-sm">
            <p className="text-cyber-green font-bold">Featured Projects:</p>
            {projects.map((p) => (
              <div key={p.id} className="border-l-2 border-cyber-blue pl-3 py-1">
                <span className="text-cyber-blue font-bold">{p.title}</span> - {p.description}
                <div className="text-xs text-cyber-purple">
                  Repo: <a href={p.github} target="_blank" rel="noopener noreferrer" className="underline hover:text-cyber-green">{p.github}</a>
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case "blogs":
        responseNode = (
          <div className="space-y-2 text-sm">
            <p className="text-cyber-green font-bold font-mono">Latest Writeups & Research:</p>
            {blogPosts.map((b) => (
              <div key={b.id} className="border-l-2 border-cyber-green pl-3 py-1">
                <span className="text-cyber-green font-bold">[{b.platform}] {b.title}</span>
                <p className="text-xs text-gray-400">{b.description}</p>
                <a href={b.link} target="_blank" rel="noopener noreferrer" className="text-xs text-cyber-blue underline hover:text-white">Read post</a>
              </div>
            ))}
          </div>
        );
        break;

      case "certs":
        responseNode = (
          <div className="space-y-2 text-sm">
            <p className="text-cyber-purple font-bold">Verified Certifications:</p>
            {certifications.map((c) => (
              <div key={c.id} className="text-xs md:text-sm text-gray-300">
                • <span className="text-cyber-purple font-bold">{c.title}</span> ({c.issuer} - {c.date})
              </div>
            ))}
          </div>
        );
        break;

      case "achievements":
      case "disclosures":
        responseNode = (
          <div className="space-y-2 text-sm">
            <p className="text-cyber-green font-bold">CTF Ranks & Research Milestones:</p>
            {achievements.map((a) => (
              <div key={a.id} className="border-l-2 border-cyber-purple pl-3 py-1 text-xs md:text-sm">
                <span className="text-cyber-purple font-bold">[{a.metric}]</span> {a.title}
                <p className="text-gray-400">{a.description}</p>
              </div>
            ))}
          </div>
        );
        break;

      case "contact":
        responseNode = (
          <div className="space-y-1 text-sm">
            <p className="text-cyber-green font-bold">Communication Channels:</p>
            <p>📧 Email: <a href="mailto:cy3ritic@gmail.com" className="text-cyber-blue underline">cy3ritic@gmail.com</a></p>
            <p>🐙 GitHub: <a href="https://github.com/cyb3ritic" target="_blank" rel="noopener noreferrer" className="text-cyber-blue underline">@cyb3ritic</a></p>
            <p>💼 LinkedIn: <a href="https://linkedin.com/in/cyb3ritic" target="_blank" rel="noopener noreferrer" className="text-cyber-blue underline">@cyb3ritic</a></p>
            <p>🌐 Blog: <a href="https://blog.samipshah.com.np" target="_blank" rel="noopener noreferrer" className="text-cyber-blue underline">blog.samipshah.com.np</a></p>
          </div>
        );
        break;

      case "cv":
      case "resume":
        triggerCvDownload();
        responseNode = (
          <div className="text-cyber-green font-bold">
            📥 Initiating resume download... [Samip_Shah_Resume.pdf]
          </div>
        );
        break;

      case "banner":
        // Append a fresh random banner to history each time
        responseNode = buildBannerOutput();
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      case "date":
        responseNode = <div className="text-gray-300">{new Date().toString()}</div>;
        break;

      case "exit":
      case "quit":
        onClose();
        return;

      default:
        responseNode = (
          <div className="text-red-400 text-sm">
            Command not recognized: <span className="font-mono underline">{trimmed}</span>. Type <span className="text-cyber-green font-bold">"help"</span> for commands list.
          </div>
        );
        break;
    }

    const newOutput: CommandOutput = {
      id: Date.now(),
      command: cmdStr,
      output: responseNode,
    };

    setHistory((prev) => [...prev, newOutput]);
    setInput("");
  };

  const triggerCvDownload = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Samip_Shah_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIndex = historyIndex + 1;
        if (nextIndex < commandHistory.length) {
          setHistoryIndex(nextIndex);
          setInput(commandHistory[commandHistory.length - 1 - nextIndex]);
        }
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInput(commandHistory[commandHistory.length - 1 - nextIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div
        className={`w-full bg-cyber-black border-2 border-cyber-green/50 rounded-lg shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ${
          isMaximized ? "h-[96dvh] max-w-[98vw]" : "h-[85dvh] sm:h-[80vh] max-w-4xl"
        }`}
      >
        {/* Terminal Header Bar */}
        <div className="bg-cyber-dark px-4 py-2 border-b border-cyber-green/30 flex justify-between items-center select-none">
          <div className="flex items-center space-x-2 min-w-0">
            <TerminalIcon size={18} className="text-cyber-green flex-shrink-0" />
            <span className="font-mono text-xs md:text-sm font-bold text-gray-200 truncate">
              <span className="sm:hidden">cyb3ritic@~</span>
              <span className="hidden sm:inline">cyb3ritic@security-shell:~</span>
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="text-gray-400 hover:text-cyber-blue p-1 transition-colors"
              title={isMaximized ? "Restore window" : "Maximize window"}
            >
              {isMaximized ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-red-400 p-1 transition-colors"
              title="Close terminal"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Terminal Output Body */}
        <div
          className="flex-1 p-2 sm:p-4 overflow-y-auto overflow-x-hidden font-mono text-sm space-y-4 bg-black/90 scrollbar-thin scrollbar-thumb-cyber-green/30"
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((item) => (
            <div key={item.id} className="space-y-1">
              {item.command && (
                <div className="flex items-center text-cyber-green font-bold">
                  <span className="text-cyber-blue mr-2">&gt;</span>
                  <span>{item.command}</span>
                </div>
              )}
              <div className="pl-4">{item.output}</div>
            </div>
          ))}

          {/* Active Input Line */}
          <div className="flex items-center text-cyber-green font-bold pt-2">
            <span className="text-cyber-blue mr-2 text-xs sm:text-sm">
              <span className="sm:hidden">&gt;</span>
              <span className="hidden sm:inline">cyb3ritic$&gt;</span>
            </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-cyber-green focus:outline-none font-mono text-xs sm:text-sm"
              placeholder="type 'help'..."
              autoFocus
            />
            <button
              onClick={() => handleCommand(input)}
              className="text-gray-500 hover:text-cyber-green ml-2"
            >
              <CornerDownLeft size={16} />
            </button>
          </div>
          <div ref={terminalEndRef} />
        </div>

        {/* Quick Command Suggestions Footer */}
        <div className="bg-cyber-dark px-2 sm:px-4 py-1.5 sm:py-2 border-t border-cyber-green/20 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-1.5 sm:gap-2 text-[0.65rem] sm:text-xs font-mono min-w-max">
            <span className="text-gray-400">Quick Cmds:</span>
            {["help", "whoami", "skills", "projects", "cv"].map((cmd) => (
              <button
                key={cmd}
                onClick={() => handleCommand(cmd)}
                className="px-1.5 sm:px-2 py-0.5 rounded bg-cyber-black border border-cyber-green/30 text-cyber-green hover:bg-cyber-green hover:text-cyber-black transition-colors whitespace-nowrap"
              >
                {cmd}
              </button>
            ))}
            <span className="hidden sm:inline-flex gap-1.5 sm:gap-2">
              {["achievements", "clear"].map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => handleCommand(cmd)}
                  className="px-1.5 sm:px-2 py-0.5 rounded bg-cyber-black border border-cyber-green/30 text-cyber-green hover:bg-cyber-green hover:text-cyber-black transition-colors whitespace-nowrap"
                >
                  {cmd}
                </button>
              ))}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveTerminalModal;
