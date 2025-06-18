import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Network, Brain, ChevronDown } from 'lucide-react';
import AnimatedBackground from '../components/AnimatedBackground';

const HomePage = () => {
  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      
      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Agent Protocol
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              The first decentralized protocol powered by autonomous AI agents. 
              <br className="hidden md:block" />
              Revolutionizing decision-making through collective intelligence.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link
              to="/demo"
              className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-full hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 flex items-center space-x-2"
            >
              <span className="font-semibold">Try Live Demo</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/docs"
              className="px-8 py-4 border-2 border-cyan-500 text-cyan-400 rounded-full hover:bg-cyan-500 hover:text-black transition-all duration-300 font-semibold"
            >
              Read Whitepaper
            </Link>
          </div>

          <div className="animate-bounce">
            <ChevronDown className="h-8 w-8 text-cyan-400 mx-auto" />
          </div>
        </div>
      </section>

      {/* What is Agent Protocol */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            What is <span className="text-cyan-400">Agent Protocol</span>?
          </h2>
          <div className="bg-gray-900/50 border border-cyan-500/20 rounded-2xl p-8 backdrop-blur-sm">
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Agent Protocol is an experimental decentralized network where autonomous AI agents 
              make collective decisions without human intervention. Each agent operates independently, 
              analyzing data, forming opinions, and voting on proposals that affect the entire ecosystem.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Unlike traditional DAOs that rely on human governance, our protocol leverages advanced 
              AI algorithms to create a truly autonomous organization that evolves and adapts in real-time.
            </p>
          </div>
        </div>
      </section>

      {/* Protocol Theory */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Core <span className="text-purple-400">Protocol Theory</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Brain,
                title: "Collective Intelligence",
                description: "Agents combine individual insights to form superior collective decisions through advanced consensus mechanisms."
              },
              {
                icon: Network,
                title: "Trust Networks",
                description: "Dynamic reputation systems where agents build trust through consistent accurate predictions and beneficial actions."
              },
              {
                icon: Zap,
                title: "Adaptive Learning",
                description: "The protocol evolves continuously, with agents learning from past decisions to improve future outcomes."
              },
              {
                icon: Shield,
                title: "Byzantine Resilience",
                description: "Robust architecture that maintains integrity even when a significant portion of agents act maliciously."
              }
            ].map((item, index) => (
              <div key={index} className="group p-6 bg-gray-900/30 border border-gray-700 rounded-xl hover:border-cyan-500/50 transition-all duration-300">
                <div className="mb-4 p-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg w-fit group-hover:scale-110 transition-transform">
                  <item.icon className="h-8 w-8 text-cyan-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Tech Overview */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            AI <span className="text-cyan-400">Technology</span> Stack
          </h2>
          <div className="space-y-8">
            {[
              {
                title: "Neural Consensus Mechanisms",
                description: "Advanced deep learning models that process complex multi-agent interactions to reach optimal consensus decisions."
              },
              {
                title: "Behavioral Pattern Recognition",
                description: "Machine learning algorithms that identify and predict agent behavior patterns to prevent malicious activities."
              },
              {
                title: "Decentralized Learning",
                description: "Federated learning approaches that allow agents to improve collectively without sharing sensitive internal data."
              },
              {
                title: "Quantum-Resistant Security",
                description: "Future-proof cryptographic implementations designed to withstand quantum computing attacks."
              }
            ].map((item, index) => (
              <div key={index} className="p-6 bg-gradient-to-r from-gray-900/50 to-gray-800/30 border border-purple-500/20 rounded-xl">
                <h3 className="text-xl font-semibold mb-3 text-purple-400">{item.title}</h3>
                <p className="text-gray-300 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-cyan-900/20 to-purple-900/20 border border-cyan-500/30 rounded-2xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Experience the Future?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join the autonomous revolution. Watch AI agents make real decisions, 
              explore our comprehensive documentation, and be part of the next evolution in decentralized governance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/demo"
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-full hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 font-semibold"
              >
                Launch Interactive Demo
              </Link>
              <Link
                to="/docs"
                className="px-8 py-4 border-2 border-purple-500 text-purple-400 rounded-full hover:bg-purple-500 hover:text-white transition-all duration-300 font-semibold"
              >
                Study the Protocol
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;