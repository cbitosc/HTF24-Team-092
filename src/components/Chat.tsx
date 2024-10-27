import { JitsiMeeting } from '@jitsi/react-sdk';
import { format } from 'date-fns';
import { Clock, Image as ImageIcon, Phone, Send, Video } from 'lucide-react';
import React, { useState } from 'react';

interface Message {
  id: string;
  sender: 'user' | 'provider';
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'appointment';
}

interface Provider {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  status: 'online' | 'offline' | 'busy';
  lastSeen?: Date;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'provider',
      content: 'Hello! How can I help you today?',
      timestamp: new Date(Date.now() - 3600000),
      type: 'text',
    },
    {
      id: '2',
      sender: 'user',
      content: 'I have a question about my medication.',
      timestamp: new Date(Date.now() - 3500000),
      type: 'text',
    },
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [isVideoCallOpen, setIsVideoCallOpen] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Math.random().toString(36).substr(2, 9),
      sender: 'user',
      content: newMessage,
      timestamp: new Date(),
      type: 'text',
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };
  const provider: Provider = {
    id: 'provider1',
    name: 'Dr. Sarah Chen',
    specialty: 'Cardiologist',
    avatar: 'https://via.placeholder.com/150', // Replace with actual avatar URL
    status: 'online',
    lastSeen: new Date(),
  };
  
  return (
    <div className="flex-1 p-8">
      <div className="bg-white rounded-xl shadow-sm h-[calc(100vh-8rem)] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={provider.avatar}
              alt={`${provider.name}'s avatar`}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-semibold">{provider.name}</p>
              <p className="text-sm text-gray-500">{provider.specialty}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Phone className="h-5 w-5" />
            </button>
            <button
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsVideoCallOpen(!isVideoCallOpen)}
            >
              <Video className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] ${message.sender === 'user' ? 'bg-blue-600 text-white rounded-l-lg rounded-tr-lg' : 'bg-gray-100 text-gray-800 rounded-r-lg rounded-tl-lg'} p-3`}>
                <p>{message.content}</p>
                <p className="text-xs mt-1 opacity-70">
                  {format(message.timestamp, 'h:mm a')}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Jitsi Video Call Section */}
        {isVideoCallOpen && (
          <div className="p-4 border-t">
            <JitsiMeeting
              domain="meet.jit.si"
              roomName="PatientProviderChatRoom"
              configOverwrite={{
                startWithAudioMuted: true,
                startWithVideoMuted: true,
              }}
              userInfo={{
                displayName: 'Patient',
              }}
              interfaceConfigOverwrite={{
                SHOW_JITSI_WATERMARK: false,
                DEFAULT_REMOTE_DISPLAY_NAME: 'Provider',
              }}
              onReadyToClose={() => setIsVideoCallOpen(false)}
              getIFrameRef={(node) => {
                node.style.height = '500px';
                node.style.width = '100%';
              }}
            />
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <button type="button" className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <ImageIcon className="h-5 w-5" />
            </button>
            <button type="button" className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Clock className="h-5 w-5" />
            </button>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
            <button type="submit" className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
