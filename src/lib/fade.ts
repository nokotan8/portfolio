// Modified from:
// https://www.geeksforgeeks.org/javascript/how-to-add-fade-in-effect-using-pure-javascript/
const fade_in = (el: HTMLElement, anim_len: number) => {
    var opacity = 0;
    el.style.display = "block";
    var fade = setInterval(() => {
        if (opacity < 1) {
            opacity += 0.05;
            el.style.opacity = opacity.toString();
        } else {
            clearInterval(fade);
        }
    }, anim_len / 20);
};

const fade_out = (el: HTMLElement, anim_len: number): void => {
    var opacity = 1;
    var fade = setInterval(() => {
        if (opacity > 0.05) {
            el.style.opacity = opacity.toString();
            opacity -= 0.05;
        } else {
            clearInterval(fade);
            el.style.display = "none";
        }
    }, anim_len / 20);
};

export { fade_in, fade_out };
