const main = require('./main');

const execute = (...args) => {
  try {
    main(...args)
      .then(onSuccess)
      .catch(onError);
  } catch (e) {
    onError(e);
  }
};

const onSuccess = () => {
  console.log('Done');
  process.exit();
};

const onError = (e) => {
  console.error('Error');
  console.error(e);
  process.exit(1);
};

// ENTRY POINT

if (!process.stdin.isTTY) {
  console.error('Sorry, this does not support piping');
  process.exit(1);
  return;
};

const inputDir = process.argv[2];
const outputDir = process.argv[3];
execute(inputDir, outputDir);
