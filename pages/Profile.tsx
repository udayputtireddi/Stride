
import React from 'react';
import { Package, Calendar, Settings, ChevronRight, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FOLLOWING_IMAGES = [
  '/images/products/cricket-bat.jpg',
  '/images/products/soccer-ball.jpg',
  '/images/products/tennis-racket.jpg',
  '/images/products/pickleball-paddle.jpg',
  '/images/products/badminton-racket.jpg'
];

const Profile: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto px-6 py-8 pb-32">
      {/* Header Profile Info */}
      <div className="flex flex-col items-center mb-10">
        <div className="w-24 h-24 bg-gray-200 rounded-full mb-4 flex items-center justify-center">
            <UserIconPlaceholder />
        </div>
        <h1 className="text-2xl font-black mb-1">Guest User</h1>
        <p className="text-gray-500 text-sm mb-6">stride.member@example.com</p>
        <button className="px-6 py-2 rounded-full border border-gray-300 text-sm font-bold hover:border-black transition-colors">
          Edit Profile
        </button>
      </div>

      {/* Grid Actions */}
      <div className="grid grid-cols-2 gap-4 mb-10">
        <button className="flex flex-col items-center justify-center p-6 bg-white border border-gray-100 shadow-sm rounded-xl hover:shadow-md transition-shadow">
          <Package className="w-6 h-6 mb-2 text-gray-700" />
          <span className="text-xs font-bold uppercase tracking-wide">Orders</span>
        </button>
        <button className="flex flex-col items-center justify-center p-6 bg-white border border-gray-100 shadow-sm rounded-xl hover:shadow-md transition-shadow">
          <Calendar className="w-6 h-6 mb-2 text-gray-700" />
          <span className="text-xs font-bold uppercase tracking-wide">Events</span>
        </button>
        <button className="flex flex-col items-center justify-center p-6 bg-white border border-gray-100 shadow-sm rounded-xl hover:shadow-md transition-shadow">
          <Settings className="w-6 h-6 mb-2 text-gray-700" />
          <span className="text-xs font-bold uppercase tracking-wide">Settings</span>
        </button>
      </div>

      {/* List Sections */}
      <div className="space-y-6">
        <div>
           <h2 className="font-bold text-lg mb-4">Inbox</h2>
           <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                 <div className="relative">
                    <Bell className="w-5 h-5 text-gray-700" />
                    <span className="absolute -top-1 -right-0.5 w-2 h-2 bg-red-500 rounded-full"></span>
                 </div>
                 <span className="text-sm font-medium">View Messages</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
           </div>
        </div>

        <div>
           <h2 className="font-bold text-lg mb-4">Member Benefits</h2>
           <div className="p-4 bg-gray-50 rounded-xl text-center py-8">
              <p className="text-gray-500 text-sm">No Unlocks Yet</p>
           </div>
        </div>

        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-lg">Following (12)</h2>
                <button className="text-xs text-gray-500 font-bold">Edit</button>
            </div>
            
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
                {FOLLOWING_IMAGES.map((src, index) => (
                    <div key={src} className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-full overflow-hidden border-2 border-transparent hover:border-black transition-colors">
                        <img src={src} alt={`Following ${index + 1}`} className="w-full h-full object-cover" />
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

const UserIconPlaceholder = () => (
    <svg className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);

export default Profile;
