import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";

// start and end dates
const startDate = moment("2026-01-01");
const endDate = moment("2026-04-30");

const markCommit = (date, callback) => {
  const data = { date };

  jsonfile.writeFile(path, data, () => {
    simpleGit()
      .add([path])
      .commit(date, { "--date": date }, callback);
  });
};

const makeCommits = (n) => {
  if (n === 0) return simpleGit().push();

  // pick a random date between Jan 1 and May 3
  const randomDate = moment(
    startDate.valueOf() +
      Math.random() * (endDate.valueOf() - startDate.valueOf())
  );

  const date = randomDate.format();

  console.log(date);

  jsonfile.writeFile(path, { date }, () => {
    simpleGit()
      .add([path])
      .commit(date, { "--date": date }, makeCommits.bind(this, --n));
  });
};

makeCommits(100);