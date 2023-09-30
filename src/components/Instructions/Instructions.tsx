import "./Instructions.css";

const Instructions = () => {
  return (
    <div className="instructions-container">
      <h1 className="title">MrWorldWide</h1>
      <p className="subtitle">
        Welcome to the MrWorldWide challenge! Your mission is to match each
        country with its corresponding capital city. Can you match them all?
      </p>
      <div className="hint">
        <p>Hint:</p>
        <ul>
          <li>Click on a country or capital to select it.</li>
          <li>If you make a wrong match, it will be highlighted in red.</li>
          <li>Keep track of your score and aim for a perfect match!</li>
        </ul>
      </div>
    </div>
  );
};

export default Instructions;
