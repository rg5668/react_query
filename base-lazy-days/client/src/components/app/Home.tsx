import { Icon, Stack, Text } from '@chakra-ui/react';
import { usePrefetchTreatments } from 'components/treatments/hooks/useTreatments';
import { ReactElement } from 'react';
import { GiFlowerPot } from 'react-icons/gi';

import { BackgroundImage } from '../common/BackgroundImage';

export function Home(): ReactElement {
  // 홈에서 미리 usePrefetchTreatments(프리페치 된 데이터)를 가져와 빠른 동작을 하게 해준다.
  usePrefetchTreatments();
  return (
    <Stack align="center" justify="center" height="84vh">
      <BackgroundImage />
      <Text textAlign="center" fontFamily="Forum, sans-serif" fontSize="6em">
        <Icon m={4} verticalAlign="top" as={GiFlowerPot} />
        Lazy Days Spa
      </Text>
      <Text>Hours: limited</Text>
      <Text>Address: nearby</Text>
    </Stack>
  );
}
