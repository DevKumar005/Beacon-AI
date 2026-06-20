import React, { useState } from 'react';
import AppLayout from './components/Layout/AppLayout';
import LandingView from './components/Chat/LandingView';
import { ChatInterface, ChatInput } from './components/Chat/ChatInterface';
import { ArrowLeft } from 'lucide-react';
import { FLOW } from './components/Chat/flow';

function App() {
  const [view, setView] = useState('landing');
  const [messages, setMessages] = useState([{ id: 1, sender: 'ai', text: FLOW[0].question }]);
  const [step, setStep] = useState(0);
  const [input, setInput] = useState('');
  const [userData, setUserData] = useState({});

  const handleSend = () => {
    if (!input.trim()) return;

    // 1. Add User Message
    const newMessages = [...messages, { id: Date.now(), sender: 'user', text: input }];
    setMessages(newMessages);
    
    // 2. Save Data
    const currentKey = FLOW[step].id;
    setUserData(prev => ({ ...prev, [currentKey]: input }));
    setInput('');

    // 3. Logic to determine next step
    const nextStep = step + 1;
    if (nextStep < FLOW.length) {
      setTimeout(() => {
        setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: FLOW[nextStep].question }]);
        setStep(nextStep);
      }, 1000);
    } else {
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          id: Date.now() + 1, 
          type: 'card', 
          data: { 
            eligibility_status: 'may_qualify', 
            reply: "Based on your income and location, you qualify for several local programs.",
            reasons: ["Income within threshold", "Residing in supported city"],
            source: "City Benefits Database"
          } 
        }]);
      }, 1000);
    }
  };

  return (
    <AppLayout 
      header={
        <div className="flex items-center gap-2">
          {view === 'chat' && (
            <button onClick={() => setView('landing')} className="text-zinc-400 hover:text-white">
              <ArrowLeft size={18} />
            </button>
          )}
          <span className="text-sm font-medium text-zinc-100">BEACON AI</span>
        </div>
      } 
      footer={view === 'chat' ? (
        <ChatInput value={input} onChange={setInput} onSend={handleSend} />
      ) : null}
    >
      {view === 'landing' ? (
        <LandingView onStart={() => setView('chat')} />
      ) : (
        <ChatInterface messages={messages} />
      )}
    </AppLayout>
  );
}

export default App;