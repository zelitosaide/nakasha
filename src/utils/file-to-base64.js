export function convertTobase64(file) {
  return new Promise(function (resolve, reject) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      resolve(reader.result.toString());
    };
    reader.onerror = function () {
      reject(reader.error);
    };
  });
}
