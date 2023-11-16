import GameMain from "../GameMain";

const Java = () => {
  return (
    <GameMain language="java" apiEndpoint={import.meta.env.VITE_BASE_URL} />
  );
};

export default Java;
