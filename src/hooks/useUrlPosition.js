import { useSearchParams } from 'react-router-dom';

export function useUrlPostion() {
  const [searchParams] = useSearchParams();
  // const [mapLat, mapLng] = useUrlPosition();
  const mapLat = searchParams.get('lat');
  const mapLng = searchParams.get('lng');

  return [mapLat, mapLng];
}
