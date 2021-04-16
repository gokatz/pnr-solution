export const getGoogleMap = () => {
  return new Promise((resolve) => {
    window.resolveGoogleMapsPromise = () => {
      resolve(window.google);
      delete window.resolveGoogleMapsPromise;
    };
  });
};