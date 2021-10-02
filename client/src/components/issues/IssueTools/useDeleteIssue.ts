import { MouseEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import useTypedSelector from 'src/hooks/useTypedSelector';
import { deleteIssueRequest } from 'src/redux/actions/issues';
import { ButtonOnClickAction } from 'src/types/issues';

interface UseDeleteIssues {
  deleteBtnIsDisabled: boolean;
  deleteBtnAction: ButtonOnClickAction;
}

export const useDeleteIssues = (): UseDeleteIssues => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { roomId } = useTypedSelector((store) => store.game);
  const dispatch = useDispatch();

  const deleteBtnAction = (id: string) => (event: MouseEvent) => {
    event.stopPropagation();
    dispatch(deleteIssueRequest(roomId, id, setIsLoading));
  };

  return { deleteBtnIsDisabled: isLoading, deleteBtnAction };
};
