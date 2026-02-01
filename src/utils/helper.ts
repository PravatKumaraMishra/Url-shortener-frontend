import { subDomainList } from "./constant";

export const getApps = () => {
  const subdomain = getSubDomain(window.location.hostname);

  const mainApp = subDomainList.find((app: any) => app.main);
  if (subdomain === "") return mainApp?.app;

  const apps = subDomainList.find((app: any) => subdomain === app.subdomain);

  return apps ? apps.app : mainApp?.app;
};

// url.localhost
// url.urlbestshort.com
export const getSubDomain = (location: any) => {
  const locationParts = location.split(".");
  const isLocalhost = locationParts.slice(-1)[0] === "localhost";
  const sliceTill = isLocalhost ? -1 : -2;
  return locationParts.slice(0, sliceTill).join("");
};
