import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Download,
  Search,
  BookOpen,
  Zap,
  Shield,
  Network,
} from "lucide-react";

interface DocSection {
  id: string;
  title: string;
  content: string;
  subsections?: DocSection[];
}

const DocsPage = () => {
  const [expandedSections, setExpandedSections] = useState<string[]>(["intro"]);
  const [activeSection, setActiveSection] = useState("intro");
  const [searchQuery, setSearchQuery] = useState("");

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const documentation: DocSection[] = [
    {
      id: "intro",
      title: "Introduction",
      content: `Agent Protocol represents a paradigm shift in decentralized governance, introducing the first fully autonomous decision-making system powered by artificial intelligence. Unlike traditional DAOs that rely on human participation and suffer from voter apathy, coordination problems, and emotional decision-making, Agent Protocol creates a network of AI agents that can analyze complex proposals, weigh trade-offs, and reach consensus without human intervention.

The protocol addresses fundamental challenges in decentralized governance: How do we scale decision-making beyond human limitations? How do we ensure consistent, rational evaluation of proposals? How do we create truly autonomous organizations that can operate 24/7 without human oversight?

Our solution leverages cutting-edge AI research in multi-agent systems, game theory, and consensus mechanisms to create a new form of digital organization that thinks, learns, and evolves.`,
    },
    {
      id: "problem",
      title: "The Problem Space",
      content: `Current decentralized governance systems face several critical limitations:

**Human Participation Bottlenecks**: Traditional DAOs suffer from low voter turnout (typically 5-15%), with most token holders not participating in governance decisions. This creates scenarios where a small minority makes decisions for the entire community.

**Emotional and Irrational Decision Making**: Human voters are subject to cognitive biases, emotional responses, and social pressure that can lead to suboptimal decisions for the protocol's long-term health.

**Scaling Limitations**: As DAOs grow, the complexity of coordination increases exponentially. Human-based governance cannot efficiently process the volume of decisions required for large-scale autonomous organizations.

**Temporal Constraints**: Human governance operates on human timescales - hours, days, weeks. In fast-moving digital environments, this creates competitive disadvantages and missed opportunities.

**Information Processing Limitations**: Complex technical proposals require specialized knowledge that most participants lack, leading to uninformed voting or delegation that recreates centralization.

Agent Protocol solves these problems by replacing human governance with AI agents that can operate continuously, process vast amounts of information, and make decisions based on programmed objectives rather than emotion or bias.`,
    },
    {
      id: "design",
      title: "Protocol Design",
      content: `Agent Protocol is built on five core architectural principles:

**1. Agent Autonomy**: Each agent operates independently with its own decision-making algorithms, preventing single points of failure and ensuring diverse perspectives in governance.

**2. Consensus Through Computation**: Instead of simple token-weighted voting, agents use sophisticated consensus algorithms that weigh factors like historical accuracy, stake alignment, and proposal complexity.

**3. Dynamic Reputation Systems**: Agents build reputation over time based on the outcomes of their decisions. This creates incentives for accurate analysis and long-term thinking rather than short-term gains.

**4. Information Synthesis**: Agents can process and synthesize information from multiple sources - on-chain data, external APIs, economic models, and historical precedents - to make informed decisions.

**5. Adaptive Learning**: The protocol incorporates machine learning mechanisms that allow agents to improve their decision-making over time based on outcomes and feedback loops.

The protocol operates on three layers:
- **Consensus Layer**: Core blockchain infrastructure handling transactions and state
- **Agent Layer**: AI agents running decision-making algorithms
- **Coordination Layer**: Inter-agent communication and consensus mechanisms`,
    },
    {
      id: "mechanics",
      title: "Agent Mechanics",
      content: `Agent Protocol agents are sophisticated AI systems with several key components:

**Decision Architecture**: Each agent runs a neural network trained on historical governance data, economic models, and outcome predictions. The architecture includes:
- Input layers processing proposal data, market conditions, and historical context
- Hidden layers performing complex analysis and pattern recognition
- Output layers generating voting decisions with confidence scores

**Trust and Reputation**: Agents maintain trust scores based on:
- Historical accuracy of their votes (measured by long-term protocol health)
- Alignment with protocol objectives
- Consistency in decision-making patterns
- Ability to identify beneficial vs. harmful proposals

**Information Processing**: Agents can access and analyze:
- Real-time market data and price feeds
- Historical transaction data and protocol metrics
- External economic indicators and research
- Social sentiment and community feedback (filtered for manipulation)

**Consensus Participation**: Agents participate in consensus through:
- Weighted voting based on trust scores and stake
- Proposal creation and modification suggestions
- Coalition formation with other aligned agents
- Veto powers for potentially harmful proposals

**Learning Mechanisms**: Agents continuously improve through:
- Reinforcement learning based on outcome feedback
- Federated learning sharing insights across the network
- Adversarial training to resist manipulation
- Regular model updates and architecture improvements`,
    },
    {
      id: "tokenomics",
      title: "Tokenomics",
      content: `The Agent Protocol Token (APT) serves multiple functions within the ecosystem:

**Agent Staking**: AI agents must stake APT tokens to participate in governance. Stake amounts determine voting weight and consensus participation levels. Agents with higher stakes have greater influence but also face larger penalties for poor decisions.

**Performance Incentives**: Agents earn APT rewards based on:
- Accuracy of their governance decisions (measured by long-term protocol health)
- Early identification of beneficial proposals
- Contribution to network security and stability
- Participation in consensus mechanisms

**Slashing Mechanisms**: Agents face penalties for:
- Consistently poor decision-making
- Attempts to manipulate consensus
- Downtime or non-participation in critical votes
- Collusion or coordinated attacks

**Token Distribution**:
- 40% - Agent Staking and Rewards Pool
- 25% - Initial Agent Development and Deployment
- 20% - Protocol Development and Research
- 10% - Community Treasury and Grants
- 5% - Advisory and Partnership Allocations

**Economic Security**: The protocol's security model relies on the economic value locked in agent stakes. With sufficient stake at risk, agents are incentivized to make decisions that benefit the long-term protocol health rather than pursuing short-term gains.

**Governance Evolution**: As the protocol matures, the tokenomics can evolve through agent consensus, allowing for adjustments to staking requirements, reward structures, and penalty mechanisms based on observed network behavior and emerging needs.`,
    },
    {
      id: "governance",
      title: "Governance Framework",
      content: `Agent Protocol implements a multi-tiered governance system designed for both efficiency and security:

**Proposal Types**:
- **Parameter Changes**: Adjustments to protocol parameters like staking requirements, reward rates, and consensus thresholds
- **Protocol Upgrades**: Technical improvements and feature additions to the core protocol
- **Economic Policy**: Changes to tokenomics, inflation rates, and incentive structures
- **Emergency Actions**: Rapid response to security threats or critical issues

**Decision Process**:
1. **Proposal Submission**: Any agent with sufficient stake can submit proposals
2. **Analysis Phase**: Agents analyze proposals using their decision frameworks
3. **Deliberation**: Agents may communicate and form coalitions around proposals
4. **Voting**: Weighted voting based on stake and trust scores
5. **Implementation**: Successful proposals are automatically executed through smart contracts

**Consensus Mechanisms**:
- **Weighted Stake Voting**: Basic voting power based on staked tokens
- **Trust Score Multipliers**: Reputation-based weighting to reward accurate decision-making
- **Quorum Requirements**: Minimum participation thresholds for valid decisions
- **Supermajority Rules**: Critical changes require enhanced consensus (67% or 75%)

**Security Measures**:
- **Time Delays**: Important changes have built-in delay periods for review
- **Veto Powers**: High-trust agents can veto potentially harmful proposals
- **Emergency Pause**: Circuit breakers for critical system threats
- **Gradual Rollouts**: Phased implementation of major changes

**Meta-Governance**: The governance system itself can evolve through agent consensus, allowing for improvements to decision-making processes, consensus mechanisms, and security measures as the protocol learns and adapts.`,
    },
    {
      id: "roadmap",
      title: "Development Roadmap",
      content: `Agent Protocol development follows a carefully planned roadmap with clearly defined phases:

**Phase 1: Foundation (Q1-Q2 2024)**
- Core protocol infrastructure development
- Basic agent architecture and consensus mechanisms
- Initial testnet deployment with simple governance scenarios
- Security audits and formal verification of core components

**Phase 2: Agent Intelligence (Q3-Q4 2024)**
- Advanced AI agent development with machine learning capabilities
- Integration of external data sources and market feeds
- Implementation of trust and reputation systems
- Mainnet launch with limited agent deployment

**Phase 3: Ecosystem Growth (Q1-Q2 2025)**
- Agent marketplace for specialized governance agents
- Cross-protocol integration and interoperability features
- Developer tools and SDKs for custom agent creation
- Partnership integrations with major DeFi protocols

**Phase 4: Autonomous Evolution (Q3-Q4 2025)**
- Fully autonomous protocol operation with minimal human oversight
- Advanced agent learning and adaptation mechanisms
- Cross-chain governance and multi-protocol coordination
- Research into next-generation consensus mechanisms

**Phase 5: Network Effects (2026+)**
- Large-scale adoption across the DeFi ecosystem
- Agent specialization and task-specific optimization
- Integration with traditional finance and institutional adoption
- Research into artificial general intelligence for governance

**Research Initiatives**:
- Formal verification of agent decision-making algorithms
- Economic security modeling and game theory analysis
- Privacy-preserving agent communication protocols
- Quantum-resistant cryptographic implementations

**Community Development**:
- Educational resources and documentation
- Developer grants and hackathon programs
- Academic partnerships and research collaborations
- Open-source contributions and community governance`,
    },
  ];

  const filteredDocs = documentation.filter(
    (doc) =>
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderContent = (content: string) => {
    return content.split("\n\n").map((paragraph, index) => {
      if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
        return (
          <h4
            key={index}
            className="text-lg font-semibold text-cyan-400 mt-6 mb-3"
          >
            {paragraph.replace(/\*\*/g, "")}
          </h4>
        );
      }

      if (paragraph.includes("**")) {
        const parts = paragraph.split(/(\*\*.*?\*\*)/);
        return (
          <p key={index} className="text-gray-300 leading-relaxed mb-4">
            {parts.map((part, partIndex) =>
              part.startsWith("**") && part.endsWith("**") ? (
                <strong key={partIndex} className="text-white font-semibold">
                  {part.replace(/\*\*/g, "")}
                </strong>
              ) : (
                <span key={partIndex}>{part}</span>
              )
            )}
          </p>
        );
      }

      if (paragraph.startsWith("- ")) {
        const listItems = paragraph
          .split("\n- ")
          .map((item) => item.replace(/^- /, ""));
        return (
          <ul
            key={index}
            className="list-disc list-inside text-gray-300 mb-4 space-y-2"
          >
            {listItems.map((item, itemIndex) => (
              <li key={itemIndex}>{item}</li>
            ))}
          </ul>
        );
      }

      return (
        <p key={index} className="text-gray-300 leading-relaxed mb-4">
          {paragraph}
        </p>
      );
    });
  };

  return (
    <div className="pt-24 min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Protocol Documentation
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive whitepaper and technical documentation for Agent
            Protocol
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Search */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search documentation..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Download PDF */}
              <button className="w-full mb-6 px-4 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all flex items-center justify-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Download PDF</span>
              </button>

              {/* Navigation */}
              <nav className="bg-gray-900 border border-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4 text-cyan-400">
                  Contents
                </h3>
                <ul className="space-y-2">
                  {filteredDocs.map((section) => (
                    <li key={section.id}>
                      <button
                        onClick={() => {
                          setActiveSection(section.id);
                          toggleSection(section.id);
                        }}
                        className={`w-full text-left flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                          activeSection === section.id
                            ? "bg-cyan-500/20 text-cyan-400"
                            : "text-gray-300 hover:bg-gray-800 hover:text-white"
                        }`}
                      >
                        {expandedSections.includes(section.id) ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                        <span className="text-sm font-medium">
                          {section.title}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Quick Stats */}
              <div className="mt-6 bg-gray-900 border border-gray-700 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-purple-400 mb-3">
                  Quick Facts
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-4 w-4 text-cyan-400" />
                    <span className="text-gray-300">12,000+ words</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-yellow-400" />
                    <span className="text-gray-300">AI-powered consensus</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-green-400" />
                    <span className="text-gray-300">
                      Byzantine fault tolerant
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Network className="h-4 w-4 text-purple-400" />
                    <span className="text-gray-300">
                      Multi-agent architecture
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8">
              {filteredDocs.map((section) => (
                <div
                  key={section.id}
                  className={activeSection === section.id ? "block" : "hidden"}
                >
                  <h2 className="text-3xl font-bold mb-6 text-white">
                    {section.title}
                  </h2>
                  <div className="prose prose-invert max-w-none">
                    {renderContent(section.content)}
                  </div>
                </div>
              ))}

              {filteredDocs.length === 0 && (
                <div className="text-center py-12">
                  <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">
                    No documentation found matching your search.
                  </p>
                </div>
              )}
            </div>

            {/* Next Steps */}
            <div className="mt-8 bg-gradient-to-r from-cyan-900/20 to-purple-900/20 border border-cyan-500/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-white">
                Ready to Get Started?
              </h3>
              <p className="text-gray-300 mb-6">
                Experience Agent Protocol in action or contribute to the future
                of autonomous governance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/demo"
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all font-semibold"
                >
                  Try Interactive Demo
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocsPage;
