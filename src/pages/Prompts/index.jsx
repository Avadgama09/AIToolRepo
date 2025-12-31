import React, { useState } from 'react';
import { Sparkles, Copy, Check, Terminal, Wand2, BookOpen, BrainCircuit } from 'lucide-react';

// --- THE ULTIMATE KNOWLEDGE BASE (Your 27+ Frameworks) ---
const FRAMEWORKS = {
  'CO-STAR': { name: 'CO-STAR', desc: 'Context, Objective, Style, Tone, Audience, Response. The gold standard for comprehensive prompting.', bestFor: 'Complex, high-quality writing' },
  'COSTAR-A': { name: 'COSTAR-A', desc: 'Adds "Answer" to CO-STAR. Context, Objective, Style, Tone, Audience, Response, Answer (Example).', bestFor: 'Tasks requiring specific example outputs' },
  'RISE': { name: 'RISE', desc: 'Role, Input, Steps, Expectation. Perfect for process-oriented tasks.', bestFor: 'Step-by-step guides, Coding, Procedures' },
  'TRACE': { name: 'TRACE', desc: 'Task, Request, Action, Context, Example. Highly detailed and structured.', bestFor: 'Data analysis, Complex reports' },
  'RAG': { name: 'RAG Prompting', desc: 'Retrieval-Augmented Generation instructions. "Use the provided data to answer..."', bestFor: 'Answering from specific documents/data' },
  'RACE': { name: 'RACE', desc: 'Role, Action, Context, Expectation. A balanced, reliable framework.', bestFor: 'General purpose professional tasks' },
  'CARE': { name: 'CARE', desc: 'Context, Action, Result, Example. Focuses on outcomes.', bestFor: 'Case studies, Success stories' },
  'APE': { name: 'APE', desc: 'Action, Purpose, Expectation. Simple, direct, efficient.', bestFor: 'Quick tasks, Summaries' },
  'CREATE': { name: 'CREATE', desc: 'Context, Role, Explicit, Action, Tone, Example. Creative focused.', bestFor: 'Creative writing, Storytelling, Marketing' },
  'TAG': { name: 'TAG', desc: 'Task, Action, Goal. Very laser-focused.', bestFor: 'Specific short tasks' },
  'CREO': { name: 'CREO', desc: 'Context, Request, Explanation, Outcome. Good for delegation.', bestFor: 'Briefing an AI assistant' },
  'PAIN': { name: 'PAIN', desc: 'Problem, Action, Information, Next Steps. Problem-solving focused.', bestFor: 'Troubleshooting, Debugging, Crisis Comms' },
  'COAST': { name: 'COAST', desc: 'Context, Objective, Actions, Scenario, Task.', bestFor: 'Scenario planning, Strategy' },
  'ROSES': { name: 'ROSES', desc: 'Role, Objective, Scenario, Expected Solution, Steps.', bestFor: 'Consulting, Strategic advice' },
  'CoT': { name: 'Chain-of-Thought', desc: 'Step-by-step reasoning instructions ("Let\'s think step by step").', bestFor: 'Math, Logic, Complex reasoning' },
  'ToT': { name: 'Tree-of-Thought', desc: 'Explore multiple reasoning paths before concluding.', bestFor: 'Brainstorming, Creative problem solving' },
  'Branch': { name: 'Branch-Based', desc: 'Explore different branches of possibilities.', bestFor: 'Scenario analysis, "What if" gaming' },
  'Zero-Shot': { name: 'Zero-Shot', desc: 'Direct instruction with no examples.', bestFor: 'Simple, common knowledge tasks' },
  'One-Shot': { name: 'One-Shot', desc: 'Providing one clear example.', bestFor: 'Formatting tasks, Style copying' },
  'Few-Shot': { name: 'Few-Shot', desc: 'Providing multiple examples (3+).', bestFor: 'Complex pattern matching, Classification' },
  'Chaining': { name: 'Prompt Chaining', desc: 'Breaking a task into a sequence of prompts.', bestFor: 'Huge workflows (Book writing, Full app code)' },
  'ReAct': { name: 'ReAct', desc: 'Reasoning + Acting. "Thought, Action, Observation".', bestFor: 'Agents, Research tasks' },
  'GRR': { name: 'GRR', desc: 'Goal, Request, Response. Simplified framework.', bestFor: 'Beginners, Quick queries' },
  'Scratchpad': { name: 'Scratchpad', desc: 'Asking AI to "use a scratchpad" to plan before answering.', bestFor: 'Coding, Math, Logic puzzles' },
  'Reflection': { name: 'Reflection', desc: 'Asking AI to critique its own work before finalizing.', bestFor: 'High-stakes accuracy tasks' },
  'Role-Based': { name: 'Role-Based', desc: 'Assigning a specific persona (Act as a...).', bestFor: 'Expert advice, Tone adjustment' },
  'System': { name: 'System Prompts', desc: 'High-level model instructions (You are a helpful assistant...).', bestFor: 'Bot personality, Constraints' },
  'Agile': { name: 'Agile Prompting', desc: 'Iterative refinement instructions.', bestFor: 'Project management, Software development' }
};

