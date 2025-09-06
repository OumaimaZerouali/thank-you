import { useState } from 'react';
import { SendIcon, CopyIcon, DownloadIcon } from 'lucide-react';
import { apiClient } from '../../services';
import { Card, EmailData } from '../../types';

interface SendCardProps {
  cardData?: Partial<Card>;
  cardElements?: any[];
  cardBackground?: string;
}

export function SendCard({ cardData, cardElements, cardBackground }: SendCardProps) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [senderName, setSenderName] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (cardData?.id) {
        await apiClient.sendCard(cardData.id);
      } else {
        const emailData: EmailData = {
          to: email,
          subject: `Thank You Card from ${senderName}`,
          html: generateCardHTML(),
          cardData: {
            cardType: 'thank-you',
            recipientName,
            recipientEmail: email,
            senderName,
            message,
            backgroundColor: cardBackground || '#ffffff',
            textColor: '#333333',
            borderColor: '#e91e63',
            fontFamily: 'Arial',
            fontSize: '16px',
            pattern: 'none',
            ...cardData
          } as Card
        };

        await apiClient.sendEmail(emailData);
      }

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send card');
    } finally {
      setIsLoading(false);
    }
  };

  const generateCardHTML = (): string => {
    return `
      <div style="
        width: 400px;
        height: 300px;
        background-color: ${cardBackground || '#ffffff'};
        border: 2px solid #e91e63;
        border-radius: 8px;
        padding: 20px;
        font-family: Arial, sans-serif;
        position: relative;
        margin: 0 auto;
      ">
        <h2 style="color: #333; text-align: center; margin-bottom: 20px;">Thank You Card</h2>
        <p style="color: #333; text-align: center; font-size: 16px;">${message}</p>
        <p style="color: #666; text-align: center; margin-top: 40px; font-size: 14px;">From: ${senderName}</p>
      </div>
    `;
  };

  const handleCopyLink = async () => {
    try {
      const shareableLink = `${window.location.origin}/card/${cardData?.id || 'preview'}`;
      await navigator.clipboard.writeText(shareableLink);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleDownload = () => {
    console.log('Download functionality would be implemented here');
  };

  return (
    <div>
      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
          <p className="font-medium">Error!</p>
          <p>{error}</p>
        </div>
      )}

      {showSuccess ? (
        <div className="bg-green-50 text-green-700 p-4 rounded-lg mb-6">
          <p className="font-medium">Success!</p>
          <p>Your card has been sent.</p>
        </div>
      ) : (
        <form onSubmit={handleSend} className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              type="text"
              value={senderName}
              onChange={e => setSenderName(e.target.value)}
              placeholder="Your name"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Recipient Name
            </label>
            <input
              type="text"
              value={recipientName}
              onChange={e => setRecipientName(e.target.value)}
              placeholder="Recipient's name"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Recipient Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="friend@example.com"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Personal Message
            </label>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Add your thank you message..."
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              rows={3}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-purple-600 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <SendIcon size={18} />
            <span>{isLoading ? 'Sending...' : 'Send Card'}</span>
          </button>
        </form>
      )}

      <div className="pt-6 border-t border-gray-200 space-y-3">
        <h3 className="font-medium mb-2">Other sharing options</h3>
        <button
          onClick={handleCopyLink}
          className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
        >
          <CopyIcon size={18} />
          <span>Copy Shareable Link</span>
        </button>
        <button
          onClick={handleDownload}
          className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
        >
          <DownloadIcon size={18} />
          <span>Download as Image</span>
        </button>
      </div>
    </div>
  );
}
