import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from 'src/redux/reducers';

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export default useTypedSelector;
