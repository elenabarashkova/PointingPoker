import { useState } from 'react';
import { UseIssueTools } from 'src/types/issues';

export const useIssueTools = (): UseIssueTools => {
  const [createIssueModalIsOpen, setCreateIssueModalIsOpen] = useState<boolean>(false);

  const openCreateIssueModal = () => setCreateIssueModalIsOpen(true);
  const closeCreateIssueModal = () => setCreateIssueModalIsOpen(false);

  return {
    createIssueModalIsOpen,
    openCreateIssueModal,
    closeCreateIssueModal,
  };
};
