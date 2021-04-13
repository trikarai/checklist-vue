const base = {
  api: ""
};
if (process.env.NODE_ENV === "production") {
  base.api = "http://18.139.50.74:8080/";
} else {
  base.api = "http://18.139.50.74:8080/";
}
export const baseUri = base;
