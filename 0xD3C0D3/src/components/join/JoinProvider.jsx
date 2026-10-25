import React, { useCallback, useMemo, useState } from 'react';
import { JoinContext } from './JoinContext';
import JoinModal from './JoinModal';

const JoinProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const openJoin = useCallback(() => setIsOpen(true), []);
  const closeJoin = useCallback(() => setIsOpen(false), []);
  const value = useMemo(() => ({ isOpen, openJoin, closeJoin }), [isOpen, openJoin, closeJoin]);

  return (
    <JoinContext.Provider value={value}>
      {children}
      <JoinModal open={isOpen} onClose={closeJoin} />
    </JoinContext.Provider>
  );
};

export default JoinProvider;
