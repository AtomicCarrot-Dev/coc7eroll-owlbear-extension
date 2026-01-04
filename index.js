import OBR from "https://cdn.skypack.dev/@owlbear-rodeo/sdk";

function rollD100(type) {
  const ones = Math.floor(Math.random() * 10);
  const tensRolls = [];

  if (type === "bonus" || type === "penalty") {
    tensRolls.push(Math.floor(Math.random() * 10));
    tensRolls.push(Math.floor(Math.random() * 10));
  } else {
    tensRolls.push(Math.floor(Math.random() * 10));
  }

  const tens =
    type === "bonus"
      ? Math.min(...tensRolls)
      : type === "penalty"
      ? Math.max(...tensRolls)
      : tensRolls[0];

  let roll = tens * 10 + ones;
  if (roll === 0) roll = 100;

  return roll;
}

function determineSuccess(roll, skill) {
  if (roll === 1) return "Critical Success";
  if (roll <= Math.floor(skill / 5)) return "Extreme Success";
  if (roll <= Math.floor(skill / 2)) return "Hard Success";
  if (roll <= skill) return "Regular Success";
  if (roll === 100) return "Fumble";
  return "Failure";
}

OBR.onReady(() => {
  const rollButton = document.getElementById("roll");
  const skillInput = document.getElementById("skill");
  const rollType = document.getElementById("type");
  const output = document.getElementById("output");

  rollButton.onclick = () => {
    const skill = Number(skillInput.value);
    const type = rollType.value;

    if (!skill || skill < 1 || skill > 99) {
      output.textContent = "Enter a valid skill value (1–99).";
      return;
    }

    const roll = rollD100(type);
    const result = determineSuccess(roll, skill);

    output.textContent =
      `Skill Threshold: ${skill}\nRoll Type: ${type}\nRolled Number: ${roll}\nResult: ${result}`;
  };
});
