import { MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import useTypedSelector from 'src/hooks/useTypedSelector';
import { deleteIssueRequest } from 'src/redux/actions/issues';
import { ButtonOnClickAction } from 'src/types/issues';

export const useDeleteIssues = (): { deleteBtnAction: ButtonOnClickAction } => {
  const { roomId } = useTypedSelector((store) => store.game);
  const dispatch = useDispatch();

  const deleteBtnAction = (id: string) => (event: MouseEvent) => {
    event.stopPropagation();
    dispatch(deleteIssueRequest(roomId, id));
  };

  return { deleteBtnAction };
};
