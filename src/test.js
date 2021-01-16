const testmodule = (function () {
  let sample1 = 1;
  let sample2 = 2;
  let sample3 = "this variable is private do not return";

  function sample4() {
    console.log("sample only");
  }

  return {
    sample1,
    sample2,
    sample4,
  };
})();

export { testmodule };
