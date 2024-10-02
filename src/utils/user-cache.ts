import Cookie from "js-cookie";

const tokenCookie = async (token: string) => {
  await Cookie.set("token", token, {expires:1});
};

export { tokenCookie };
