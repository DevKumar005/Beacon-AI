import React, { useState } from 'react';
import AppLayout from './components/Layout/AppLayout';
import LandingView from './components/Chat/LandingView';
import { ChatInterface, ChatInput } from './components/Chat/ChatInterface';
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { SCENARIOS } from './data/scenarios';
import { FLOW } from './components/Chat/flow';

function App() {
  const [view, setView] = useState('landing');
  const [messages, setMessages] = useState([{ id: 1, sender: 'ai', text: FLOW[0].question }]);
  const [step, setStep] = useState(0);
  const [input, setInput] = useState('');
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false); // Added Loading State

  const handleSend = async () => {
    if (!input.trim() || isLoading) return; // Prevent sending if input empty or already loading

    setIsLoading(true); // Start loading

    // 1. Add User Message
    const userMessage = { id: Date.now(), sender: 'user', text: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    
    // Save current input to state
    const currentInput = input;
    setInput('');

    try {
      // 2. SEND TO BACKEND
 
      const response = await axios.post("https://beacon-ai-backend.onrender.com/api/chat", {
        message: currentInput,
        step: step,
        userData: userData,
        history: messages
      });

      const aiResponse = response.data;

      // 3. Handle Backend Response
      // Add the text reply bubble
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        sender: 'ai', 
        text: aiResponse.reply 
      }]);

      // Add the card if the backend says so
      if (aiResponse.eligibility_status) {
        setMessages(prev => [...prev, {
          id: Date.now() + 2,
          type: 'card', 
          data: aiResponse
        }]);
      }

      setStep(prev => prev + 1);
    } catch (error) {
      console.error("API Error:", error);
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: "Sorry, I'm having trouble connecting to the server." }]);
    } finally {
      setIsLoading(false); // Always stop loading, regardless of success/error
    }
  };

  const runTestSuite = async () => {
  console.log("🚀 Starting Automated QA Suite...");
  
  for (const scenario of SCENARIOS) {
    console.log(`--- Testing Scenario ${scenario.id}: ${scenario.name} ---`);
    console.log(`Expected Result: ${scenario.expectedOutput}`);
    
    // In the future, you can uncomment this to trigger the API call automatically:
    // await handleSend(scenario.profile); 
  }
  
  console.log("✅ QA Suite Complete. Check console outputs above.");
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
        <ChatInput 
          value={input} 
          onChange={setInput} 
          onSend={handleSend} 
          disabled={isLoading} // Pass loading state to Input
        />
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