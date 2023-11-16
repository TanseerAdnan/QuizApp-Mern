import GameMain from "../GameMain";

const C = () => {
  return (
    <GameMain language="c" apiEndpoint={import.meta.env.VITE_BASE_URL} />
  );
};

export default C;
