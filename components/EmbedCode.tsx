"use client";

import { useState, useEffect } from "react";
import { Copy, Check } from "lucide-react";

export function EmbedCode({ embedToken }: { embedToken: string }) {
  const [copied, setCopied] = useState(false);
  const [embedCode, setEmbedCode] = useState("");

  useEffect(() => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    setEmbedCode(`<div id="testimonials-widget"></div>
<script src="${origin}/widget.js" data-token="${embedToken}"></script>`);
  }, [embedToken]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">How to Embed</h2>
      <p className="text-gray-600 mb-4">
        Copy this code and paste it anywhere on your website where you want testimonials to appear:
      </p>
      <div className="relative">
        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
          {embedCode}
        </pre>
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 p-2 bg-gray-700 hover:bg-gray-600 rounded text-white"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <div className="mt-6">
        <h3 className="font-medium text-gray-900 mb-2">Your Embed Token</h3>
        <code className="block bg-gray-100 p-2 rounded text-sm text-gray-700 break-all">
          {embedToken}
        </code>
      </div>
    </div>
  );
}