export default function Prompts({ user }) {
  const [input, setInput] = useState('');
  const [goal, setGoal] = useState('General');
  const [tone, setTone] = useState('Professional');
  
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [selectedFramework, setSelectedFramework] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setError(null);
    setGeneratedPrompt('');
    setSelectedFramework(null);

    const apiKey = process.env.REACT_APP_PERPLEXITY_API_KEY;

    if (!apiKey) {
      setError("API Key missing! Please add REACT_APP_PERPLEXITY_API_KEY to your .env file.");
      setLoading(false);
      return;
    }

    // --- THE INTELLIGENCE ---
    // We send the list of frameworks to Perplexity and ask IT to choose the best one.
    const systemPrompt = `
      You are the world's best Prompt Engineer and AI Consultant.
      
      YOUR KNOWLEDGE BASE (Frameworks):
      ${Object.entries(FRAMEWORKS).map(([key, val]) => `- ${val.name}: ${val.desc}`).join('\n')}

      USER REQUEST: "${input}"
      USER GOAL: ${goal}
      USER TONE: ${tone}

      TASK:
      1. Analyze the user's request.
      2. Select the ONE single best framework from the list above that fits this specific task.
      3. Rewrite the user's request into a perfect, production-ready prompt using that framework.
      4. RETURN YOUR RESPONSE IN THIS JSON FORMAT ONLY:
      {
        "framework": "Name of Framework Chosen",
        "reason": "One short sentence why you chose it",
        "prompt": "The actual rewritten prompt text..."
      }
    `;

    try {
      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'sonar-pro', // Best for reasoning
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: "Optimize this." }
          ]
        })
      });

      if (!response.ok) throw new Error(`API Error: ${response.statusText}`);

      const data = await response.json();
      
      // Parse the JSON response from AI
      let result;
      try {
        // AI sometimes wraps JSON in markdown code blocks, clean it up
        const cleanContent = data.choices[0].message.content.replace(/```json/g, '').replace(/```/g, '');
        result = JSON.parse(cleanContent);
      } catch (parseError) {
        // Fallback if AI didn't return perfect JSON
        result = { 
          framework: 'AI Expert Mode', 
          reason: 'Custom optimized structure', 
          prompt: data.choices[0].message.content 
        };
      }

      // Update State
      setGeneratedPrompt(result.prompt);
      
      // Find the full framework details to display card
      const matchedFramework = Object.values(FRAMEWORKS).find(f => f.name === result.framework) || { name: result.framework, desc: result.reason };
      setSelectedFramework(matchedFramework);

    } catch (err) {
      console.error(err);
      setError("Failed to generate. Please check your API key.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-600 rounded-xl mb-4 shadow-lg shadow-indigo-200">
            <BrainCircuit className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-extrabold text-gray-900 mb-3 tracking-tight">Prompt Architect AI</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Describe your task. Our AI consultant will select the perfect framework (from CO-STAR to Tree-of-Thought) and engineer the ideal prompt for you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: Input Form */}
          <div className="lg:col-span-5 bg-white rounded-3xl shadow-xl border border-gray-100 p-8 h-fit">
            <form onSubmit={handleGenerate} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">What do you want to achieve?</label>
                <textarea
                  className="w-full h-48 p-5 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 resize-none text-gray-700 bg-gray-50 text-lg placeholder-gray-400 transition-all"
                  placeholder="e.g. I need to debug a Python script that is giving me a memory error..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Primary Goal</label>
                  <select 
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 font-medium text-gray-700"
                  >
                    <option value="General">General Task</option>
                    <option value="Solve Problem">Solve A Problem</option>
                    <option value="Write Content">Write Content</option>
                    <option value="Persuade">Persuade / Sell</option>
                    <option value="Code">Write Code</option>
                    <option value="Analyze">Analyze Data</option>
                    <option value="Learn">Learn / Study</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Tone</label>
                  <select 
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 font-medium text-gray-700"
                  >
                    <option>Professional</option>
                    <option>Friendly</option>
                    <option>Direct</option>
                    <option>Academic</option>
                    <option>Witty</option>
                    <option>Empathetic</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !input.trim()}
                className={`w-full py-5 rounded-2xl text-white font-bold text-lg flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] active:scale-[0.98] ${
                  loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-gradient-to-r from-indigo-600 to-purple-600 shadow-xl shadow-indigo-200'
                }`}
              >
                {loading ? (
                  <> <Sparkles className="animate-spin w-6 h-6" /> Engineering Prompt... </>
                ) : (
                  <> <Wand2 className="w-6 h-6" /> Generate Optimized Prompt </>
                )}
              </button>
            </form>
          </div>

          {/* RIGHT COLUMN: The Result */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Framework Info Card - Shows Dynamic Selection */}
            {selectedFramework && !loading && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-5 flex items-start gap-4 animate-fade-in shadow-sm">
                <div className="bg-white p-3 rounded-xl shadow-sm">
                  <BookOpen className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h4 className="font-bold text-indigo-900 text-lg mb-1 flex items-center gap-2">
                    Framework Selected: <span className="text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded text-base">{selectedFramework.name}</span>
                  </h4>
                  <p className="text-indigo-700 leading-relaxed">{selectedFramework.desc}</p>
                </div>
              </div>
            )}

            {/* The Terminal Output */}
            <div className="flex-grow bg-[#0f172a] rounded-3xl shadow-2xl border border-gray-800 p-8 relative overflow-hidden flex flex-col min-h-[500px]">
              
              {/* Terminal Header */}
              <div className="flex items-center justify-between mb-8 border-b border-gray-800 pb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors"></div>
                  <span className="ml-4 text-slate-400 font-mono text-sm tracking-wider">prompt_engineer_v1.0.exe</span>
                </div>
                {generatedPrompt && (
                  <button 
                    onClick={copyToClipboard} 
                    className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 hover:text-white transition-all text-sm font-medium group"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 group-hover:text-indigo-400" />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                )}
              </div>

              {/* Error State */}
              {error && <div className="text-red-400 text-center p-10 bg-red-900/10 rounded-xl border border-red-900/30">{error}</div>}

              {/* Empty State */}
              {!generatedPrompt && !loading && !error && (
                <div className="flex-grow flex flex-col items-center justify-center text-slate-600">
                  <Terminal className="w-20 h-20 mb-6 opacity-20" />
                  <p className="text-base font-medium">System ready. Waiting for input...</p>
                </div>
              )}

              {/* Loading State - Animated Terminal Text */}
              {loading && (
                <div className="flex-grow flex flex-col items-start justify-center font-mono text-sm space-y-3 px-10">
                  <p className="text-green-500"> {'>'} Analyzing user intent...</p>
                  <p className="text-green-500 delay-100"> {'>'} Scanning framework database (27 entries)...</p>
                  <p className="text-indigo-400 delay-200 animate-pulse"> {'>'} Selecting optimal strategy...</p>
                </div>
              )}

              {/* Success State */}
              {generatedPrompt && !loading && (
                <div className="font-mono text-[15px] leading-8 text-green-300 whitespace-pre-wrap animate-fade-in selection:bg-green-900 selection:text-white">
                  {generatedPrompt}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}