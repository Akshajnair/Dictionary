let themecolor = ["#50c878", "#dbeb34", "#a31a41", "#1a7fa3", "#5f1aa3"];
function randtheme() {
  let a = Math.floor(Math.random() * 5);
  return themecolor[a];
}
export const theme = [
  {
    body: "#f8f9fa",
    text: "#343a40",
    darktext: "#343a40",
    theme: randtheme(),
    link: "#008B8B",
  },
  {
    body: "#343a40",
    text: "#f8f9fa",
    darktext: "#008B8B",
    theme: randtheme(),
    link: "#008B8B",
  },
];
