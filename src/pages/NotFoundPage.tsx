import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Cpu, AlertTriangle } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="pt-24 min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto px-4">
        {/* Animated 404 */}
        <div className="mb-8">
          <div className="relative">
            <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-red-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
              404
            </h1>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <AlertTriangle className="h-16 w-16 text-red-500 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Cyberpunk-style error message */}
        <div className="mb-8 p-6 bg-gray-900/50 border border-red-500/30 rounded-2xl backdrop-blur-sm">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Cpu className="h-8 w-8 text-red-500" />
            <h2 className="text-2xl md:text-3xl font-bold text-red-400">
              AGENT PROTOCOL ERROR
            </h2>
          </div>
          
          <div className="font-mono text-sm text-gray-300 mb-4">
            <div className="mb-2">
              <span className="text-red-400">[ERROR]</span> Route not found in agent network
            </div>
            <div className="mb-2">
              <span className="text-yellow-400">[INFO]</span> Scanning available pathways...
            </div>
            <div className="mb-2">
              <span className="text-cyan-400">[STATUS]</span> Autonomous navigation required
            </div>
          </div>
          
          <p className="text-lg text-gray-300">
            The AI agents couldn't locate the requested resource. 
            This page may have been moved, deleted, or never existed in our protocol.
          </p>
        </div>

        {/* Navigation options */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white mb-6">
            Available Agent Protocols:
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              to="/"
              className="group p-4 bg-gray-900 border border-cyan-500/30 rounded-xl hover:border-cyan-500 hover:bg-gray-800 transition-all"
            >
              <div className="flex items-center space-x-3">
                <Home className="h-6 w-6 text-cyan-400 group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <div className="font-semibold text-white">Home Base</div>
                  <div className="text-sm text-gray-400">Return to main protocol</div>
                </div>
              </div>
            </Link>
            
            <Link
              to="/demo"
              className="group p-4 bg-gray-900 border border-purple-500/30 rounded-xl hover:border-purple-500 hover:bg-gray-800 transition-all"
            >
              <div className="flex items-center space-x-3">
                <Cpu className="h-6 w-6 text-purple-400 group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <div className="font-semibold text-white">Live Demo</div>
                  <div className="text-sm text-gray-400">Watch agents in action</div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Go back button */}
        <div className="mt-8">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-500 transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Go Back</span>
          </button>
        </div>

        {/* Glitch effect text */}
        <div className="mt-12 text-xs text-gray-500 font-mono">
          <div className="animate-pulse">
            AGENT_PROTOCOL_V1.0 :: ROUTE_NOT_FOUND :: AUTONOMOUS_RECOVERY_INITIATED
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;