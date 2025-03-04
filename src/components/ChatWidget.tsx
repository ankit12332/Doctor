import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: 'Hi there! How can I help you with MediSync today?', isUser: false },
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { text: message, isUser: true }]);
      setMessage('');
      
      // Simulate bot response
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { 
            text: "Thanks for your message! Our team will get back to you shortly. In the meantime, feel free to explore our services or schedule a demo.", 
            isUser: false 
          }
        ]);
      }, 1000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed z-50 bottom-20 right-6 w-80 sm:w-96 h-96 glass-card overflow-hidden flex flex-col"
          >
            <div className="p-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white flex justify-between items-center">
              <h3 className="font-medium">MediSync Assistant</h3>
              <button onClick={() => setIsOpen(false)} aria-label="Close chat">
                <X size={18} />
              </button>
            </div>
            
            <div className="flex-grow p-4 overflow-y-auto flex flex-col space-y-3">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.isUser
                      ? 'bg-primary-100 dark:bg-primary-900/30 ml-auto'
                      : 'bg-gray-100 dark:bg-gray-800/50'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            
            <div className="p-3 border-t border-gray-200 dark:border-gray-700 flex">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="flex-grow bg-transparent border-none focus:ring-0 focus:outline-none text-gray-700 dark:text-gray-300"
              />
              <button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="text-primary-500 disabled:text-gray-400 transition-colors"
                aria-label="Send message"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring' }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed z-50 bottom-6 right-20 p-3 rounded-full bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        aria-label="Chat with us"
      >
        <MessageCircle size={24} />
      </motion.button>
    </>
  );
};

export default ChatWidget;