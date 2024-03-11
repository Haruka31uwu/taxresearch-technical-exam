import React, { createContext, useContext, useState } from 'react';

const SpinnerContext = createContext();

export const useSpinner = () => useContext(SpinnerContext);

export const SpinnerProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const showSpinner = () => setIsLoading(true);
  const hideSpinner = () => setIsLoading(false);

  return (
    <SpinnerContext.Provider value={{ isLoading, showSpinner, hideSpinner }}>
      {children}
    </SpinnerContext.Provider>
  );
};
export const Spinner = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
    )
}