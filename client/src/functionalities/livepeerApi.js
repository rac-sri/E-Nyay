import LivepeerSDK from "@livepeer/sdk";

const provider =
  "https://rinkeby.infura.io/v3/3dc8b2e3489c4260904f45a4e74a56dc";

const controllerAddress = "0x37dC71366Ec655093b9930bc816E16e6b587F968";

const broadcasterSetup = async () => {
  LivepeerSDK({
    provider,
    controllerAddress,
  }).then(async (sdk) => {
    console.log(sdk);
  });
};

export { broadcasterSetup };
