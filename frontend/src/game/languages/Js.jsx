import GameMain from "../GameMain";

const Js = () => {
  return (
    <GameMain language="js" apiEndpoint={import.meta.env.VITE_BASE_URL} />
  );
};

export default Js;
