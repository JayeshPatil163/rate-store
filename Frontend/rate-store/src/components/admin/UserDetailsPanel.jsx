import React from 'react';

const DetailItem = ({ label, value }) => (
  <div className="mb-4">
    <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
    <p className="text-lg text-black dark:text-white">{value}</p>
  </div>
);

const UserDetailsPanel = ({ user, onClose, isLoading }) => {
  return (
    <div
      className={`fixed inset-0 border-black rounded-2xl z-40 bg-black/30 backdrop-blur-sm transition-opacity ${
        user ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={onClose}
    >

      <div
        onClick={(e) => e.stopPropagation()}
        className={`fixed top-0 right-0 h-full w-full max-w-md rounded-2xl border-black bg-black shadow-2xl transform transition-transform duration-300 ease-in-out ${
          user ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center border-b border-black dark:border-white/10 pb-4 mb-6">
            <h2 className="text-2xl font-bold text-black dark:text-white">User Details</h2>
            <button onClick={onClose} className="text-2xl hover:opacity-70">&times;</button>
          </div>

          {isLoading ? (
            <p>Loading details...</p>
          ) : user ? (
            <div>
              <DetailItem label="Name" value={user.name} />
              <DetailItem label="Email" value={user.email} />
              <DetailItem label="Address" value={user.address || 'Not provided'} />
              <DetailItem label="Role" value={user.role.replace('_', ' ')} />

              {user.role === 'Store_Owner' && user.ownedStores && user.ownedStores.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-300 dark:border-white/10">
                  <h3 className="text-xl font-semibold mb-4 text-black dark:text-white">Owned Stores Details</h3>
                  {user.ownedStores.map((store, index) => (
                    <React.Fragment key={store.id}>
                      {index > 0 && <hr className="my-4 border-gray-300 dark:border-white/10" />}
                      
                      <DetailItem 
                        label="Store Name" 
                        value={store.name} 
                      />
                      <DetailItem 
                        label="Store Average Rating" 
                        value={(store.averageRating ?? 0).toFixed(1)} 
                      />
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPanel;