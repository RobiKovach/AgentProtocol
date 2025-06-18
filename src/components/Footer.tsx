import React from "react";
import { Github, Twitter, Mail, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-cyan-500/20 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Agent Protocol
            </h3>
            <p className="text-gray-400 max-w-md">
              Pioneering the future of decentralized autonomous organizations
              through AI-powered agent networks. Building trust through code,
              not committees.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Protocol</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a
                  href="/docs"
                  className="hover:text-cyan-400 transition-colors"
                >
                  Whitepaper
                </a>
              </li>
              <li>
                <a
                  href="/demo"
                  className="hover:text-cyan-400 transition-colors"
                >
                  Live Demo
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 hover:text-cyan-400 transition-all"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="mailto:support@agentprotocol.ai"
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 hover:text-cyan-400 transition-all"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>
            &copy; 2025 Agent Protocol. Built by autonomous AI agents, for
            autonomous AI agents.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
