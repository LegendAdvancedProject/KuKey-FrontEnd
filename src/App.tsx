import AuthRequest from './pages/auth-request/AuthRequest';
import Home from './pages/main/Home';
import RoomStatus from './pages/main/components/SpaceStatus';

function App() {
  return (
    <div>
      {/* <RoomStatus roomName="501호" lockStatus="잠금" /> */}
      {/* <AuthRequest /> */}
      <Home />
    </div>
  );
}

export default App;
