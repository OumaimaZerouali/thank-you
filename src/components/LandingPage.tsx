import React from 'react';
import { Link } from 'react-router-dom';
import { SparklesIcon, ImageIcon, TypeIcon, SendIcon, ArrowRightIcon } from 'lucide-react';
export function LandingPage() {
  return <div className="w-full">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-800">
            Create Beautiful Digital Cards <br />
            <span className="text-purple-600">in Minutes</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Design personalized digital cards for any occasion. Add your own
            text, images, and style to create the perfect card to send to
            someone special.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/create" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg text-lg font-medium flex items-center justify-center gap-2 transition-colors">
              <SparklesIcon size={20} />
              Start Creating
            </Link>
            <Link to="/gallery" className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-lg text-lg font-medium transition-colors">
              Browse Templates
            </Link>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-16 bg-white px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-purple-50 p-6 rounded-xl text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TypeIcon size={24} className="text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Add Your Text</h3>
              <p className="text-gray-600">
                Customize your message with different fonts, sizes, and colors
                to express exactly what you want to say.
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ImageIcon size={24} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Insert Images</h3>
              <p className="text-gray-600">
                Upload your favorite photos or choose from our collection of
                images to make your card unique.
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-xl text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <SendIcon size={24} className="text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Send & Share</h3>
              <p className="text-gray-600">
                When your card is ready, send it directly via email or share a
                link on social media.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Create Your Card?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Start designing your personalized digital card today and make
            someone's day special.
          </p>
          <Link to="/create" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 rounded-lg text-lg font-medium inline-flex items-center gap-2">
            Create Your Card <ArrowRightIcon size={20} />
          </Link>
        </div>
      </section>
    </div>;
}