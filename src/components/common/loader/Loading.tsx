import { Progress } from '@chakra-ui/react';
import useLoadingStore from '~/store/pageLoadingStore';

const Loader = () => {
  const isLoading = useLoadingStore(
    (state: { isLoading: any }) => state.isLoading
  );

  return (
    <>{isLoading && <Progress size="xs" zIndex="100" isIndeterminate />}</>
  );
};

export default Loader;
