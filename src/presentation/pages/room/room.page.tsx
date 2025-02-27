import { useParams } from 'react-router-dom';

const RoomPage = () => {
	const { roomId } = useParams()

	return <div>
		{`Room ${roomId} page`}
	</div>
}

export default RoomPage;