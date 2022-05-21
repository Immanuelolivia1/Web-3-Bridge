// const user = prompt("Enter your name");
// const welcomeMessage = prompt("Welcome " + user + " what tier are you willing to opt for?");
// const successMessage = alert("Congratulations " + user + " you've been successfully registered.");

const userName = document.getElementById("name");
const amount = document.getElementById("amount");
const tier = document.getElementById("tier");
const form = document.getElementById("form");
const notification = document.getElementById("notification");
const notification_text = document.getElementById("notification_text");
const tableBody = document.getElementById("tableBody");
const totalMoney = document.getElementById("total_money");
const interest = document.getElementById("interest");
const withdraw = document.getElementById("withdraw");

const user_details = [];
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const user_name = userName.value;
  const input_amount = parseInt(amount.value);
  const input_tier = parseInt(tier.value);

  const checker = validation(user_name, input_amount, input_tier);
  if (checker) {
    let interestValue = 0;
    if (input_tier === 1) {
      interestValue = (7 / 100) * input_amount;
    }
    if (input_tier === 2) {
      interestValue = (12 / 100) * input_amount;
    }
    if (input_tier === 3) {
      interestValue = (25 / 100) * input_amount;
    }
    let widthdrawValue = interestValue + input_amount;
    NotificationHandler(
      {
        text: "You've Successfully Registered",
        interest: `Your interest N${parseInt(
          interestValue.toFixed(0)
        ).toLocaleString()}`,
        withdraw: `Total to be withdrawn at the end of the week N${parseInt(
          widthdrawValue.toFixed(0)
        ).toLocaleString()}`,
      },
      "success"
    );
    const user_detail = {
      username: user_name,
      amount: input_amount,
      tier: input_tier,
    };
    user_details.push(user_detail);
    tableBody.innerHTML = null;
    populateTable();
  }
});

const NotificationHandler = (message, status) => {
  notification_text.innerHTML = message.text;
  interest.innerHTML = message.interest;
  withdraw.innerHTML = message.withdraw;
  notification.style.backgroundColor = status === "error" ? "red" : "green";
};

const ValidateTier = (amount, tier) => {
  if (tier === 1 && amount !== 10000) {
    return { status: false, message: "Value for Tier is 10,000 Naira" };
  } else if (tier === 2 && amount !== 20000) {
    return { status: false, message: "Value for Tier is 20,000 Naira" };
  } else if (tier === 3 && amount !== 30000) {
    return { status: false, message: "Value for Tier is 30,000 Naira" };
  } else {
    return { status: true, message: "Success" };
  }
};

const validation = (username, amount, tier) => {
  const tierValidate = ValidateTier(amount, tier);
  if (username.trim() !== "" && tierValidate.status) {
    return true;
  } else {
    if (!tierValidate.status) {
      NotificationHandler(
        { text: tierValidate.message, interest: "", withdraw: "" },
        "error"
      );
      return false;
    } else [NotificationHandler("User name cannot be empty", "error")];
  }
};

const populateTable = () => {
  let total_money = 0;
  user_details.forEach((user, index) => {
    const tr = document.createElement("tr");
    const sn = document.createElement("td");
    const name = document.createElement("td");
    const tier = document.createElement("td");
    const amount = document.createElement("td");

    total_money = total_money + user.amount;
    sn.innerHTML = `${index + 1}.`;
    name.innerHTML = user.username;
    tier.innerHTML = `Tier ${user.tier}`;
    amount.innerHTML = `N${user.amount.toLocaleString()}`;
    tr.append(sn);
    tr.append(name);
    tr.append(tier);
    tr.append(amount);
    tableBody.append(tr);
  });
  totalMoney.innerHTML = `Total amount of all riders N${total_money.toLocaleString()}`;
};
