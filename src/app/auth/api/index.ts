import { setAccessToken, resetAccessToken, setProfile, resetProfile } from "@/stores";

export const logIn: (username: string) => Promise<number> = (username) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      setAccessToken('accessTokenValue');
      setProfile(username);
      resolve(
        200
      );
    }, 1000);
  });
}

export const logOut: () => Promise<number> = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resetAccessToken();
      resetProfile();
      resolve(
        200
      );
    }, 200);
  });
}