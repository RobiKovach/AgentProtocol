import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Settings, Info } from "lucide-react";

interface Agent {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  trustScore: number;
  decision: "yes" | "no" | "abstain" | "analyzing";
  connections: string[];
  confidence: number;
  color: string;
}

const DemoPage = () => {
  const [isFinished, setIsFinished] = useState(false);
  const [result, setResult] = useState<"yes" | "no" | "abstain" | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [agentCount, setAgentCount] = useState(12);
  const [speed, setSpeed] = useState(1);
  const [hoveredAgent, setHoveredAgent] = useState<Agent | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  const [proposalText, setProposalText] = useState(
    "Should the protocol increase the minimum stake requirement from 100 to 500 tokens?"
  );

  const proposalOptions = [
    "Should the protocol increase the minimum stake requirement from 100 to 500 tokens?",
    "Should agents be allowed to auto-delegate votes?",
    "Should we switch to a quadratic voting system?",
    "Should the treasury be diversified into real-world assets?",
  ];

  const createAgents = (count: number): Agent[] => {
    const newAgents: Agent[] = [];
    const colors = [
      "#00D2FF",
      "#8B5CF6",
      "#F59E0B",
      "#EF4444",
      "#10B981",
      "#EC4899",
    ];

    for (let i = 0; i < count; i++) {
      const agent: Agent = {
        id: `agent-${i}`,
        x: Math.random() * 600 + 50,
        y: Math.random() * 400 + 50,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        trustScore: Math.random() * 0.8 + 0.2,
        decision: "analyzing",
        connections: [],
        confidence: Math.random() * 0.6 + 0.4,
        color: colors[i % colors.length],
      };
      newAgents.push(agent);
    }

    // Create random connections
    newAgents.forEach((agent) => {
      const connectionCount = Math.floor(Math.random() * 3) + 1;
      const availableAgents = newAgents.filter((a) => a.id !== agent.id);

      for (let i = 0; i < connectionCount && i < availableAgents.length; i++) {
        const randomAgent =
          availableAgents[Math.floor(Math.random() * availableAgents.length)];
        if (!agent.connections.includes(randomAgent.id)) {
          agent.connections.push(randomAgent.id);
        }
      }
    });

    return newAgents;
  };

  useEffect(() => {
    setAgents(createAgents(agentCount));
  }, [agentCount]);

  const updateAgents = () => {
    setAgents((prev) =>
      prev.map((agent) => {
        const newAgent = { ...agent };

        // Update position
        newAgent.x += newAgent.vx * speed;
        newAgent.y += newAgent.vy * speed;

        // Bounce off walls
        if (newAgent.x <= 25 || newAgent.x >= 675) newAgent.vx *= -1;
        if (newAgent.y <= 25 || newAgent.y >= 475) newAgent.vy *= -1;

        // Keep within bounds
        newAgent.x = Math.max(25, Math.min(675, newAgent.x));
        newAgent.y = Math.max(25, Math.min(475, newAgent.y));

        // Simulate decision making
        if (Math.random() < 0.01) {
          const decisions: Array<"yes" | "no" | "abstain"> = [
            "yes",
            "no",
            "abstain",
          ];
          const weights = [
            newAgent.trustScore * newAgent.confidence,
            (1 - newAgent.trustScore) * newAgent.confidence,
            1 - newAgent.confidence,
          ];

          const totalWeight = weights.reduce((sum, w) => sum + w, 0);
          const random = Math.random() * totalWeight;
          let cumulative = 0;

          for (let i = 0; i < decisions.length; i++) {
            cumulative += weights[i];
            if (random <= cumulative) {
              newAgent.decision = decisions[i];
              break;
            }
          }
        }

        const updatedAgents = [...prev];
        const allDecided = updatedAgents.every(
          (agent) => agent.decision !== "analyzing"
        );

        if (allDecided && !isFinished) {
          setIsRunning(false);
          setIsFinished(true);

          const counts = {
            yes: updatedAgents.filter((a) => a.decision === "yes").length,
            no: updatedAgents.filter((a) => a.decision === "no").length,
            abstain: updatedAgents.filter((a) => a.decision === "abstain")
              .length,
          };

          const max = Math.max(counts.yes, counts.no, counts.abstain);
          const winning = Object.entries(counts).find(
            ([_, v]) => v === max
          )?.[0] as "yes" | "no" | "abstain";

          setResult(winning);
        }

        return newAgent;
      })
    );
  };

  const animate = () => {
    if (isRunning) {
      updateAgents();
    }
    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRunning, speed]);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw grid background
    ctx.strokeStyle = "rgba(0, 210, 255, 0.1)";
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 50) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Draw connections
    agents.forEach((agent) => {
      agent.connections.forEach((connectionId) => {
        const connectedAgent = agents.find((a) => a.id === connectionId);
        if (connectedAgent) {
          ctx.strokeStyle = "rgba(139, 92, 246, 0.3)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(agent.x, agent.y);
          ctx.lineTo(connectedAgent.x, connectedAgent.y);
          ctx.stroke();
        }
      });
    });

    // Draw agents
    agents.forEach((agent) => {
      const radius = 8 + agent.trustScore * 4;

      // Agent body
      ctx.fillStyle = agent.color;
      ctx.beginPath();
      ctx.arc(agent.x, agent.y, radius, 0, Math.PI * 2);
      ctx.fill();

      // Decision indicator
      ctx.fillStyle =
        agent.decision === "yes"
          ? "#10B981"
          : agent.decision === "no"
          ? "#EF4444"
          : agent.decision === "abstain"
          ? "#F59E0B"
          : "#6B7280";
      ctx.beginPath();
      ctx.arc(agent.x, agent.y, radius * 0.6, 0, Math.PI * 2);
      ctx.fill();

      // Pulse effect for analyzing
      if (agent.decision === "analyzing") {
        const pulseRadius = radius + Math.sin(Date.now() * 0.01) * 3;
        ctx.strokeStyle = agent.color + "40";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(agent.x, agent.y, pulseRadius, 0, Math.PI * 2);
        ctx.stroke();
      }
    });
  };

  useEffect(() => {
    drawCanvas();
  }, [agents]);

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePos({ x: e.clientX, y: e.clientY });

    const hoveredAgent = agents.find((agent) => {
      const distance = Math.sqrt((agent.x - x) ** 2 + (agent.y - y) ** 2);
      return distance < 15;
    });

    setHoveredAgent(hoveredAgent || null);
  };

  const resetSimulation = () => {
    setIsRunning(false);
    setAgents(createAgents(agentCount));
    setIsFinished(false);
    setResult(null);
  };

  const getDecisionStats = () => {
    const stats = { yes: 0, no: 0, abstain: 0, analyzing: 0 };
    agents.forEach((agent) => {
      stats[agent.decision]++;
    });
    return stats;
  };

  const stats = getDecisionStats();

  return (
    <div className="pt-24 min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Live Agent Demo
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Watch autonomous AI agents analyze and vote on governance proposals
            in real-time
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Demo Canvas */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 border border-cyan-500/20 rounded-2xl p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-cyan-400">
                  Current Proposal
                </h3>
                <div className="mb-4">
                  <label className="text-sm text-cyan-400 mb-1 block">
                    Choose a predefined proposal:
                  </label>
                  <select
                    value={proposalText}
                    onChange={(e) => setProposalText(e.target.value)}
                    className="bg-gray-800 text-white border border-gray-600 rounded px-4 py-2 w-full"
                  >
                    {proposalOptions.map((option, idx) => (
                      <option key={idx} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-6">
                  <label className="text-sm text-cyan-400 mb-1 block">
                    Or write your own:
                  </label>
                  <input
                    type="text"
                    value={proposalText}
                    onChange={(e) => setProposalText(e.target.value)}
                    className="bg-gray-800 text-white border border-gray-600 rounded px-4 py-2 w-full"
                  />
                </div>

                <p className="text-gray-300 bg-gray-800 p-4 rounded-lg">
                  {proposalText}
                </p>
              </div>

              <div className="relative">
                <canvas
                  ref={canvasRef}
                  width={700}
                  height={500}
                  className="w-full border border-gray-700 rounded-lg bg-gray-950 cursor-crosshair"
                  onMouseMove={handleCanvasMouseMove}
                  onMouseLeave={() => setHoveredAgent(null)}
                />

                {/* Tooltip */}
                {hoveredAgent && (
                  <div
                    className="absolute z-10 bg-black border border-cyan-500/50 rounded-lg p-3 pointer-events-none"
                    style={{
                      left: mousePos.x - 200,
                      top: mousePos.y - 100,
                      transform: "translate(-50%, -100%)",
                    }}
                  >
                    <div className="text-sm">
                      <div className="text-cyan-400 font-semibold mb-1">
                        {hoveredAgent.id}
                      </div>
                      <div>
                        Trust Score:{" "}
                        {(hoveredAgent.trustScore * 100).toFixed(0)}%
                      </div>
                      <div>
                        Decision:{" "}
                        <span
                          className={`font-semibold ${
                            hoveredAgent.decision === "yes"
                              ? "text-green-400"
                              : hoveredAgent.decision === "no"
                              ? "text-red-400"
                              : hoveredAgent.decision === "abstain"
                              ? "text-yellow-400"
                              : "text-gray-400"
                          }`}
                        >
                          {hoveredAgent.decision.toUpperCase()}
                        </span>
                      </div>
                      <div>
                        Confidence: {(hoveredAgent.confidence * 100).toFixed(0)}
                        %
                      </div>
                      <div>Connections: {hoveredAgent.connections.length}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="flex flex-wrap items-center justify-between mt-6 pt-6 border-t border-gray-700">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setIsRunning(!isRunning)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                      isRunning
                        ? "bg-red-500 hover:bg-red-600 text-white"
                        : "bg-green-500 hover:bg-green-600 text-white"
                    }`}
                  >
                    {isRunning ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                    <span>{isRunning ? "Pause" : "Start"}</span>
                  </button>

                  <button
                    onClick={resetSimulation}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-all"
                  >
                    <RotateCcw className="h-4 w-4" />
                    <span>Reset</span>
                  </button>
                </div>

                <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                  <div className="flex items-center space-x-2">
                    <Settings className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-400">Agents:</span>
                    <input
                      type="range"
                      min="6"
                      max="20"
                      value={agentCount}
                      onChange={(e) => setAgentCount(Number(e.target.value))}
                      className="w-16"
                    />
                    <span className="text-sm text-white w-6">{agentCount}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-400">Speed:</span>
                    <input
                      type="range"
                      min="0.5"
                      max="3"
                      step="0.5"
                      value={speed}
                      onChange={(e) => setSpeed(Number(e.target.value))}
                      className="w-16"
                    />
                    <span className="text-sm text-white w-6">{speed}x</span>
                  </div>
                </div>
                {isFinished && result && (
                  <div className="mt-8 text-center text-2xl text-cyan-400">
                    🧠 Final Decision: <strong>{result.toUpperCase()}</strong>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Voting Results */}
            <div className="bg-gray-900 border border-purple-500/20 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-purple-400">
                Live Results
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-green-400">✓ Yes</span>
                  <span className="font-semibold">{stats.yes}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-red-400">✗ No</span>
                  <span className="font-semibold">{stats.no}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-yellow-400">◯ Abstain</span>
                  <span className="font-semibold">{stats.abstain}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">⋯ Analyzing</span>
                  <span className="font-semibold">{stats.analyzing}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="text-sm text-gray-400">Current Status:</div>
                <div className="text-lg font-semibold">
                  {stats.yes > stats.no ? (
                    <span className="text-green-400">Proposal Leading</span>
                  ) : stats.no > stats.yes ? (
                    <span className="text-red-400">Proposal Failing</span>
                  ) : (
                    <span className="text-yellow-400">Tied Vote</span>
                  )}
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="bg-gray-900 border border-cyan-500/20 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-cyan-400">
                Agent Legend
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span>Yes Vote</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <span>No Vote</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                  <span>Abstain</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-gray-500 rounded-full animate-pulse"></div>
                  <span>Analyzing</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-1 bg-purple-500/50"></div>
                  <span>Agent Connections</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="text-xs text-gray-400">
                  <Info className="h-4 w-4 inline mr-1" />
                  Agent size indicates trust score. Hover for details.
                </div>
              </div>
            </div>

            {/* Agent Behavior */}
            <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">How It Works</h3>
              <div className="text-sm text-gray-300 space-y-2">
                <p>• Agents move autonomously and analyze the proposal</p>
                <p>• Trust scores influence decision weight</p>
                <p>• Connected agents share information</p>
                <p>• Decisions evolve based on confidence levels</p>
                <p>• Real-time consensus emerges organically</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoPage;
