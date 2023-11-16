import GameMain from "../GameMain";

const Python = () => {
  return (
    <GameMain language="python" apiEndpoint={import.meta.env.VITE_BASE_URL} />
  );
};

export default Python;
