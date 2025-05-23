import React, { useState, useEffect, useRef } from "react";
import { X, Terminal, Shield, Zap, Skull, Wifi, Lock, Eye, Target, AlertTriangle } from "lucide-react";

interface EasterEggProps {
  onClose: () => void;
}

const EasterEgg: React.FC<EasterEggProps> = ({ onClose }) => {
  const [phase, setPhase] = useState(0);
  const [exploitProgress, setExploitProgress] = useState(0);
  const [showTerminal, setShowTerminal] = useState(false);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [currentCommand, setCurrentCommand] = useState("");
  const [showPayload, setShowPayload] = useState(false);
  const [vulnScanComplete, setVulnScanComplete] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  const exploitSequence = [
    "nmap -sS -O target.system.local",
    "Found open ports: 22, 80, 443, 1337",
    "sqlmap -u http://target.system.local --dbs",
    "Vulnerable to SQL injection detected!",
    "msfconsole > use exploit/multi/handler",
    "Payload delivered successfully...",
    "Shell acquired! Access level: ROOT",
    "Welcome to the Matrix, Neo... 😎"
  ];

  const vulnerabilities = [
    { name: "SQL Injection", severity: "CRITICAL", cve: "CVE-2023-1337", exploited: false },
    { name: "XSS Stored", severity: "HIGH", cve: "CVE-2023-4242", exploited: false },
    { name: "Directory Traversal", severity: "MEDIUM", cve: "CVE-2023-7777", exploited: false },
    { name: "Weak Authentication", severity: "LOW", cve: "CVE-2023-9999", exploited: false }
  ];

  const [vulnList, setVulnList] = useState(vulnerabilities);

  useEffect(() => {
    if (phase === 1) {
      const interval = setInterval(() => {
        setExploitProgress(prev => {
          if (prev >= 100) {
            setPhase(2);
            setShowTerminal(true);
            return 100;
          }
          return prev + 1.5;
        });
      }, 60);
      return () => clearInterval(interval);
    }
  }, [phase]);

  useEffect(() => {
    if (showTerminal && terminalLines.length < exploitSequence.length) {
      const timeout = setTimeout(() => {
        setTerminalLines(prev => [...prev, exploitSequence[prev.length]]);
        
        // Mark vulnerabilities as exploited based on progress
        if (terminalLines.length === 3) {
          setVulnList(prev => prev.map((v, i) => i === 0 ? {...v, exploited: true} : v));
        }
        if (terminalLines.length === 5) {
          setVulnList(prev => prev.map((v, i) => i <= 1 ? {...v, exploited: true} : v));
        }
      }, 1200);
      return () => clearTimeout(timeout);
    } else if (terminalLines.length === exploitSequence.length) {
      setVulnScanComplete(true);
      setTimeout(() => setPhase(3), 2000);
    }
  }, [showTerminal, terminalLines]);

  const handleInitialClick = () => {
    setPhase(1);
  };

  const handleCommandSubmit = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const cmd = currentCommand.toLowerCase();
      if (cmd.includes('cat flag.txt') || cmd.includes('whoami') || cmd.includes('ls /root')) {
        setShowPayload(true);
      }
      setCurrentCommand("");
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return 'text-red-400 border-red-400';
      case 'HIGH': return 'text-orange-400 border-orange-400';
      case 'MEDIUM': return 'text-yellow-400 border-yellow-400';
      case 'LOW': return 'text-blue-400 border-blue-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  const MatrixRain = () => {
    const chars = "01ABCDEFHIJKLMNOPQRSTUVWXYZ!@#$%^&*()<>?";
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 80 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-green-400 text-xs font-mono opacity-10 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${1 + Math.random() * 4}s`
            }}
          >
            {chars.charAt(Math.floor(Math.random() * chars.length))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black backdrop-blur-md overflow-hidden">
      <MatrixRain />
      
      <div className="bg-gray-900 border-2 border-green-400 rounded-lg max-w-5xl w-full max-h-[95vh] overflow-auto p-6 relative shadow-[0_0_60px_rgba(34,197,94,0.4)] animate-matrix-glow">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-green-400 hover:text-red-400 transition-colors z-10"
        >
          <X size={24} />
        </button>

        {/* Phase 0: Initial Recon */}
        {phase === 0 && (
          <div className="text-center space-y-8 py-12">
            <div className="text-6xl animate-bounce mb-4">💀</div>
            <div className="space-y-2">
              <h2 className="text-5xl font-bold text-green-400 font-mono glitch-text">
                [UNAUTHORIZED ACCESS]
              </h2>
              <div className="text-red-400 font-mono text-lg animate-pulse">
                ⚠️ SECURITY BREACH DETECTED ⚠️
              </div>
            </div>
            
            <div className="bg-black border border-red-400 p-6 rounded-lg max-w-md mx-auto">
              <div className="text-red-400 font-mono text-sm mb-4">
                ALERT: Suspicious activity from IP: 127.0.0.1
              </div>
              <div className="text-green-400 font-mono text-xs space-y-1">
                <div>PORT SCAN DETECTED</div>
                <div>VULNERABILITY PROBE ACTIVE</div>
                <div>PAYLOAD INJECTION ATTEMPT</div>
              </div>
            </div>

            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Well, well... looks like we have a curious hacker here. 
              <br />Ready to see what's behind the firewall?
            </p>
            
            <button
              onClick={handleInitialClick}
              className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-black font-bold py-4 px-8 rounded-lg border-2 border-red-400 shadow-[0_0_30px_rgba(239,68,68,0.6)] transition-all transform hover:scale-105 font-mono"
            >
              🚀 LAUNCH EXPLOIT
            </button>
          </div>
        )}

        {/* Phase 1: Active Exploitation */}
        {phase === 1 && (
          <div className="space-y-6 py-6">
            <div className="flex items-center space-x-4 mb-8">
              <Skull className="text-red-400 animate-pulse" size={32} />
              <h2 className="text-3xl font-bold text-red-400 font-mono">
                ACTIVE EXPLOITATION IN PROGRESS
              </h2>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Exploit Progress */}
              <div className="space-y-4">
                <div className="bg-black border border-green-400 rounded p-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-green-400 font-mono flex items-center">
                      <Target className="mr-2" size={16} />
                      EXPLOITATION STATUS
                    </span>
                    <span className="text-red-400 font-mono">{Math.floor(exploitProgress)}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-4">
                    <div 
                      className="bg-gradient-to-r from-red-500 via-orange-500 to-green-400 h-4 rounded-full transition-all duration-100 shadow-[0_0_15px_rgba(239,68,68,0.8)] relative overflow-hidden"
                      style={{ width: `${exploitProgress}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 mt-2 font-mono">
                    {exploitProgress < 30 && "Scanning for vulnerabilities..."}
                    {exploitProgress >= 30 && exploitProgress < 60 && "Injecting payloads..."}
                    {exploitProgress >= 60 && exploitProgress < 90 && "Escalating privileges..."}
                    {exploitProgress >= 90 && "Establishing persistent access..."}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: Shield, label: "Firewall", status: exploitProgress > 25, time: "bypassed" },
                    { icon: Lock, label: "Authentication", status: exploitProgress > 50, time: "cracked" },
                    { icon: Eye, label: "Detection", status: exploitProgress > 75, time: "evaded" },
                    { icon: Zap, label: "Root Access", status: exploitProgress > 95, time: "achieved" }
                  ].map(({ icon: Icon, label, status, time }, i) => (
                    <div key={i} className={`border rounded p-3 text-center transition-all ${
                      status ? 'border-green-400 text-green-400 bg-green-400/10' : 'border-red-600 text-red-400'
                    }`}>
                      <Icon className="mx-auto mb-2" size={20} />
                      <div className="text-xs font-mono font-bold">{label}</div>
                      <div className={`text-xs mt-1 font-mono ${status ? 'text-green-400' : 'text-red-400'}`}>
                        {status ? time.toUpperCase() : 'PROTECTED'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vulnerability Scanner */}
              <div className="bg-black border border-orange-400 rounded p-4">
                <h3 className="text-orange-400 font-mono mb-4 flex items-center">
                  <AlertTriangle className="mr-2" size={16} />
                  VULNERABILITY ASSESSMENT
                </h3>
                <div className="space-y-3">
                  {vulnList.map((vuln, i) => (
                    <div key={i} className={`border rounded p-3 transition-all ${
                      vuln.exploited ? 'border-red-400 bg-red-400/10' : 'border-gray-600'
                    }`}>
                      <div className="flex justify-between items-center">
                        <div>
                          <div className={`font-mono text-sm font-bold ${getSeverityColor(vuln.severity).split(' ')[0]}`}>
                            {vuln.name}
                          </div>
                          <div className="text-xs text-gray-400 font-mono">{vuln.cve}</div>
                        </div>
                        <div className="text-right">
                          <div className={`text-xs px-2 py-1 rounded border font-mono ${getSeverityColor(vuln.severity)}`}>
                            {vuln.severity}
                          </div>
                          {vuln.exploited && (
                            <div className="text-red-400 text-xs mt-1 font-mono animate-pulse">
                              EXPLOITED ✓
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Phase 2: Terminal Exploitation */}
        {phase === 2 && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-6">
              <Terminal className="text-green-400" size={24} />
              <h3 className="text-2xl font-bold text-green-400 font-mono">METASPLOIT FRAMEWORK</h3>
              <div className="text-red-400 text-sm font-mono animate-pulse ml-4">● LIVE SESSION</div>
            </div>
            
            <div ref={terminalRef} className="bg-black border border-green-400 rounded p-4 font-mono text-sm space-y-1 max-h-64 overflow-y-auto shadow-inner">
              <div className="text-green-400 mb-2">
                msf6 &gt; use multi/handler
              </div>
              {terminalLines.map((line, i) => (
                <div key={i} className="text-green-400">
                  {line.startsWith('Found') || line.startsWith('Vulnerable') || line.startsWith('Shell') || line.startsWith('Welcome') ? 
                    <span className="text-red-400">⚡ {line}</span> : 
                    <span><span className="text-yellow-400">kali@localhost:~$</span> {line}</span>
                  }
                </div>
              ))}
              {!vulnScanComplete && (
                <div className="text-green-400 animate-pulse">
                  <span className="text-yellow-400">kali@localhost:~$</span> <span className="bg-green-400 w-2 h-4 inline-block ml-1"></span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Phase 3: Post-Exploitation Playground */}
        {phase === 3 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-red-400 to-purple-500 mb-4 font-mono">
                💀 WELCOME TO THE DARK SIDE 💀
              </h2>
              <p className="text-lg text-green-400 font-mono">ROOT ACCESS ACHIEVED - SYSTEM COMPROMISED</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Hacker Arsenal */}
              <div className="bg-gradient-to-br from-red-900/30 to-orange-900/30 border border-red-400 rounded-lg p-6">
                <h3 className="text-xl font-bold text-red-400 mb-4 flex items-center font-mono">
                  🛠️ HACKER'S ARSENAL
                </h3>
                <div className="space-y-3 text-sm font-mono">
                  <div className="flex justify-between p-2 bg-black/50 rounded">
                    <span className="text-gray-300">Burp Suite Professional</span>
                    <span className="text-green-400">LOADED ✓</span>
                  </div>
                  <div className="flex justify-between p-2 bg-black/50 rounded">
                    <span className="text-gray-300">Metasploit Framework</span>
                    <span className="text-green-400">ACTIVE ✓</span>
                  </div>
                  <div className="flex justify-between p-2 bg-black/50 rounded">
                    <span className="text-gray-300">Nmap & NSE Scripts</span>
                    <span className="text-green-400">READY ✓</span>
                  </div>
                  <div className="flex justify-between p-2 bg-black/50 rounded">
                    <span className="text-gray-300">Custom Exploits</span>
                    <span className="text-orange-400">CRAFTING ⚡</span>
                  </div>
                </div>
              </div>

              {/* Pwned Stats */}
              <div className="bg-gradient-to-br from-green-900/30 to-cyan-900/30 border border-green-400 rounded-lg p-6">
                <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center font-mono">
                  📊 PENETRATION STATS
                </h3>
                <div className="space-y-3 text-sm font-mono">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Systems Pwned:</span>
                    <span className="text-red-400">1337</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">CVEs Exploited:</span>
                    <span className="text-orange-400">42</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Flags Captured:</span>
                    <span className="text-purple-400">∞</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Bug Bounties:</span>
                    <span className="text-green-400">$13,370</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">RedTeam Score:</span>
                    <span className="text-red-400">LEGENDARY</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Shell */}
            <div className="bg-black border border-green-400 rounded p-4">
              <div className="flex items-center mb-3">
                <Wifi className="text-green-400 mr-2 animate-pulse" size={16} />
                <span className="text-green-400 font-mono text-sm">REVERSE SHELL ESTABLISHED</span>
                <span className="text-red-400 font-mono text-xs ml-4">[ROOT@COMPROMISED]</span>
              </div>
              <div className="flex items-center">
                <span className="text-red-400 font-mono text-sm mr-2">root@pwned:~#</span>
                <input
                  type="text"
                  value={currentCommand}
                  onChange={(e) => setCurrentCommand(e.target.value)}
                  onKeyPress={handleCommandSubmit}
                  className="bg-transparent text-green-400 font-mono text-sm outline-none flex-1"
                  placeholder="cat flag.txt | whoami | ls /root"
                />
                <span className="text-green-400 animate-pulse">_</span>
              </div>
              
              {showPayload && (
                <div className="mt-4 p-4 bg-gradient-to-r from-red-900/50 to-purple-900/50 border border-red-400 rounded">
                  <div className="text-center space-y-2">
                    <div className="text-3xl">🏴‍☠️</div>
                    <div className="text-green-400 font-mono text-lg">FLAG&#123;h4ck3r_1n_th3_m4k1ng&#125;</div>
                    <div className="text-purple-300 font-mono text-sm">
                      "The quieter you become, the more you can hear." - Kali Linux
                    </div>
                    <div className="text-xs text-gray-400 mt-3">
                      Keep learning, keep hacking (ethically)! 🔐
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="text-center">
              <button
                onClick={onClose}
                className="bg-gradient-to-r from-red-500 to-purple-600 hover:from-red-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-lg shadow-[0_0_25px_rgba(239,68,68,0.5)] transition-all transform hover:scale-105 font-mono"
              >
                🚪 EXIT BACKDOOR
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .glitch-text {
          animation: glitch 2s infinite;
        }
        
        @keyframes glitch {
          0%, 90%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); filter: hue-rotate(90deg); }
          40% { transform: translate(-2px, -2px); filter: hue-rotate(180deg); }
          60% { transform: translate(2px, 2px); filter: hue-rotate(270deg); }
          80% { transform: translate(2px, -2px); filter: hue-rotate(360deg); }
        }
        
        .animate-matrix-glow {
          animation: matrix-glow 4s ease-in-out infinite;
        }
        
        @keyframes matrix-glow {
          0%, 100% { 
            box-shadow: 0 0 60px rgba(34,197,94,0.4), 0 0 100px rgba(34,197,94,0.2);
            border-color: #22c55e;
          }
          25% { 
            box-shadow: 0 0 80px rgba(239,68,68,0.4), 0 0 120px rgba(239,68,68,0.2);
            border-color: #ef4444;
          }
          50% { 
            box-shadow: 0 0 70px rgba(249,115,22,0.4), 0 0 110px rgba(249,115,22,0.2);
            border-color: #f97316;
          }
          75% { 
            box-shadow: 0 0 75px rgba(168,85,247,0.4), 0 0 115px rgba(168,85,247,0.2);
            border-color: #a855f7;
          }
        }
      `}</style>
    </div>
  );
};

export default EasterEgg;